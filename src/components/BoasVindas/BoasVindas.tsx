import type { JSX } from "react";
import logo from "../../assets/logoInfotech.png"; // ajuste o caminho conforme sua estrutura de pastas

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-black flex items-center justify-center px-6 py-20">
            <section className="max-w-4xl text-center">
                <img
                    src={logo}
                    alt="InfoTech Logo"
                    className="mx-auto w-64 sm:w-80 md:w-96 mb-6"
                />
                <p className="text-sm sm:text-base md:text-lg text-teal-300 leading-relaxed">
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