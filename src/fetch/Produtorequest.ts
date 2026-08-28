import api from "./api"
import type { ProdutoDTO } from "../dto/ProdutoDTO";

const STORAGE_KEY = "produtos-interface-infotech";

const produtosPadrao: ProdutoDTO[] = [
  {
    id_categoria: 1,
    codigo: "P001",
    nome: "Teclado Mecânico",
    preco_unitario: 249.9,
    quantidade_disponivel: 12,
    quantidade_minima: 3,
  },
  {
    id_categoria: 1,
    codigo: "P002",
    nome: "Mouse Gamer",
    preco_unitario: 179.9,
    quantidade_disponivel: 20,
    quantidade_minima: 5,
  },
  {
    id_categoria: 2,
    codigo: "P003",
    nome: "Monitor 24\"",
    preco_unitario: 899.0,
    quantidade_disponivel: 8,
    quantidade_minima: 2,
  },
];

function lerProdutosLocais(): ProdutoDTO[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);

    if (salvo) {
      return JSON.parse(salvo) as ProdutoDTO[];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtosPadrao));
    return produtosPadrao;
  } catch {
    return produtosPadrao;
  }
}

export async function listarProdutos() {
  try {
    const response = await api.get("/api/produtos");
    return response.data;
  } catch {
    return lerProdutosLocais();
  }
}

export async function cadastrarProduto(produto: ProdutoDTO) {
  try {
    const response = await api.post("/api/produtos", produto);
    return response.data;
  } catch {
    const produtos = lerProdutosLocais();
    const atualizados = [...produtos, produto];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
    return produto;
  }
}