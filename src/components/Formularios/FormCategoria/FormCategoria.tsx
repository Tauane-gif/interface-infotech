import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriaRequests from '../../../fetch/CategoriaRequest';
import type CategoriaDTO from '../../../dto/CategoriaDTO';

function FormCategoria() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CategoriaDTO>({
        nome: '',
        descricao: '',
        ativo: true
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // Verifica se o campo alterado é um checkbox (ativo), se sim usa o valor "checked"
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // valida para saber se o campo nome foi preenchido corretamente
        if (!formData.nome || formData.nome.trim().length < 3) {
            alert("Nome inválido");
            return;
        }

        // chama o método que irá fazer a requisição à API
        const resposta = await CategoriaRequests.enviarFormularioCategoria(formData);
        if (resposta) {
            alert("Categoria cadastrada com sucesso");
        } else {
            alert("Erro ao cadastrar categoria");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Categoria
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Nome */}
                        <div>
                            <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                required
                                minLength={3}
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome da categoria"
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* Linha 2: Descrição */}
                        <div>
                            <label htmlFor="descricao" className="block text-sm font-semibold text-slate-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                rows={4}
                                value={formData.descricao ?? ''}
                                onChange={handleChange}
                                placeholder="Descreva a categoria..."
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                            />
                        </div>

                        {/* Linha 3: Ativo */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="ativo"
                                id="ativo"
                                checked={formData.ativo ?? true}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer"
                            />
                            <label htmlFor="ativo" className="text-sm font-semibold text-slate-700 cursor-pointer">
                                Categoria ativa
                            </label>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR CATEGORIA"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/categorias')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormCategoria;