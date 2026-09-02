import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import EditarProduto from "../../components/Editar/EditarMovimentacao";

function PEditarProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <EditarProduto />

            <Rodape />
        </div>
    );
}

export default PEditarProduto;