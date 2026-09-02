import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import EditarMovimentacao from "../../components/Editar/EditarMovimentacao";

function PEditarMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <EditarMovimentacao />

            <Rodape />
        </div>
    );
}

export default PEditarMovimentacao;