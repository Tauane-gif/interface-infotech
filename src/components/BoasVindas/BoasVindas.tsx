import type { JSX } from "react";

function Home(): JSX.Element {
    return (
        <main className="flex-1 bg-black text-white">

            {/* HERO */}
            <section className="border-b border-zinc-900">
                <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-16">

                    <div>
                        <p className="text-teal-400 text-sm font-medium uppercase tracking-wider mb-4">
                            InfoTech Informática
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Tecnologia para deixar
                            <span className="text-teal-400"> seu setup completo.</span>
                        </h1>

                        <p className="text-gray-400 text-base leading-relaxed max-w-lg mb-8">
                            Encontre teclados, mouses, monitores, cabos, fontes,
                            memórias, SSDs e outros produtos para seu computador.
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-teal-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-teal-300 transition">
                                Ver produtos
                            </button>

                            <button className="border border-zinc-700 px-6 py-3 rounded-lg font-medium hover:border-teal-500 hover:text-teal-400 transition">
                                Conheça a loja
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="h-80 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden">

                            <div className="absolute w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                className="relative w-40 h-40 text-teal-400"
                            >
                                <rect
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="13"
                                    rx="2"
                                />
                                <line
                                    x1="8"
                                    y1="21"
                                    x2="16"
                                    y2="21"
                                />
                                <line
                                    x1="12"
                                    y1="17"
                                    x2="12"
                                    y2="21"
                                />
                            </svg>
                        </div>

                        <div className="absolute -bottom-4 left-6 bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-3">
                            <p className="text-xs text-gray-500">
                                Produtos selecionados
                            </p>
                            <p className="text-sm font-semibold text-white">
                                Qualidade e confiança
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            {/* CATEGORIAS */}
            <section
                id="categorias"
                className="max-w-6xl mx-auto px-6 py-20"
            >
                <div className="mb-8">
                    <p className="text-teal-400 text-sm font-medium uppercase tracking-wider mb-2">
                        Encontre o que precisa
                    </p>

                    <h2 className="text-2xl font-bold">
                        Categorias
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Produtos para todos os tipos de setup.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-7 hover:border-teal-500 transition cursor-pointer">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 mb-5 text-teal-400"
                        >
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <line x1="6" y1="10" x2="6" y2="10" />
                            <line x1="10" y1="10" x2="10" y2="10" />
                            <line x1="14" y1="10" x2="14" y2="10" />
                            <line x1="18" y1="10" x2="18" y2="10" />
                            <line x1="6" y1="14" x2="18" y2="14" />
                        </svg>

                        <p className="font-medium">
                            Teclados
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Mecânicos e convencionais
                        </p>
                    </div>


                    <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-7 hover:border-teal-500 transition cursor-pointer">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 mb-5 text-teal-400"
                        >
                            <rect x="6" y="3" width="12" height="18" rx="6" />
                            <line x1="12" y1="7" x2="12" y2="11" />
                        </svg>

                        <p className="font-medium">
                            Mouses
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Precisão para seu setup
                        </p>
                    </div>


                    <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-7 hover:border-teal-500 transition cursor-pointer">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 mb-5 text-teal-400"
                        >
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <line x1="8" y1="20" x2="16" y2="20" />
                            <line x1="12" y1="16" x2="12" y2="20" />
                        </svg>

                        <p className="font-medium">
                            Monitores
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Qualidade de imagem
                        </p>
                    </div>


                    <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-7 hover:border-teal-500 transition cursor-pointer">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 mb-5 text-teal-400"
                        >
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>

                        <p className="font-medium">
                            Áudio
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Headsets e acessórios
                        </p>
                    </div>

                </div>
            </section>


            {/* PRODUTOS */}
            <section
                id="produtos"
                className="bg-zinc-950 border-y border-zinc-900"
            >
                <div className="max-w-6xl mx-auto px-6 py-20">

                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="text-teal-400 text-sm font-medium uppercase tracking-wider mb-2">
                                Destaques
                            </p>

                            <h2 className="text-2xl font-bold">
                                Mais vendidos
                            </h2>
                        </div>

                        <button className="text-sm text-gray-400 hover:text-teal-400 transition">
                            Ver todos
                        </button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* PRODUTO 1 */}
                        <div className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-teal-500 transition">

                            <div className="h-44 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-14 h-14 text-teal-400"
                                >
                                    <rect
                                        x="2"
                                        y="6"
                                        width="20"
                                        height="12"
                                        rx="2"
                                    />
                                    <line
                                        x1="6"
                                        y1="14"
                                        x2="18"
                                        y2="14"
                                    />
                                </svg>

                            </div>

                            <p className="text-sm text-gray-400 mb-2">
                                Teclado
                            </p>

                            <h3 className="font-medium mb-4">
                                Teclado mecânico RGB
                            </h3>

                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-teal-400">
                                    R$ 249,90
                                </p>

                                <button className="border border-zinc-700 rounded-lg px-3 py-2 text-xs hover:border-teal-500 hover:text-teal-400 transition">
                                    Detalhes
                                </button>
                            </div>

                        </div>


                        {/* PRODUTO 2 */}
                        <div className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-teal-500 transition">

                            <div className="h-44 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-14 h-14 text-teal-400"
                                >
                                    <rect
                                        x="6"
                                        y="3"
                                        width="12"
                                        height="18"
                                        rx="6"
                                    />
                                    <line
                                        x1="12"
                                        y1="7"
                                        x2="12"
                                        y2="11"
                                    />
                                </svg>

                            </div>

                            <p className="text-sm text-gray-400 mb-2">
                                Mouse
                            </p>

                            <h3 className="font-medium mb-4">
                                Mouse gamer sem fio
                            </h3>

                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-teal-400">
                                    R$ 159,90
                                </p>

                                <button className="border border-zinc-700 rounded-lg px-3 py-2 text-xs hover:border-teal-500 hover:text-teal-400 transition">
                                    Detalhes
                                </button>
                            </div>

                        </div>


                        {/* PRODUTO 3 */}
                        <div className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-teal-500 transition">

                            <div className="h-44 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-14 h-14 text-teal-400"
                                >
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="12"
                                        rx="2"
                                    />
                                    <line
                                        x1="12"
                                        y1="16"
                                        x2="12"
                                        y2="20"
                                    />
                                </svg>

                            </div>

                            <p className="text-sm text-gray-400 mb-2">
                                Monitor
                            </p>

                            <h3 className="font-medium mb-4">
                                Monitor 27" 144Hz
                            </h3>

                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-teal-400">
                                    R$ 1.199,00
                                </p>

                                <button className="border border-zinc-700 rounded-lg px-3 py-2 text-xs hover:border-teal-500 hover:text-teal-400 transition">
                                    Detalhes
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* BENEFÍCIOS */}
            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="border border-zinc-800 rounded-xl p-7">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mb-5 text-teal-400"
                        >
                            <rect x="1" y="7" width="15" height="10" rx="1" />
                            <path d="M16 10h4l3 3v4h-7z" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                        </svg>

                        <h3 className="font-semibold mb-2">
                            Entrega rápida
                        </h3>

                        <p className="text-sm text-gray-500">
                            Receba seus produtos com segurança e agilidade.
                        </p>
                    </div>


                    <div className="border border-zinc-800 rounded-xl p-7">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mb-5 text-teal-400"
                        >
                            <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>

                        <h3 className="font-semibold mb-2">
                            Compra segura
                        </h3>

                        <p className="text-sm text-gray-500">
                            Produtos selecionados e compra com segurança.
                        </p>
                    </div>


                    <div className="border border-zinc-800 rounded-xl p-7">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mb-5 text-teal-400"
                        >
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>

                        <h3 className="font-semibold mb-2">
                            Suporte dedicado
                        </h3>

                        <p className="text-sm text-gray-500">
                            Atendimento para ajudar você quando precisar.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;

