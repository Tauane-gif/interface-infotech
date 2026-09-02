import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequest";
import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";

function EditarMovimentacao(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movimentacao, setMovimentacao] =
        useState<MovimentacaoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const [quantidade, setQuantidade] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState("");
    const [tipoMovimentacao, setTipoMovimentacao] = useState("");
    const [motivo, setMotivo] = useState("");
    const [observacao, setObservacao] = useState("");

    useEffect(() => {
        async function buscarMovimentacao() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const idMovimentacao = Number(id);

            if (
                !Number.isInteger(idMovimentacao) ||
                idMovimentacao <= 0
            ) {
                setCarregando(false);
                return;
            }

            try {
                const dados =
                    await MovimentacaoRequests.obterMovimentacaoPorId(
                        idMovimentacao
                    );

                if (dados) {
                    setMovimentacao(dados);

                    setQuantidade(String(dados.quantidade));
                    setPrecoUnitario(String(dados.preco_unitario));
                    setTipoMovimentacao(
                        dados.tipo_movimentacao
                    );
                    setMotivo(dados.motivo || "");
                    setObservacao(dados.observacao || "");
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar movimentação:",
                    error
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarMovimentacao();
    }, [id]);

    async function salvarAlteracoes() {
        if (!id || !movimentacao) {
            return;
        }

        if (!quantidade || !precoUnitario || !tipoMovimentacao) {
            return;
        }

        setSalvando(true);

        try {
            await MovimentacaoRequests.atualizarMovimentacao(
                Number(id),
                {
                    id_movimentacao:
                        movimentacao.id_movimentacao,

                    id_produto:
                        movimentacao.id_produto,

                    tipo_movimentacao:
                        tipoMovimentacao,

                    quantidade:
                        Number(quantidade),

                    preco_unitario:
                        Number(precoUnitario),

                    valor_total:
                        Number(quantidade) *
                        Number(precoUnitario),

                    data_movimentacao:
                        movimentacao.data_movimentacao,

                    motivo:
                        motivo,

                    observacao:
                        observacao,
                }
            );

            navigate("/lista/movimentacoes");
        } catch (error) {
            console.error(
                "Erro ao atualizar movimentação:",
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
                    Carregando movimentação...
                </p>
            </main>
        );
    }

    if (!movimentacao) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Movimentação não encontrada.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/movimentacoes")
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
                            Editar Movimentação
                        </h1>
                    </div>

                    <p className="mt-1 text-slate-400">
                        Altere as informações da movimentação de estoque.
                    </p>
                </div>

                {/* CARD */}
                <div className="rounded-xl border border-teal-900 bg-zinc-950 p-6 shadow-md">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">
                                ID da Movimentação
                            </label>

                            <input
                                type="text"
                                value={`#${movimentacao.id_movimentacao}`}
                                disabled
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-500 outline-none"
                            />
                        </div>

                        {/* ID PRODUTO */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">
                                ID do Produto
                            </label>

                            <input
                                type="text"
                                value={`#${movimentacao.id_produto}`}
                                disabled
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-500 outline-none"
                            />
                        </div>

                        {/* TIPO */}
                        <div>
                            <label
                                htmlFor="tipo"
                                className="text-sm font-medium text-slate-400"
                            >
                                Tipo de Movimentação
                            </label>

                            <select
                                id="tipo"
                                value={tipoMovimentacao}
                                onChange={(e) =>
                                    setTipoMovimentacao(
                                        e.target.value
                                    )
                                }
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition focus:border-teal-400"
                            >
                                <option value="">
                                    Selecione o tipo
                                </option>

                                <option value="ENTRADA">
                                    ENTRADA
                                </option>

                                <option value="SAIDA">
                                    SAÍDA
                                </option>
                            </select>
                        </div>

                        {/* QUANTIDADE */}
                        <div>
                            <label
                                htmlFor="quantidade"
                                className="text-sm font-medium text-slate-400"
                            >
                                Quantidade
                            </label>

                            <input
                                id="quantidade"
                                type="number"
                                min="1"
                                value={quantidade}
                                onChange={(e) =>
                                    setQuantidade(
                                        e.target.value
                                    )
                                }
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition focus:border-teal-400"
                            />
                        </div>

                        {/* PREÇO UNITÁRIO */}
                        <div>
                            <label
                                htmlFor="preco"
                                className="text-sm font-medium text-slate-400"
                            >
                                Preço Unitário
                            </label>

                            <input
                                id="preco"
                                type="number"
                                min="0"
                                step="0.01"
                                value={precoUnitario}
                                onChange={(e) =>
                                    setPrecoUnitario(
                                        e.target.value
                                    )
                                }
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition focus:border-teal-400"
                            />
                        </div>

                        {/* MOTIVO */}
                        <div>
                            <label
                                htmlFor="motivo"
                                className="text-sm font-medium text-slate-400"
                            >
                                Motivo
                            </label>

                            <input
                                id="motivo"
                                type="text"
                                value={motivo}
                                onChange={(e) =>
                                    setMotivo(e.target.value)
                                }
                                placeholder="Digite o motivo"
                                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-teal-400"
                            />
                        </div>
                    </div>

                    {/* OBSERVAÇÃO */}
                    <div className="mt-6">
                        <label
                            htmlFor="observacao"
                            className="text-sm font-medium text-slate-400"
                        >
                            Observação
                        </label>

                        <textarea
                            id="observacao"
                            value={observacao}
                            onChange={(e) =>
                                setObservacao(e.target.value)
                            }
                            placeholder="Digite uma observação..."
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
                                    "/lista/movimentacoes"
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
                                !quantidade ||
                                !precoUnitario ||
                                !tipoMovimentacao
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

export default EditarMovimentacao;

