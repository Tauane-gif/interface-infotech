import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import PCadastroProduto from './pages/PCadastroProduto/PCadastroProduto'
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
              Cadastrar
            </NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<PListagemProdutos />} />
            <Route path="/cadastro" element={<PCadastroProduto />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
