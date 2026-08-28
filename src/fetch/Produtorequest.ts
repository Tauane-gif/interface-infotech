import type { ProdutoDTO } from "../dto/ProdutoDTO";

const getBaseUrl = () => import.meta.env.VITE_API_URL ?? "";

const listar = async (): Promise<ProdutoDTO[]> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/produtos`);
    if (!response.ok) return [];
    return (await response.json().catch(() => [])) as ProdutoDTO[];
  } catch {
    return [];
  }
};

const obterProdutoPorId = async (id_produto: number): Promise<ProdutoDTO | null> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/produtos/${id_produto}`);
    if (!response.ok) return null;
    return (await response.json().catch(() => null)) as ProdutoDTO | null;
  } catch {
    return null;
  }
};

const enviarFormularioProduto = async (produto: ProdutoDTO): Promise<ProdutoDTO | null> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
    if (!response.ok) return null;
    return (await response.json().catch(() => null)) as ProdutoDTO | null;
  } catch {
    return null;
  }
};

const Produtorequest = {
  listar,
  // alias para compatibilidade com código existente
  obterListaDeProdutos: listar,
  obterProdutoPorId,
  enviarFormularioProduto,
};

export default Produtorequest;