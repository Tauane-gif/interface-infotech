import {
    useEffect,
    useState,
    type ChangeEvent,
} from "react";

import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequest";
import { useNavigate } from "react-router-dom";

function ListagemMovimentacoes() {
    const navigate = useNavigate();

    const [movimentacoes, setMovimentacoes] = useState<
        MovimentacaoDTO[]
    >([]);

    const [busca, setBusca] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;

    // =========================================================
    // VALIDAÇÃO DOS DADOS
    // =========================================================

    function validarMovimentacao(
        movimentacao: MovimentacaoDTO
    ): boolean {
        // ID da movimentação
        if (
            typeof movimentacao.id_movimentacao !== "number" ||
            !Number.isInteger(movimentacao.id_movimentacao) ||
            movimentacao.id_movimentacao <= 0
        ) {
            console.error(
                "ID da movimentação inválido:",
                movimentacao
            );

            return false;
        }

        // ID do produto
        if (
            typeof movimentacao.id_produto !== "number" ||
            !Number.isInteger(movimentacao.id_produto) ||
            movimentacao.id_produto <= 0
        ) {
            console.error(
                "ID do produto inválido:",
                movimentacao
            );

            return false;
        }

        // Quantidade
        if (
            typeof movimentacao.quantidade !== "number" ||
            !Number.isFinite(movimentacao.quantidade) ||
            movimentacao.quantidade <= 0
        ) {
            console.error(
                "Quantidade inválida:",
                movimentacao
            );

            return false;
        }

        // Preço unitário
        if (
            typeof movimentacao.preco_unitario !== "number" ||
            !Number.isFinite(movimentacao.preco_unitario) ||
            movimentacao.preco_unitario < 0
        ) {
            console.error(
                "Preço unitário inválido:",
                movimentacao
            );

            return false;
        }

        // Valor total
        if (
            typeof movimentacao.valor_total !== "number" ||
            !Number.isFinite(movimentacao.valor_total) ||
            movimentacao.valor_total < 0
        ) {
            console.error(
                "Valor total inválido:",
                movimentacao
            );

            return false;
        }

        // Data
        if (
            typeof movimentacao.data_movimentacao !== "string" ||
            movimentacao.data_movimentacao.trim() === ""
        ) {
            console.error(
                "Data da movimentação inválida:",
                movimentacao
            );

            return false;
        }

        const data = new Date(
            movimentacao.data_movimentacao
        );

        if (Number.isNaN(data.getTime())) {
            console.error(
                "Data da movimentação inválida:",
                movimentacao
            );

            return false;
        }

        // Tipo
        if (
            typeof movimentacao.tipo_movimentacao !== "string" ||
            movimentacao.tipo_movimentacao.trim() === ""
        ) {
            console.error(
                "Tipo de movimentação inválido:",
                movimentacao
            );

            return false;
        }

        const tipo =
            movimentacao.tipo_movimentacao
                .trim()
                .toUpperCase();

        const tiposPermitidos = [
            "ENTRADA",
            "SAÍDA",
            "SAIDA",
            "RECEBIMENTO",
            "RETIRADA",
        ];

        if (!tiposPermitidos.includes(tipo)) {
            console.error(
                "Tipo de movimentação não permitido:",
                tipo
            );

            return false;
        }

        return true;
    }

    // =========================================================
    // CONVERSÃO SEGURA DE NÚMEROS
    // =========================================================

    function converterNumero(
        valor: number | string | null | undefined
    ): number {
        if (
            valor === null ||
            valor === undefined ||
            valor === ""
        ) {
            return 0;
        }

        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            return 0;
        }

        return numero;
    }

    // =========================================================
    // BUSCAR MOVIMENTAÇÕES
    // =========================================================

    useEffect(() => {
        async function buscarMovimentacoes() {
            try {
                setCarregando(true);

                const resposta =
                    await MovimentacaoRequests.obterListaDeMovimentacoes();

                console.log(
                    "Movimentações recebidas:",
                    resposta
                );

                // Validação da resposta da API
                if (!Array.isArray(resposta)) {
                    console.error(
                        "A API não retornou uma lista válida."
                    );

                    setMovimentacoes([]);

                    return;
                }

                const movimentacoesNormalizadas =
                    resposta.map((movimentacao) => {
                        const item =
                            movimentacao as MovimentacaoDTO & {
                                tipo?: string | null;
                                tipoMovimentacao?: string | null;
                                preco?: number | string | null;
                                precoUnitario?: number | string | null;
                                valorTotal?: number | string | null;
                            };

                        // -----------------------------
                        // MOTIVO
                        // -----------------------------

                        const motivo =
                            String(
                                item.motivo ?? ""
                            ).trim();

                        // -----------------------------
                        // TIPO
                        // -----------------------------

                        let tipo =
                            String(
                                item.tipo_movimentacao ??
                                    item.tipo ??
                                    item.tipoMovimentacao ??
                                    ""
                            )
                                .trim()
                                .toUpperCase();

                        /*
                         * Caso a API não envie o tipo,
                         * tenta identificar pelo motivo.
                         */

                        if (!tipo) {
                            if (
                                /entrada|recebimento/i.test(
                                    motivo
                                )
                            ) {
                                tipo = "ENTRADA";
                            } else if (
                                /sa[ií]da|retirada/i.test(
                                    motivo
                                )
                            ) {
                                tipo = "SAÍDA";
                            }
                        }

                        // -----------------------------
                        // QUANTIDADE
                        // -----------------------------

                        const quantidade =
                            converterNumero(
                                item.quantidade
                            );

                        // -----------------------------
                        // PREÇO UNITÁRIO
                        // -----------------------------

                        const precoUnitario =
                            converterNumero(
                                item.preco_unitario ??
                                    item.preco ??
                                    item.precoUnitario
                            );

                        // -----------------------------
                        // VALOR TOTAL
                        // -----------------------------

                        const valorInformado =
                            converterNumero(
                                item.valor_total ??
                                    item.valorTotal
                            );

                        const valorCalculado =
                            quantidade *
                            precoUnitario;

                        const valorTotal =
                            valorInformado > 0
                                ? valorInformado
                                : valorCalculado;

                        return {
                            ...item,

                            quantidade,

                            tipo_movimentacao:
                                tipo,

                            preco_unitario:
                                precoUnitario,

                            valor_total:
                                Number.isFinite(
                                    valorTotal
                                )
                                    ? valorTotal
                                    : 0,
                        } as MovimentacaoDTO;
                    });

                // Valida somente os dados válidos
                const movimentacoesValidas =
                    movimentacoesNormalizadas.filter(
                        (movimentacao) =>
                            validarMovimentacao(
                                movimentacao
                            )
                    );

                setMovimentacoes(
                    movimentacoesValidas
                );

                if (
                    movimentacoesValidas.length !==
                    resposta.length
                ) {
                    console.warn(
                        "Algumas movimentações foram removidas por possuírem dados inválidos."
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar movimentações:",
                    error
                );

                setMovimentacoes([]);

                alert(
                    "Erro ao carregar a listagem de movimentações."
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarMovimentacoes();
    }, []);

    // =========================================================
    // FILTRO
    // =========================================================

    const termoBusca =
        busca.trim().toLowerCase();

    const movimentacoesFiltradas =
        movimentacoes.filter(
            (movimentacao) => {
                if (!termoBusca) {
                    return true;
                }

                const motivo =
                    movimentacao.motivo
                        ?.toLowerCase() ?? "";

                const observacao =
                    movimentacao.observacao
                        ?.toLowerCase() ?? "";

                const tipo =
                    movimentacao.tipo_movimentacao
                        ?.toLowerCase() ?? "";

                const idProduto =
                    String(
                        movimentacao.id_produto
                    );

                const idMovimentacao =
                    String(
                        movimentacao.id_movimentacao
                    );

                return (
                    motivo.includes(
                        termoBusca
                    ) ||
                    observacao.includes(
                        termoBusca
                    ) ||
                    tipo.includes(
                        termoBusca
                    ) ||
                    idProduto.includes(
                        termoBusca
                    ) ||
                    idMovimentacao.includes(
                        termoBusca
                    )
                );
            }
        );

    // =========================================================
    // PAGINAÇÃO
    // =========================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                movimentacoesFiltradas.length /
                    rowsPerPage
            )
        );

    const indexOfFirstRow =
        (currentPage - 1) *
        rowsPerPage;

    const indexOfLastRow =
        indexOfFirstRow +
        rowsPerPage;

    const currentMovimentacoes =
        movimentacoesFiltradas.slice(
            indexOfFirstRow,
            indexOfLastRow
        );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    function paginate(
        pageNumber: number
    ) {
        const pagina =
            Math.min(
                Math.max(
                    pageNumber,
                    1
                ),
                totalPages
            );

        setCurrentPage(pagina);
    }

    // =========================================================
    // BUSCA
    // =========================================================

    function handleBusca(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor =
            event.target.value;

        // Limite da busca
        if (valor.length > 100) {
            return;
        }

        setBusca(valor);
        setCurrentPage(1);
    }

    // =========================================================
    // REMOVER
    // =========================================================

    async function handleRemoverMovimentacao(
        id_movimentacao: number
    ) {
        // Validação antes de enviar para a API
        if (
            !Number.isInteger(
                id_movimentacao
            ) ||
            id_movimentacao <= 0
        ) {
            alert(
                "ID da movimentação inválido."
            );

            return;
        }

        const confirmar =
            window.confirm(
                "Você realmente deseja remover esta movimentação?"
            );

        if (!confirmar) {
            return;
        }

        try {
            await MovimentacaoRequests.removerMovimentacao(
                id_movimentacao
            );

            setMovimentacoes(
                (
                    movimentacoesAtuais
                ) =>
                    movimentacoesAtuais.filter(
                        (
                            movimentacao
                        ) =>
                            movimentacao.id_movimentacao !==
                            id_movimentacao
                    )
            );

            alert(
                "Movimentação removida com sucesso."
            );
        } catch (error) {
            console.error(
                "Erro ao remover movimentação:",
                error
            );

            const mensagem =
                error instanceof Error
                    ? error.message
                    : "Erro ao remover movimentação.";

            alert(mensagem);
        }
    }

    // =========================================================
    // FORMATAR VALOR
    // =========================================================

    function formatarValor(
        valor:
            | number
            | string
            | null
            | undefined
    ) {
        const numero =
            converterNumero(valor);

        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        ).format(numero);
    }

    // =========================================================
    // FORMATAR DATA
    // =========================================================

    function formatarData(
        data: string
    ) {
        if (
            !data ||
            typeof data !== "string"
        ) {
            return "—";
        }

        const dataConvertida =
            new Date(data);

        if (
            Number.isNaN(
                dataConvertida.getTime()
            )
        ) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        ).format(
            dataConvertida
        );
    }

    // =========================================================
    // VERIFICAR ENTRADA
    // =========================================================

    function isEntrada(
        movimentacao: MovimentacaoDTO
    ) {
        const tipo =
            movimentacao.tipo_movimentacao
                ?.trim()
                .toUpperCase() ?? "";

        return (
            tipo === "ENTRADA" ||
            tipo === "RECEBIMENTO"
        );
    }

    // =========================================================
    // JSX
    // =========================================================

    return (
        <main className="flex-1 bg-black px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-[1500px]">

                {/* CABEÇALHO */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="mb-1 flex items-center gap-2">

                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-950 text-teal-400">

                                <i className="pi pi-arrow-right-arrow-left" />

                            </span>

                            <h1 className="text-2xl font-bold tracking-tight text-teal-400 sm:text-3xl">

                                Movimentações

                            </h1>

                        </div>

                        <p className="text-sm text-slate-400">

                            Acompanhe as movimentações de estoque do sistema.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/cadastro/movimentacao"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-teal-400 hover:shadow-md active:scale-[0.98]"
                    >

                        <span className="text-lg leading-none">
                            +
                        </span>

                        Nova Movimentação

                    </button>

                </div>

                {/* BUSCA */}

                <div className="mb-5 rounded-xl border border-teal-900 bg-zinc-950 p-4 shadow-sm">

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-500">

                            <i className="pi pi-search" />

                        </span>

                        <input
                            type="text"
                            name="buscar-movimentacao"
                            id="buscar-movimentacao"
                            value={busca}
                            onChange={handleBusca}
                            maxLength={100}
                            placeholder="Buscar por produto, tipo, motivo ou observação..."
                            className="w-full rounded-lg border border-zinc-800 bg-black py-3 pl-11 pr-10 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-900"
                        />

                        {busca && (

                            <button
                                type="button"
                                onClick={() => {
                                    setBusca("");
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-slate-400 transition hover:bg-teal-950 hover:text-teal-400"
                            >

                                <i className="pi pi-times" />

                            </button>

                        )}

                    </div>

                </div>

                {/* TABELA */}

                <div className="overflow-hidden rounded-xl border border-teal-900 bg-zinc-950 shadow-sm">

                    {/* CABEÇALHO */}

                    <div className="flex flex-col gap-2 border-b border-teal-900 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="font-semibold text-teal-400">

                                Lista de movimentações

                            </h2>

                            <p className="text-xs text-slate-400">

                                {movimentacoesFiltradas.length}{" "}

                                {movimentacoesFiltradas.length === 1
                                    ? "movimentação encontrada"
                                    : "movimentações encontradas"}

                            </p>

                        </div>

                        {busca && (

                            <span className="rounded-full bg-teal-950 px-3 py-1 text-xs font-medium text-teal-400">

                                Busca: "{busca}"

                            </span>

                        )}

                    </div>

                    {/* TABELA */}

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1000px] text-left text-sm">

                            <thead className="bg-teal-500 text-xs uppercase tracking-wide text-black">

                                <tr>

                                    <th className="px-5 py-4">
                                        ID
                                    </th>

                                    <th className="px-5 py-4">
                                        Produto
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Tipo
                                    </th>

                                    <th className="px-5 py-4">
                                        Motivo
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Qtd.
                                    </th>

                                    <th className="px-5 py-4">
                                        Preço Unit.
                                    </th>

                                    <th className="px-5 py-4">
                                        Valor Total
                                    </th>

                                    <th className="px-5 py-4">
                                        Data
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-zinc-800">

                                {/* CARREGANDO */}

                                {carregando ? (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="px-5 py-14 text-center"
                                        >

                                            <div className="flex flex-col items-center gap-3 text-slate-400">

                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-950 border-t-teal-400" />

                                                <span className="text-sm">

                                                    Carregando movimentações...

                                                </span>

                                            </div>

                                        </td>

                                    </tr>

                                ) : currentMovimentacoes.length > 0 ? (

                                    currentMovimentacoes.map(
                                        (movimentacao) => (

                                            <tr
                                                key={
                                                    movimentacao.id_movimentacao
                                                }
                                                className="group transition-colors hover:bg-teal-950/40"
                                            >

                                                {/* ID */}

                                                <td className="px-5 py-4 font-medium text-slate-500">

                                                    #
                                                    {
                                                        movimentacao.id_movimentacao
                                                    }

                                                </td>

                                                {/* PRODUTO */}

                                                <td className="px-5 py-4">

                                                    <span className="rounded-md bg-teal-950 px-2.5 py-1 font-mono text-xs font-medium text-teal-400">

                                                        #
                                                        {
                                                            movimentacao.id_produto
                                                        }

                                                    </span>

                                                </td>

                                                {/* TIPO */}

                                                <td className="px-5 py-4 text-center">

                                                    <span
                                                        className={`inline-flex min-w-20 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${
                                                            isEntrada(
                                                                movimentacao
                                                            )
                                                                ? "bg-emerald-950 text-emerald-400"
                                                                : "bg-red-950 text-red-400"
                                                        }`}
                                                    >

                                                        {
                                                            movimentacao.tipo_movimentacao
                                                        }

                                                    </span>

                                                </td>

                                                {/* MOTIVO */}

                                                <td className="max-w-[160px] px-5 py-4">

                                                    <p className="truncate text-slate-300">

                                                        {
                                                            movimentacao.motivo ??
                                                                "—"
                                                        }

                                                    </p>

                                                </td>

                                                {/* QUANTIDADE */}

                                                <td className="px-5 py-4 text-center font-semibold text-slate-200">

                                                    {
                                                        movimentacao.quantidade
                                                    }

                                                </td>

                                                {/* PREÇO UNITÁRIO */}

                                                <td className="whitespace-nowrap px-5 py-4 text-slate-300">

                                                    {formatarValor(
                                                        movimentacao.preco_unitario
                                                    )}

                                                </td>

                                                {/* VALOR TOTAL */}

                                                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-200">

                                                    {formatarValor(
                                                        movimentacao.valor_total
                                                    )}

                                                </td>

                                                {/* DATA */}

                                                <td className="whitespace-nowrap px-5 py-4 text-slate-400">

                                                    {formatarData(
                                                        movimentacao.data_movimentacao
                                                    )}

                                                </td>

                                                {/* AÇÕES */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center justify-center gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/detalhes/movimentacao/${movimentacao.id_movimentacao}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-teal-950 px-3 py-2 text-xs font-semibold text-teal-400 transition hover:bg-teal-500 hover:text-black"
                                                        >
                                                            Detalhes
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/atualizar/movimentacao/${movimentacao.id_movimentacao}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-emerald-950 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-black"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoverMovimentacao(
                                                                    movimentacao.id_movimentacao
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-950 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-black"
                                                        >
                                                            Excluir
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="px-5 py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-950 text-xl text-teal-400">

                                                    <i className="pi pi-arrow-right-arrow-left" />

                                                </div>

                                                <h3 className="font-semibold text-teal-400">

                                                    Nenhuma movimentação encontrada

                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">

                                                    {busca
                                                        ? "Tente pesquisar por outro produto, tipo, motivo ou observação."
                                                        : "Ainda não existem movimentações cadastradas."}

                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* PAGINAÇÃO */}

                    <div className="flex flex-col gap-4 border-t border-teal-900 bg-zinc-950 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-sm text-slate-400">

                            Mostrando{" "}

                            <span className="font-semibold text-teal-400">

                                {movimentacoesFiltradas.length > 0
                                    ? indexOfFirstRow + 1
                                    : 0}

                            </span>{" "}

                            até{" "}

                            <span className="font-semibold text-teal-400">

                                {Math.min(
                                    indexOfLastRow,
                                    movimentacoesFiltradas.length
                                )}

                            </span>{" "}

                            de{" "}

                            <span className="font-semibold text-teal-400">

                                {
                                    movimentacoesFiltradas.length
                                }

                            </span>{" "}

                            resultados

                        </p>

                        <div className="flex items-center gap-1">

                            {/* ANTERIOR */}

                            <button
                                type="button"
                                onClick={() =>
                                    paginate(
                                        currentPage - 1
                                    )
                                }
                                disabled={
                                    currentPage === 1
                                }
                                className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-teal-400 transition hover:bg-teal-950 disabled:cursor-not-allowed disabled:opacity-40"
                            >

                                <i className="pi pi-chevron-left" />

                            </button>

                            {/* NÚMEROS */}

                            {Array.from(
                                {
                                    length: totalPages,
                                },
                                (_, index) =>
                                    index + 1
                            ).map(
                                (page) => (

                                    <button
                                        type="button"
                                        key={page}
                                        onClick={() =>
                                            paginate(
                                                page
                                            )
                                        }
                                        className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            currentPage ===
                                            page
                                                ? "bg-teal-500 text-black shadow-sm"
                                                : "border border-zinc-800 bg-black text-teal-400 hover:bg-teal-950"
                                        }`}
                                    >

                                        {page}

                                    </button>

                                )
                            )}

                            {/* PRÓXIMA */}

                            <button
                                type="button"
                                onClick={() =>
                                    paginate(
                                        currentPage + 1
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-teal-400 transition hover:bg-teal-950 disabled:cursor-not-allowed disabled:opacity-40"
                            >

                                <i className="pi pi-chevron-right" />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default ListagemMovimentacoes;