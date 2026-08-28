import type ProdutoDTO from "../dto/ProdutoDTO";

const Produtorequest = {
  async listar(): Promise<unknown[]> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/produtos`);
      if (!response.ok) {
        return [];
      }
      return (await response.json().catch(() => [])) as unknown[];
    } catch {
      return [];
    }
  },

  async obterProdutoPorId(id_produto: number): Promise<ProdutoDTO | null> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/produtos/${id_produto}`);
      if (!response.ok) {
        return null;
      }
      return (await response.json().catch(() => null)) as ProdutoDTO | null;
    } catch {
      return null;
    }
  },

  async enviarFormularioProduto(produto: ProdutoDTO): Promise<ProdutoDTO | null> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      if (!response.ok) {
        return null;
      }
      return (await response.json().catch(() => null)) as ProdutoDTO | null;
    } catch {
      return null;
    }
  },
};

export default Produtorequest;