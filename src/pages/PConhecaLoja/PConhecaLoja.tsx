import type { JSX } from "react";

function ConhecaLoja(): JSX.Element {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-16">

            <div className="max-w-6xl mx-auto">

                <p className="text-teal-400 text-sm uppercase tracking-wider mb-3">
                    Sobre nós
                </p>

                <h1 className="text-4xl font-bold mb-6">
                    Conheça a InfoTech
                </h1>

                <p className="text-gray-400 max-w-2xl leading-relaxed">
                    A InfoTech Informática é uma loja especializada em produtos
                    e acessórios para computadores e setups. Trabalhamos com
                    teclados, mouses, monitores, cabos, fontes, memórias, SSDs
                    e diversos outros produtos.
                </p>

            </div>

        </main>
    );
}

export default ConhecaLoja;