import { useEffect, useState } from "react";
import { listarProdutos } from "../../fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";

export default function PListagemProdutos() {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    listarProdutos()
      .then((dados) => {
        setProdutos(dados);
        setErro(null);
      })
      .catch((erroFetch) => {
        console.error(erroFetch);
        setErro('Não foi possível carregar os produtos. Verifique a API do backend.');
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Produtos</h2>

        {erro && <div className="alert alert-error">{erro}</div>}

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.preco_unitario}</td>
                  <td>{produto.quantidade_disponivel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}