import type { JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-black flex items-center justify-center px-6 py-20">
            <section className="max-w-4xl text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-400 mb-6">
                    InfoTech
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-teal-300 leading-relaxed">
                    Bem-vindo à InfoTech! Aqui você encontra tecnologia de verdade,
                    dos lançamentos mais esperados aos acessórios que fazem toda
                    diferença no seu dia a dia. Preços justos, qualidade garantida
                    e um atendimento pensado para você. Vem conferir o que
                    preparamos especialmente para a sua próxima compra!
                </p>
            </section>
        </main>
    );
}

export default BoasVindas;