import PrivateRoute from "@/components/PrivateRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
