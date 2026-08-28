export type TipoMovimentacao = 'ENTRADA' | 'SAIDA';

export type MotivoMovimentacao =
  | 'COMPRA'
  | 'VENDA'
  | 'AJUSTE'
  | 'DEVOLUCAO'
  | 'PERDA'
  | 'TRANSFERENCIA';

export interface MovimentacaoDTO {
  id_movimentacao?: number;
  id_produto: number;
  id_movimentacao_origem?: number | null;
  tipo: TipoMovimentacao;
  motivo: MotivoMovimentacao;
  quantidade: number;
  preco_unitario_praticado?: number | null;
  valor_total?: number | null;
  observacao: string;
  data_movimentacao?: string;
}
