import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoRequests from "../../fetch/Produtorequest";
import type ProdutoDTO from "../../dto/ProdutoDTO";

function EditarProduto(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [produto, setProduto] =
        useState<ProdutoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const [nome, setNome] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        async function buscarProduto() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const idProduto = Number(id);

            if (
                !Number.isInteger(idProduto) ||
                idProduto <= 0
            ) {
                setCarregando(false);
                return;
            }

            try {
                const dados =
                    await ProdutoRequests.obterProdutoPorId(
                        idProduto
                    );

                if (dados) {
                    setProduto(dados);
                    setNome(dados.nome);
                    setIdCategoria(
                        String(dados.id_categoria)
                    );
                    setDescricao(
                        dados.descricao || ""
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar produto:",
                    error
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarProduto();
    }, [id]);

    async function salvarAlteracoes() {
        if (!id || !produto) {
            return;
        }

        if (
            !nome.trim() ||
            !idCategoria.trim()
        ) {
            return;
        }

        setSalvando(true);

        try {
            await ProdutoRequests.atualizarProduto(
                Number(id),
                {
                    id_produto: produto.id_produto,
                    nome: nome.trim(),
                    id_categoria: Number(idCategoria),
                    descricao: descricao.trim(),
                }
            );

            navigate("/lista/produtos");
        } catch (error) {
            console.error(
                "Erro ao atualizar produto:",
                error
            );
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center bg-black">
                <p className="text-lg text-teal-400">
                    Carregando produto...
                </p>
            </main>
        );
    }

    if (!produto) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Produto não encontrado.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/produtos")
                    }
                    className="rounded-lg bg-teal-500 px-5 py-2 font-medium text-black transition hover:bg-teal-400"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-black px-6 py-8">
            <div className="mx-auto max-w-4xl">

                {/* CABEÇALHO */}
                <div className="mb-6">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-950 text-teal-400">
                            <i className="pi pi-pencil" />
                        </span>

                        <h1 className="text-3xl font-bold text-teal-400">
                            Editar Produto
                        </h1>
                    </div>

                    <p className="mt-1 text-slate-400">
                        Altere as informações do produto.
                    </p>
                </div>

                {/* CARD */}
                <div className="rounded-xl border border-teal-900 bg-zinc-950 p-6 shadow-md">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">
                                ID do Produto
                            </label>

                            <input
                                type="text"
                                value={`#${produto.id_produto}`}
                                disabled
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-500 outline-none"
                            />
                        </div>

                        {/* NOME */}
                        <div>
                            <label
                                htmlFor="nome"
                                className="text-sm font-medium text-slate-400"
                            >
                                Nome
                            </label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) =>
                                    setNome(e.target.value)
                                }
                                placeholder="Digite o nome do produto"
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-teal-400"
                            />
                        </div>

                        {/* CATEGORIA */}
                        <div>
                            <label
                                htmlFor="categoria"
                                className="text-sm font-medium text-slate-400"
                            >
                                ID da Categoria
                            </label>

                            <input
                                id="categoria"
                                type="number"
                                min="1"
                                value={idCategoria}
                                onChange={(e) =>
                                    setIdCategoria(
                                        e.target.value
                                    )
                                }
                                placeholder="Digite o ID da categoria"
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-teal-400"
                            />
                        </div>
                    </div>

                    {/* DESCRIÇÃO */}
                    <div className="mt-6 border-t border-zinc-800 pt-6">
                        <label
                            htmlFor="descricao"
                            className="text-sm font-medium text-slate-400"
                        >
                            Descrição
                        </label>

                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) =>
                                setDescricao(
                                    e.target.value
                                )
                            }
                            placeholder="Digite a descrição do produto..."
                            rows={4}
                            className="mt-2 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-teal-400"
                        />
                    </div>

                    {/* BOTÕES */}
                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/lista/produtos"
                                )
                            }
                            className="rounded-lg bg-zinc-800 px-5 py-2 font-medium text-slate-300 transition hover:bg-zinc-700"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={salvarAlteracoes}
                            disabled={
                                salvando ||
                                !nome.trim() ||
                                !idCategoria.trim()
                            }
                            className="rounded-lg bg-teal-500 px-5 py-2 font-medium text-black transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {salvando
                                ? "Salvando..."
                                : "Salvar alterações"}
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditarProduto;
