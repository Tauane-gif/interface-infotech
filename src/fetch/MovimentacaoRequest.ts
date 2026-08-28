import api from "./api";
import type { MovimentacaoDTO } from "../dto/MovimentacaoDTO";

const STORAGE_KEY = "movimentacoes-interface-infotech";

const movimentacoesPadrao: MovimentacaoDTO[] = [
  {
    id_movimentacao: 1,
    id_produto: 1,
    tipo: "ENTRADA",
    motivo: "COMPRA",
    quantidade: 10,
    preco_unitario_praticado: 150.0,
    valor_total: 1500.0,
    observacao: "Compra de material para estoque",
    data_movimentacao: new Date().toISOString(),
  },
  {
    id_movimentacao: 2,
    id_produto: 2,
    tipo: "SAIDA",
    motivo: "VENDA",
    quantidade: 3,
    preco_unitario_praticado: 180.0,
    valor_total: 540.0,
    observacao: "Venda registrada no caixa",
    data_movimentacao: new Date().toISOString(),
  },
];

function lerMovimentacoesLocais(): MovimentacaoDTO[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);

    if (salvo) {
      return JSON.parse(salvo) as MovimentacaoDTO[];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(movimentacoesPadrao));
    return movimentacoesPadrao;
  } catch {
    return movimentacoesPadrao;
  }
}

export async function listarMovimentacoes() {
  try {
    const response = await api.get("/api/movimentacoes");
    return response.data;
  } catch {
    return lerMovimentacoesLocais();
  }
}

export async function cadastrarMovimentacao(movimentacao: MovimentacaoDTO) {
  try {
    const response = await api.post("/api/movimentacoes", movimentacao);
    return response.data;
  } catch {
    const movimentacoes = lerMovimentacoesLocais();
    const atualizadas = [...movimentacoes, movimentacao];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
    return movimentacao;
  }
}

export async function atualizarMovimentacao(id: number, movimentacao: MovimentacaoDTO) {
  try {
    const response = await api.put(`/api/movimentacoes/${id}`, movimentacao);
    return response.data;
  } catch {
    const movimentacoes = lerMovimentacoesLocais();
    const atualizadas = movimentacoes.map((item) =>
      item.id_movimentacao === id ? { ...item, ...movimentacao } : item,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
    return { ...movimentacao, id_movimentacao: id };
  }
}

export async function excluirMovimentacao(id: number) {
  try {
    const response = await api.delete(`/api/movimentacoes/${id}`);
    return response.data;
  } catch {
    const movimentacoes = lerMovimentacoesLocais();
    const filtradas = movimentacoes.filter((item) => item.id_movimentacao !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
    return true;
  }
}
