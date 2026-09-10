import type { JSX } from "react";

function Home(): JSX.Element {

    return (

        <main className="flex-1 bg-black text-white">

            <section className="max-w-6xl mx-auto px-6 py-20 flex items-center justify-between gap-10">

                <div className="max-w-xl">

                    <p className="text-teal-400 text-sm mb-3">
                        Teclados, mouses, monitores e etc
                    </p>

                    <h1 className="text-4xl font-bold leading-tight mb-5">
                        Tecnologia de verdade pro seu setup
                    </h1>

                    <p className="text-gray-400 text-base mb-7">
                        Preços justos, qualidade garantida e entrega rápida.
                    </p>

                    <button className="bg-teal-400 text-black px-6 py-3 rounded-md font-semibold">
                        Ver produtos
                    </button>

                </div>


                <div className="w-80 h-60 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-24 h-24 text-teal-400"
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

            </section>


            <section
                id="categorias"
                className="max-w-6xl mx-auto px-6 py-10"
            >

                <p className="text-gray-400 text-sm mb-5">
                    Categorias
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-7 text-center hover:border-teal-700">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <line x1="6" y1="10" x2="6" y2="10" />
                            <line x1="10" y1="10" x2="10" y2="10" />
                            <line x1="14" y1="10" x2="14" y2="10" />
                            <line x1="18" y1="10" x2="18" y2="10" />
                            <line x1="6" y1="14" x2="18" y2="14" />
                        </svg>

                        <span className="text-sm">
                            Teclados
                        </span>

                    </div>


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-7 text-center hover:border-teal-700">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <rect x="6" y="3" width="12" height="18" rx="6" />
                            <line x1="12" y1="7" x2="12" y2="11" />
                        </svg>

                        <span className="text-sm">
                            Mouses
                        </span>

                    </div>


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-7 text-center hover:border-teal-700">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <line x1="8" y1="20" x2="16" y2="20" />
                            <line x1="12" y1="16" x2="12" y2="20" />
                        </svg>

                        <span className="text-sm">
                            Monitores
                        </span>

                    </div>


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-7 text-center hover:border-teal-700">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />

                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />

                            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>

                        <span className="text-sm">
                            Áudio
                        </span>

                    </div>

                </div>

            </section>


            <section
                id="produtos"
                className="max-w-6xl mx-auto px-6 py-10"
            >

                <p className="text-gray-400 text-sm mb-5">
                    Mais vendidos
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 hover:border-teal-700">

                        <div className="h-36 bg-zinc-900 rounded-lg flex items-center justify-center mb-4">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="w-10 h-10 text-teal-400"
                            >
                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                <line x1="6" y1="14" x2="18" y2="14" />
                            </svg>

                        </div>

                        <p className="text-sm mb-2">
                            Teclado mecânico RGB
                        </p>

                        <p className="text-lg font-bold text-teal-400">
                            R$ 249,90
                        </p>

                    </div>


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 hover:border-teal-700">

                        <div className="h-36 bg-zinc-900 rounded-lg flex items-center justify-center mb-4">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="w-10 h-10 text-teal-400"
                            >
                                <rect x="6" y="3" width="12" height="18" rx="6" />
                                <line x1="12" y1="7" x2="12" y2="11" />
                            </svg>

                        </div>

                        <p className="text-sm mb-2">
                            Mouse gamer sem fio
                        </p>

                        <p className="text-lg font-bold text-teal-400">
                            R$ 159,90
                        </p>

                    </div>


                    <div className="bg-zinc-950 border border-gray-800 rounded-xl p-5 hover:border-teal-700">

                        <div className="h-36 bg-zinc-900 rounded-lg flex items-center justify-center mb-4">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="w-10 h-10 text-teal-400"
                            >
                                <rect x="3" y="4" width="18" height="12" rx="2" />
                                <line x1="12" y1="16" x2="12" y2="20" />
                            </svg>

                        </div>

                        <p className="text-sm mb-2">
                            Monitor 27" 144Hz
                        </p>

                        <p className="text-lg font-bold text-teal-400">
                            R$ 1.199,00
                        </p>

                    </div>

                </div>

            </section>


            <section className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">


                    <div>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <rect x="1" y="7" width="15" height="10" rx="1" />
                            <path d="M16 10h4l3 3v4h-7z" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                        </svg>

                        <p className="text-sm text-gray-400">
                            Entrega rápida
                        </p>

                    </div>


                    <div>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>

                        <p className="text-sm text-gray-400">
                            Compra garantida
                        </p>

                    </div>


                    <div>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 mx-auto mb-3 text-teal-400"
                        >
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>

                        <p className="text-sm text-gray-400">
                            Suporte dedicado
                        </p>

                    </div>

                </div>

            </section>
        </main>
    );
}

export default Home;