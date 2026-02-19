function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
            {/* Navbar */}
            <nav className="relative z-10 flex justify-between items-center px-8 py-6">
                <h1 className="text-2xl font-bold tracking-wide">
                    🚀 DevStack
                </h1>

                <div className="space-x-6 hidden md:flex">
                    <a href="#" className="hover:text-purple-400 transition">
                        Sobre
                    </a>
                    <a href="#" className="hover:text-purple-400 transition">
                        Features
                    </a>
                    <a href="#" className="hover:text-purple-400 transition">
                        Contato
                    </a>
                </div>

                <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-lg font-medium shadow-lg"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-20">
                <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
                    Construa aplicações modernas com
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {" "}
                        estilo e performance
                    </span>
                </h2>

                <p className="mt-6 text-slate-400 max-w-xl text-lg">
                    Desenvolva com segurança, autenticação JWT, React moderno e
                    backend estruturado. Tudo organizado como projeto
                    profissional.
                </p>

                <div className="mt-10 flex gap-6 flex-wrap justify-center">
                    <button className="bg-purple-600 hover:bg-purple-700 transition px-8 py-3 rounded-xl text-lg font-semibold shadow-xl">
                        Começar agora
                    </button>

                    <button className="border border-slate-600 hover:border-purple-500 hover:text-purple-400 transition px-8 py-3 rounded-xl text-lg">
                        Ver documentação
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 mt-28 px-6 pb-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">
                            🔐 Autenticação Segura
                        </h3>
                        <p className="text-slate-400">
                            Sistema JWT estruturado como empresas utilizam.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">
                            ⚡ Performance
                        </h3>
                        <p className="text-slate-400">
                            React moderno, Axios configurado e arquitetura
                            limpa.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">
                            🎨 UI Moderna
                        </h3>
                        <p className="text-slate-400">
                            Tailwind CSS para criar layouts rápidos e
                            profissionais.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
