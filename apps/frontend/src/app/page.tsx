export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/background.jpg"
          alt="Champions Background"
          className="object-cover w-full h-full opacity-60"
        />
      </div>

      {/* Navbar */}
      <div className="absolute top-0 right-0 z-20 p-6 flex gap-4">
        <a
          href="/auth/login"
          className="px-5 py-2 border border-white rounded-full text-white hover:bg-blue-950 hover:text-white transition font-medium"
        >
          Login
        </a>
        <a
          href="/auth/signup"
          className="px-5 py-2 border border-white rounded-full text-white hover:bg-blue-950 hover:text-white transition font-medium"
        >
          Cadastro
        </a>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <img
          src="/images/champions-logo.png"
          alt="Champions League Logo"
          className="w-32 md:w-48 mb-6"
        />

        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-lg">
          Champions League Sorocaba
        </h1>
        <p className="mt-4 max-w-xl text-lg md:text-xl drop-shadow-md">
          Organize seus campeonatos como a UEFA. Cadastramento de times, fases,
          jogadores e jogos com estatísticas completas.
        </p>

        <a
          href="/dashboard"
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg font-semibold transition"
        >
          Começar agora
        </a>
      </div>
    </div>
  );
}
