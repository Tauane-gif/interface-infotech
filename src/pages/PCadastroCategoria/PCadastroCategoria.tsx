import { useState, type ChangeEvent, type FormEvent } from "react";
import { cadastrarCategoria } from "../../fetch/CategoriaRequest";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";

export default function PCadastroCategoria() {
  const [form, setForm] = useState({ nome: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nome = form.nome.trim();
    const newErrors: Record<string, string> = {};

    if (!nome) newErrors.nome = "Obrigatório";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: "error", message: "Preencha o nome da categoria." });
      return;
    }

    const categoria: CategoriaDTO = { nome };

    try {
      await cadastrarCategoria(categoria);
      setStatus({ type: "success", message: "Categoria cadastrada com sucesso!" });
      setForm({ nome: "" });
      setErrors({});
    } catch (erro) {
      console.error(erro);
      setStatus({ type: "error", message: "Erro ao cadastrar categoria." });
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Cadastrar Categoria</h2>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <div className="row form-grid" style={{ gap: 12 }}>
          <div style={{ flex: "1 1 100%" }} className="form-field">
            <input
              name="nome"
              placeholder="Nome da categoria"
              value={form.nome}
              onChange={handleChange}
              className={errors.nome ? "input-error" : ""}
              aria-invalid={!!errors.nome}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
