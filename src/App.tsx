import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import PHome from "./pages/PHome/PHome";
import PLogin from "./pages/PLogin/PLogin";
import PConhecaLoja from "./pages/PConhecaLoja/PConhecaLoja";

import PListagemProduto from "./pages/PListagemProduto/PListagemProduto";
import PListagemCategoria from "./pages/PListagemCategoria/PListagemCategoria";
import PListagemMovimentacao from "./pages/PListagemMovimentacao/PListagemMovimentacao";

import PDetalhesCategoria from "./pages/PDetalhesCategoria/PDetalhesCategoria";
import PDetalhesMovimentacao from "./pages/PDetalhesMovimentacao/PDetalhesMovimentacao";
import PDetalhesProduto from "./pages/PDetalhesProduto/PDetalhesProduto";
import PEditarProduto from "./pages/PEditarProduto/PEditarProduto";
import PEditarCategoria from "./pages/PEditarCategoria/PEditarCategoria";
import PEditarMovimentacao from "./pages/PEditarMovimentacao/PEditarMovimentacao";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<PHome />}
                />

                <Route
                    path="/login"
                    element={<PLogin />}
                />

                <Route
                    path="/conheca-loja"
                    element={<PConhecaLoja />}
                />

                <Route
                    path="/lista/produtos"
                    element={<PListagemProduto />}
                />

                <Route
                    path="/lista/categorias"
                    element={<PListagemCategoria />}
                />

                <Route
                    path="/lista/movimentacoes"
                    element={<PListagemMovimentacao />}
                />

                <Route
                    path="/detalhes/categoria/:id"
                    element={<PDetalhesCategoria />}
                />

                <Route
                    path="/detalhes/movimentacao/:id"
                    element={<PDetalhesMovimentacao />}
                />

                <Route
                    path="/detalhes/produto/:id"
                    element={<PDetalhesProduto />}
                />

                <Route
                    path="/atualizar/produto/:id"
                    element={<PEditarProduto />}
                />

                <Route
                    path="/atualizar/categoria/:id"
                    element={<PEditarCategoria />}
                />

                <Route
                    path="/atualizar/movimentacao/:id"
                    element={<PEditarMovimentacao />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;