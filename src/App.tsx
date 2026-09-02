import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemProduto from './pages/PListagemProduto/PListagemProduto'
import PListagemMovimentacao from './pages/PListagemMovimentacao/PListagemMovimentacao'
import PListagemCategoria from './pages/PListagemCategoria/PListagemCategoria'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route
          path='/lista/produtos'
          element={<PListagemProduto />}
        />
        <Route
          path='/lista/movimentacoes'
          element={<PListagemMovimentacao />}
        />
        <Route
          path='/lista/categorias'
          element={<PListagemCategoria />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App