import { useState, type ChangeEvent, type FormEvent } from "react";
import { cadastrarMovimentacao } from "../../fetch/MovimentacaoRequest";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";

const tipoOptions = ["ENTRADA", "SAIDA"] as const;
const motivoOptions = ["COMPRA", "VENDA", "AJUSTE", "DEVOLUCAO", "PERDA", "TRANSFERENCIA"] as const;

export default function PCadastroMovimentacao() {
  const [form, setForm] = useState({
    id_produto: "",
    tipo: "ENTRADA",
    motivo: "COMPRA",
    quantidade: "",
    preco_unitario_praticado: "",
    observacao: "",
  });

  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.id_produto || Number.isNaN(Number(form.id_produto))) newErrors.id_produto = "Número inválido";
    if (!form.quantidade || Number.isNaN(Number(form.quantidade))) newErrors.quantidade = "Número inválido";
    if (!form.observacao.trim()) newErrors.observacao = "Obrigatório";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: "error", message: "Corrija os campos destacados." });
      return;
    }

    const movimentacao: MovimentacaoDTO = {
      id_produto: Number(form.id_produto),
      tipo: form.tipo as "ENTRADA" | "SAIDA",
      motivo: form.motivo as "COMPRA" | "VENDA" | "AJUSTE" | "DEVOLUCAO" | "PERDA" | "TRANSFERENCIA",
      quantidade: Number(form.quantidade),
      preco_unitario_praticado: form.preco_unitario_praticado ? Number(form.preco_unitario_praticado) : null,
      valor_total: form.preco_unitario_praticado ? Number(form.preco_unitario_praticado) * Number(form.quantidade) : null,
      observacao: form.observacao,
    };

    try {
      await cadastrarMovimentacao(movimentacao);
      setStatus({ type: "success", message: "Movimentação cadastrada com sucesso!" });
      setForm({
        id_produto: "",
        tipo: "ENTRADA",
        motivo: "COMPRA",
        quantidade: "",
        preco_unitario_praticado: "",
        observacao: "",
      });
      setErrors({});
    } catch (erro) {
      console.error(erro);
      setStatus({ type: "error", message: "Erro ao cadastrar movimentação." });
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Cadastrar Movimentação</h2>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <div className="row form-grid" style={{ gap: 12 }}>
          <div style={{ flex: "1 1 160px" }} className="form-field">
            <input
              name="id_produto"
              placeholder="ID do produto"
              value={form.id_produto}
              onChange={handleChange}
              className={errors.id_produto ? "input-error" : ""}
              aria-invalid={!!errors.id_produto}
            />
          </div>

          <div style={{ flex: "1 1 160px" }} className="form-field">
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              {tipoOptions.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1 1 200px" }} className="form-field">
            <select name="motivo" value={form.motivo} onChange={handleChange}>
              {motivoOptions.map((motivo) => (
                <option key={motivo} value={motivo}>{motivo}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1 1 160px" }} className="form-field">
            <input
              name="quantidade"
              placeholder="Quantidade"
              value={form.quantidade}
              onChange={handleChange}
              className={errors.quantidade ? "input-error" : ""}
              aria-invalid={!!errors.quantidade}
            />
          </div>

          <div style={{ flex: "1 1 180px" }} className="form-field">
            <input
              name="preco_unitario_praticado"
              placeholder="Preço unitário praticado"
              value={form.preco_unitario_praticado}
              onChange={handleChange}
            />
          </div>

          <div style={{ flex: "1 1 100%" }} className="form-field">
            <textarea
              name="observacao"
              placeholder="Observação"
              value={form.observacao}
              onChange={handleChange}
              className={errors.observacao ? "input-error" : ""}
              aria-invalid={!!errors.observacao}
              rows={4}
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
