import api from "./api";
import type { CategoriaDTO } from "../dto/CategoriaDTO";

const STORAGE_KEY = "categorias-interface-infotech";

const categoriasPadrao: CategoriaDTO[] = [
  { id_categoria: 1, nome: "Eletrônicos" },
  { id_categoria: 2, nome: "Periféricos" },
  { id_categoria: 3, nome: "Acessórios" },
];

function lerCategoriasLocais(): CategoriaDTO[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);

    if (salvo) {
      return JSON.parse(salvo) as CategoriaDTO[];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriasPadrao));
    return categoriasPadrao;
  } catch {
    return categoriasPadrao;
  }
}

export async function listarCategorias() {
  try {
    const response = await api.get("/api/categorias");
    return response.data;
  } catch {
    return lerCategoriasLocais();
  }
}

export async function cadastrarCategoria(categoria: CategoriaDTO) {
  try {
    const response = await api.post("/api/categorias", categoria);
    return response.data;
  } catch {
    const categorias = lerCategoriasLocais();
    const atualizadas = [...categorias, categoria];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
    return categoria;
  }
}

export async function atualizarCategoria(id: number, categoria: CategoriaDTO) {
  try {
    const response = await api.put(`/api/categorias/${id}`, categoria);
    return response.data;
  } catch {
    const categorias = lerCategoriasLocais();
    const atualizadas = categorias.map((item) =>
      item.id_categoria === id ? { ...item, ...categoria } : item,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
    return { ...categoria, id_categoria: id };
  }
}

export async function excluirCategoria(id: number) {
  try {
    const response = await api.delete(`/api/categorias/${id}`);
    return response.data;
  } catch {
    const categorias = lerCategoriasLocais();
    const filtradas = categorias.filter((item) => item.id_categoria !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
    return true;
  }
}
