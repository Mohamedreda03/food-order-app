import AdminMenu from "@/components/admin/admin-menu";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminMenu />
      {children}
    </div>
  );
}
