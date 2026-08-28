import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import PCadastroCategoria from './pages/PCadastroCategoria/PCadastroCategoria'
import PCadastroMovimentacao from './pages/PCadastroMovimentacao/PCadastroMovimentacao'
import PCadastroProduto from './pages/PCadastroProduto/PCadastroProduto'
import PListagemCategorias from './pages/PListagemCategorias/PListagemCategorias'
import PListagemMovimentacoes from './pages/PListagemMovimentacoes/PListagemMovimentacoes'
import PListagemProdutos from './pages/PListagemProdutos/PListagemProdutos'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">Interface Infotech</div>

          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Produtos
            </NavLink>
            <NavLink
              to="/cadastro"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Cadastrar Produto
            </NavLink>
            <NavLink
              to="/categorias"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Categorias
            </NavLink>
            <NavLink
              to="/categorias/cadastro"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Cadastrar Categoria
            </NavLink>
            <NavLink
              to="/movimentacoes"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Movimentações
            </NavLink>
            <NavLink
              to="/movimentacoes/cadastro"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Cadastrar Movimentação
            </NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<PListagemProdutos />} />
            <Route path="/cadastro" element={<PCadastroProduto />} />
            <Route path="/categorias" element={<PListagemCategorias />} />
            <Route path="/categorias/cadastro" element={<PCadastroCategoria />} />
            <Route path="/movimentacoes" element={<PListagemMovimentacoes />} />
            <Route path="/movimentacoes/cadastro" element={<PCadastroMovimentacao />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
