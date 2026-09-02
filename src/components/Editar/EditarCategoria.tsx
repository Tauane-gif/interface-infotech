import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaRequests from "../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../dto/CategoriaDTO";

function EditarCategoria(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);
    const [nome, setNome] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarCategoria() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const dados = await CategoriaRequests.obterCategoriaPorId(
                Number(id)
            );

            if (dados) {
                setCategoria(dados);
                setNome(dados.nome);
            }

            setCarregando(false);
        }

        buscarCategoria();
    }, [id]);

    async function salvarCategoria() {
        if (!id || !nome.trim()) {
            return;
        }

        setSalvando(true);

        try {
            await CategoriaRequests.atualizarCategoria(
                Number(id),
                {
                    id_categoria: Number(id),
                    nome: nome.trim(),
                }
            );

            navigate("/lista/categorias");
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
        } finally {
            setSalvando(false);
        }
    }

    // Tela de carregamento
    if (carregando) {
        return (
            <main className="flex min-h-screen flex-1 items-center justify-center bg-black">
                <p className="text-lg text-teal-300">
                    Carregando categoria...
                </p>
            </main>
        );
    }

    // Categoria não encontrada
    if (!categoria) {
        return (
            <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Categoria não encontrada.
                </p>

                <button
                    onClick={() => navigate("/lista/categorias")}
                    className="rounded-lg bg-teal-400 px-5 py-2 font-medium text-black transition hover:bg-teal-300"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex-1 bg-black px-6 py-8">
            <div className="mx-auto max-w-3xl">

                {/* Título da página */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-teal-300">
                        Editar Categoria
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Altere as informações da categoria.
                    </p>
                </div>

                {/* Card principal */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">

                    {/* ID */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-400">
                            ID
                        </label>

                        <input
                            type="text"
                            value={categoria.id_categoria}
                            disabled
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-gray-500 outline-none"
                        />
                    </div>

                    {/* Nome */}
                    <div>
                        <label
                            htmlFor="nome"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Nome
                        </label>

                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome da categoria"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                        />
                    </div>

                    {/* Botões */}
                    <div className="mt-8 flex gap-3">

                        <button
                            onClick={() =>
                                navigate("/lista/categorias")
                            }
                            className="rounded-lg bg-zinc-700 px-5 py-2 font-medium text-white transition hover:bg-zinc-600"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={salvarCategoria}
                            disabled={salvando || !nome.trim()}
                            className="rounded-lg bg-teal-400 px-5 py-2 font-medium text-black transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {salvando
                                ? "Salvando..."
                                : "Salvar"}
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditarCategoria;

