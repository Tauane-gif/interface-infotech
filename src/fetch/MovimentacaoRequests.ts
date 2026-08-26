import type MovimentacaoDTO from "../dto/MovimentacaoDTO";

const MovimentacaoRequests = {
  async listarMovimentacoes(): Promise<MovimentacaoDTO[]> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/movimentacoes`);

      if (!response.ok) {
        return [];
      }

      return (await response.json().catch(() => [])) as MovimentacaoDTO[];
    } catch {
      return [];
    }
  },

  async obterMovimentacaoPorId(id: number): Promise<MovimentacaoDTO | null> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/movimentacoes/${id}`);

      if (!response.ok) {
        return null;
      }

      return (await response.json().catch(() => null)) as MovimentacaoDTO | null;
    } catch {
      return null;
    }
  },
};

export default MovimentacaoRequests;
