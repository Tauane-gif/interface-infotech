import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type ProdutoDTO from '../../../dto/ProdutoDTO';
import ProdutoRequests from '../../../fetch/Produtorequest';

function FormProduto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProdutoDTO>({
        codigo: '',
        nome: '',
        descricao: '',
        preco: 0,
        quantidade_estoque: 0,
        categoria_id: null,
        ativo: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
            return;
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resposta = await ProdutoRequests.enviarFormularioProduto(formData);
        if (resposta) {
            alert("Produto cadastrado com sucesso");
            navigate('/lista/produtos');
        } else {
            alert("Erro ao cadastrar produto");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Produto
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Código e Nome */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="codigo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    name="codigo"
                                    id="codigo"
                                    required
                                    value={formData.codigo}
                                    onChange={handleChange}
                                    placeholder="Ex: PER-001"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={2}
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do produto"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Categoria */}
                        <div>
                            <label htmlFor="categoria_id" className="block text-sm font-semibold text-slate-700 mb-2">
                                Categoria
                            </label>
                            <select
                                name="categoria_id"
                                id="categoria_id"
                                required
                                value={formData.categoria_id ?? ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white"
                            >
                                <option value="" disabled>
                                    Selecione uma categoria
                                </option>
                                {/* TODO: popular dinamicamente via CategoriaRequests.listar() */}
                            </select>
                        </div>

                        {/* Linha 3: Descrição */}
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
                                placeholder="Digite a descrição do produto"
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                            />
                        </div>

                        {/* Linha 4: Preço e Quantidade em Estoque */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="preco" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preço (R$)
                                </label>
                                <input
                                    type="number"
                                    name="preco"
                                    id="preco"
                                    required
                                    min={0}
                                    step={0.01}
                                    value={formData.preco}
                                    onChange={handleChange}
                                    placeholder="Ex: 49.90"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="quantidade_estoque" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantidade em Estoque
                                </label>
                                <input
                                    type="number"
                                    name="quantidade_estoque"
                                    id="quantidade_estoque"
                                    required
                                    min={0}
                                    value={formData.quantidade_estoque}
                                    onChange={handleChange}
                                    placeholder="Ex: 10"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 5: Ativo */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="ativo"
                                id="ativo"
                                checked={formData.ativo}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-2 border-slate-300 text-slate-700 focus:ring-slate-500"
                            />
                            <label htmlFor="ativo" className="text-sm font-semibold text-slate-700">
                                Produto ativo
                            </label>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR PRODUTO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/produtos')}
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

export default FormProduto;