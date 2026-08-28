import { useEffect, useState } from "react";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";
import { listarCategorias } from "../../fetch/CategoriaRequest";

export default function PListagemCategorias() {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    listarCategorias()
      .then((dados) => {
        setCategorias(dados);
        setErro(null);
      })
      .catch((erroFetch) => {
        console.error(erroFetch);
        setErro("Não foi possível carregar as categorias.");
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Categorias</h2>

        {erro && <div className="alert alert-error">{erro}</div>}

        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id_categoria ?? categoria.nome}>
                  <td>{categoria.id_categoria ?? "-"}</td>
                  <td>{categoria.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
