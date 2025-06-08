import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTrophy,
  faUsers,
  faShirt
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#001C55] via-[#00369f] to-[#001C55] text-white font-sans">
      {/* Sidebar */}
      <aside
        className="w-64 p-6 shadow-lg flex flex-col justify-between relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/background-sidebar.jpg')", // substitua pelo caminho da sua imagem
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Conteúdo da sidebar */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-center mb-8">
              <img
                src="/images/champions-logo.png"
                alt="Champions League"
                className="w-28 h-auto"
              />
            </div>
            <nav className="space-y-4">
              <SidebarLink href="/admin" icon={faHouse}>
                Dashboard
              </SidebarLink>
              <SidebarLink href="/admin/championships" icon={faTrophy}>
                Campeonatos
              </SidebarLink>
              <SidebarLink href="/admin/teams" icon={faUsers}>
                Times
              </SidebarLink>
              <SidebarLink href="/admin/players" icon={faShirt}>
                Jogadores
              </SidebarLink>
            </nav>
          </div>

          <footer className="text-sm text-center text-gray-400 mt-12">
            &copy; {new Date().getFullYear()} Champions League
          </footer>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-[#0a174e] text-white">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  children
}: {
  href: string;
  icon: IconDefinition;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <span className="flex items-center gap-3 px-4 py-2 rounded hover:bg-yellow-500 hover:text-blue-900 transition">
        <FontAwesomeIcon icon={icon} />
        {children}
      </span>
    </Link>
  );
}
