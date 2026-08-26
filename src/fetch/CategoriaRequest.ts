import type CategoriaDTO from "../dto/CategoriaDTO";

const CategoriaRequest = {
  async listar(): Promise<CategoriaDTO[]> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/categorias`);
      if (!response.ok) {
        return [];
      }
      return (await response.json().catch(() => [])) as CategoriaDTO[];
    } catch {
      return [];
    }
  },

  async obterCategoriaPorId(id: number): Promise<CategoriaDTO | null> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/categorias/${id}`);
      if (!response.ok) {
        return null;
      }
      return (await response.json().catch(() => null)) as CategoriaDTO | null;
    } catch {
      return null;
    }
  },
};

export default CategoriaRequest;
