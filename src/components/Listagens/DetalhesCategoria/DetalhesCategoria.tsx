import { useEffect, useState, type JSX } from "react";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import CategoriaRequests from "../../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesCategoriaProps {
    id_categoria: number;
}

function DetalhesCategoria({ id_categoria }: DetalhesCategoriaProps): JSX.Element {
    const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await CategoriaRequests.obterCategoriaPorId(id_categoria);
                if (dados) {
                    setCategoria(dados);
                } else {
                    setError("Categoria não encontrada.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes da categoria:", err);
                setError("Ocorreu um erro ao buscar as informações da categoria.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_categoria]);

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

    if (error || !categoria) {
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
                        <span className="text-sm font-medium tracking-tight text-gray-500">Categoria</span>
                        <Tag
                            value={categoria.ativo ? "Ativa" : "Inativa"}
                            severity={categoria.ativo ? "success" : "danger"}
                            className="px-3 py-1"
                        />
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary-700">
                                <i className="pi pi-tag text-blue-500" /> Dados da Categoria
                            </h3>
                            <div className="relative flex flex-col gap-3 border-l-2 border-blue-50 pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Nome</span>
                                    <span className="font-medium text-gray-700">{categoria.nome}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Descrição</span>
                                    <span className="font-medium leading-relaxed text-gray-700">
                                        {categoria.descricao || "Não informado"}
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
                    onClick={() => navigate(`/atualizar/categoria/${categoria.id_categoria}`)}
                >
                    Editar Categoria
                </button>
                <button
                    className="mt-2 w-full rounded-md bg-white px-4 py-3 font-bold text-black shadow-md transition-all hover:bg-slate-500 active:scale-95"
                    onClick={() => navigate(`/lista/categorias`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesCategoria;