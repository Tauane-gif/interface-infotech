import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import LoginForm from "../../components//FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";


function PLogin(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
       
            <Navegacao />

         
            <LoginForm />

            <Rodape />
        </div>
    );
}

export default PLogin;