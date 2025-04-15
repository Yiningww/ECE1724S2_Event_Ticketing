// app/dashboard/page.tsx
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in first.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>
    </div>
  );
}
