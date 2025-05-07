export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block hover:text-blue-300">
            Dashboard
          </a>
          <a href="/admin/championships" className="block hover:text-blue-300">
            Campeonatos
          </a>
          <a href="/admin/teams" className="block hover:text-blue-300">
            Times
          </a>
          <a href="/admin/players" className="block hover:text-blue-300">
            Jogadores
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
