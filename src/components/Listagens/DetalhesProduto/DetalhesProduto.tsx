import { useEffect, useState, type JSX } from "react";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import ProdutoRequests from  "../../../fetch/Produtorequest";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesProdutoProps {
    id_produto: number;
}

function DetalhesProduto({ id_produto }: DetalhesProdutoProps): JSX.Element {
    const [produto, setProduto] = useState<ProdutoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await ProdutoRequests.obterProdutoPorId(id_produto);
                if (dados) {
                    setProduto(dados);
                } else {
                    setError("Produto não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do produto:", err);
                setError("Ocorreu um erro ao buscar as informações do produto.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_produto]);

    if (loading) {
        return (
            <article className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-4 shadow-md">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton shape="circle" size="4rem" />
                        <div className="flex-1">
                            <Skeleton width="60%" height="2rem" className="mb-2" />
                            <Skeleton width="40%" />
                        </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}>
                                <Skeleton width="30%" className="mb-2" />
                                <Skeleton width="80%" height="1.5rem" />
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        );
    }

    if (error || !produto) {
        return (
            <div className="flex justify-center p-4">
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error || "Erro desconhecido."}
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-gray-200 px-4 py-6 sm:py-10">
            <article className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition-all duration-300 sm:p-6 md:p-8">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <span className="text-sm font-medium tracking-tight text-gray-500">Produto</span>
                        <Tag
                            value={produto.ativo ? "Ativo" : "Inativo"}
                            severity={produto.ativo ? "success" : "danger"}
                            className="px-3 py-1"
                        />
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary-700">
                                <i className="pi pi-box text-blue-500" /> Dados do Produto
                            </h3>
                            <div className="relative flex flex-col gap-3 border-l-2 border-blue-50 pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Nome</span>
                                    <span className="font-medium text-gray-700">{produto.nome}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Descrição</span>
                                    <span className="font-medium leading-relaxed text-gray-700">
                                        {produto.descricao || "Não informado"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Categoria</span>
                                    <span className="font-medium text-gray-700">
                                        {produto.categoria_id ? `Categoria ${produto.categoria_id}` : "Sem categoria"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary-700">
                                <i className="pi pi-dollar text-green-500" /> Preço e Estoque
                            </h3>
                            <div className="relative flex flex-col gap-3 border-l-2 border-blue-50 pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Preço</span>
                                    <span className="font-medium text-gray-700">
                                        {produto.preco?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Estoque</span>
                                    <span className="font-medium text-gray-700">
                                        {produto.quantidade_estoque ?? 0} unidade(s)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <div className="mx-auto mt-6 w-full max-w-4xl sm:mt-8">
                <button
                    className="w-full rounded-md bg-slate-700 px-4 py-3 font-bold text-white shadow-md transition-all hover:bg-slate-500 active:scale-95 md:mb-2"
                    onClick={() => navigate(`/atualizar/produto/${produto.id_produto}`)}
                >
                    Editar Produto
                </button>
                <button
                    className="mt-2 w-full rounded-md bg-white px-4 py-3 font-bold text-black shadow-md transition-all hover:bg-slate-500 active:scale-95"
                    onClick={() => navigate(`/lista/produtos`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesProduto;