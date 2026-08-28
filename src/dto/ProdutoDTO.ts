export default interface ProdutoDTO {
  id_produto?: number;
  codigo?: string;
  nome?: string;
  descricao?: string | null;
  preco?: number;
  quantidade_estoque?: number;
  categoria_id?: number | null;
  ativo?: boolean;
}