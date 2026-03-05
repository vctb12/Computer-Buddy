import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function StaffEntryPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { memberships: { include: { org: true } } },
  });

  const orgs = user?.memberships.map((m) => m.org) ?? [];
  if (orgs.length === 1) redirect(`/app/${orgs[0].slug}`);

  return (
    <main className="container section">
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
        Choose a workspace
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        You have access to {orgs.length} tenant(s).
      </p>

      <div style={{ marginTop: 16 }} className="card">
        {orgs.length === 0 ? (
          <p className="muted">No tenant access found for this user.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {orgs.map((org) => (
              <li key={org.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border-default)" }}>
                <a className="button" href={`/app/${org.slug}`}>
                  {org.name}
                </a>
                <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                  {org.slug}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
