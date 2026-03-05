import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function TenantHomePage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const membership = await prisma.orgMembership.findFirst({
    where: {
      org: { slug: params.tenantSlug },
      user: { email: session.user.email },
    },
    include: { org: true, branch: true },
  });

  if (!membership) redirect("/app");

  return (
    <main className="container section">
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
        {membership.org.name}
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Role: {membership.role}
        {membership.branch ? ` • Branch: ${membership.branch.name}` : ""}
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontWeight: 800 }}>Next up</p>
        <p className="muted" style={{ marginTop: 8 }}>
          Add Quotes → Orders → Work Orders module, plus Stripe checkout + webhooks.
        </p>
      </div>
    </main>
  );
}
