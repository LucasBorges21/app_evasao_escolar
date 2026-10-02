import { Navigate, Route, Routes } from 'react-router-dom';
import { useApp } from './store/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alunos from './pages/Alunos.jsx';
import AlunoPerfil from './pages/AlunoPerfil.jsx';
import Tutoria from './pages/Tutoria.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Configuracoes from './pages/Configuracoes.jsx';

function Protected({ children, onlyGestor = false }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (onlyGestor && currentUser.perfil !== 'gestor') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { currentUser } = useApp();
  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
      <Route element={<Protected><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="alunos" element={<Alunos />} />
        <Route path="alunos/:id" element={<AlunoPerfil />} />
        <Route path="tutoria" element={<Tutoria />} />
        <Route path="tutoria/:id" element={<Tutoria />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="usuarios" element={<Protected onlyGestor><Usuarios /></Protected>} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
