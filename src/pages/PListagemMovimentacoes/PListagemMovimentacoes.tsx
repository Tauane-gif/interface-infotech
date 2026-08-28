import { useEffect, useState } from "react";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";
import { listarMovimentacoes } from "../../fetch/MovimentacaoRequest";

export default function PListagemMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    listarMovimentacoes()
      .then((dados) => {
        setMovimentacoes(dados);
        setErro(null);
      })
      .catch((erroFetch) => {
        console.error(erroFetch);
        setErro("Não foi possível carregar as movimentações.");
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Movimentações</h2>

        {erro && <div className="alert alert-error">{erro}</div>}

        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Motivo</th>
                <th>Qtde</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((movimentacao) => (
                <tr key={movimentacao.id_movimentacao ?? `${movimentacao.id_produto}-${movimentacao.data_movimentacao}`}>
                  <td>{movimentacao.id_movimentacao ?? "-"}</td>
                  <td>{movimentacao.id_produto}</td>
                  <td>{movimentacao.tipo}</td>
                  <td>{movimentacao.motivo}</td>
                  <td>{movimentacao.quantidade}</td>
                  <td>{movimentacao.valor_total ?? movimentacao.preco_unitario_praticado ?? "-"}</td>
                  <td>{movimentacao.data_movimentacao ? new Date(movimentacao.data_movimentacao).toLocaleDateString("pt-BR") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
