import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: "demo-retailer" },
    update: {},
    create: {
      slug: "demo-retailer",
      name: "Demo Retailer (UAE)",
      settings: {
        create: {
          vatRate: "0.0500",
          vatWaiverThresholdAed: "5000.00",
          allowCOD: true,
        },
      },
      branches: {
        create: [{ name: "Dubai Branch", emirate: "Dubai" }],
      },
    },
    include: { branches: true },
  });

  const branch = org.branches[0];

  const email = "admin@demo-retailer.ae";
  const password = "Admin123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Demo Admin",
      passwordHash,
      memberships: {
        create: {
          orgId: org.id,
          role: "STORE_ADMIN",
          branchId: branch.id,
        },
      },
    },
  });

  const products = [
    {
      sku: "CPU-7800X3D",
      slug: "amd-ryzen-7-7800x3d",
      name: "AMD Ryzen 7 7800X3D",
      category: "cpu",
      priceAed: "1699.00",
      specs: { Socket: "AM5", TDP: 120 },
    },
    {
      sku: "MOBO-B650",
      slug: "msi-b650-tomahawk",
      name: "MSI B650 Tomahawk",
      category: "mobo",
      priceAed: "899.00",
      specs: { Socket: "AM5", "Memory Type": "DDR5", "Form Factor": "ATX" },
    },
    {
      sku: "RAM-DDR5-32",
      slug: "ddr5-32gb-6000",
      name: "DDR5 32GB 6000MT/s",
      category: "ram",
      priceAed: "449.00",
      specs: { Type: "DDR5" },
    },
    {
      sku: "GPU-4070S",
      slug: "nvidia-rtx-4070-super",
      name: "NVIDIA RTX 4070 SUPER",
      category: "gpu",
      priceAed: "2599.00",
      specs: { TGP: 220 },
    },
    {
      sku: "CASE-ATX",
      slug: "atx-mid-tower",
      name: "ATX Mid Tower Case",
      category: "case",
      priceAed: "299.00",
      specs: { "Supported Form Factor": "ATX,Micro-ATX,Mini-ITX" },
    },
    {
      sku: "PSU-750W",
      slug: "psu-750w-gold",
      name: "750W 80+ Gold PSU",
      category: "psu",
      priceAed: "349.00",
      specs: { Wattage: 750 },
    },
    {
      sku: "SVC-ASSEMBLY",
      slug: "service-assembly",
      name: "Build + Assembly Service",
      category: "service",
      priceAed: "199.00",
    },
  ] as const;

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { orgId_slug: { orgId: org.id, slug: p.slug } },
      update: {},
      create: {
        orgId: org.id,
        sku: p.sku,
        slug: p.slug,
        name: p.name,
        category: p.category,
        priceAed: p.priceAed,
        specs: p.specs ?? undefined,
      },
    });

    await prisma.inventoryStock.upsert({
      where: {
        branchId_productId: { branchId: branch.id, productId: product.id },
      },
      update: { onHand: 10 },
      create: {
        orgId: org.id,
        branchId: branch.id,
        productId: product.id,
        onHand: 10,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Login:");
  console.log(`  email: ${email}`);
  console.log(`  password: ${password}`);
  console.log(`Tenant slug: ${org.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
