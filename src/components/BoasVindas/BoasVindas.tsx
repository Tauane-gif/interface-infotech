import type { JSX } from "react";
import logo from "../../assets/logoInfotech.png";

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-black flex items-center justify-center px-6 py-20">
            <section className="max-w-4xl text-center">
                <img
                    src={logo}
                    alt="InfoTech Logo"
                    className="mx-auto w-96 sm:w-[28rem] md:w-[32rem] mb-2"
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