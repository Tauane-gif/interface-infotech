import type CategoriaDTO from '../dto/CategoriaDTO';

const BASE_URL = 'http://localhost:8080/categorias'; // ajuste para a URL real da sua API

export default class CategoriaRequests {
    // Envia os dados do formulário de categoria para a API via POST
    static async enviarFormularioCategoria(categoria: CategoriaDTO): Promise<boolean> {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            });

            return response.ok;
        } catch (erro) {
            console.error('Erro ao enviar formulário de categoria:', erro);
            return false;
        }
    }

    // Busca todas as categorias cadastradas
    static async listarCategorias(): Promise<CategoriaDTO[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                return [];
            }

            return await response.json();
        } catch (erro) {
            console.error('Erro ao listar categorias:', erro);
            return [];
        }
    }

    // Busca uma categoria específica pelo id
    static async buscarCategoriaPorId(id_categoria: number): Promise<CategoriaDTO | null> {
        try {
            const response = await fetch(`${BASE_URL}/${id_categoria}`);

            if (!response.ok) {
                return null;
            }

            return await response.json();
        } catch (erro) {
            console.error('Erro ao buscar categoria:', erro);
            return null;
        }
    }

    // Atualiza uma categoria existente
    static async atualizarCategoria(id_categoria: number, categoria: CategoriaDTO): Promise<boolean> {
        try {
            const response = await fetch(`${BASE_URL}/${id_categoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            });

            return response.ok;
        } catch (erro) {
            console.error('Erro ao atualizar categoria:', erro);
            return false;
        }
    }

    // Remove uma categoria pelo id
    static async removerCategoria(id_categoria: number): Promise<boolean> {
        try {
            const response = await fetch(`${BASE_URL}/${id_categoria}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (erro) {
            console.error('Erro ao remover categoria:', erro);
            return false;
        }
    }
}