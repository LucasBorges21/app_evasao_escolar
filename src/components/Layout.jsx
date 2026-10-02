import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext.jsx';

const NAV = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/alunos', label: 'Alunos' },
  { to: '/relatorios', label: 'Relatórios' },
  { to: '/tutoria', label: 'Tutoria' },
  { to: '/usuarios', label: 'Usuários', onlyGestor: true },
  { to: '/configuracoes', label: 'Configurações' },
];

export default function Layout() {
  const { currentUser, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
      <aside className="sidebar">
        <div className="logo">[ LOGO ]</div>
        <nav onClick={() => setMenuOpen(false)}>
          {NAV.filter((n) => !n.onlyGestor || currentUser.perfil === 'gestor').map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-user">
          <strong>{currentUser.nome}</strong>
          <span>{currentUser.perfil === 'gestor' ? 'Gestor Escolar' : 'Professor'}</span>
          <button className="link-btn" onClick={logout}>Sair</button>
        </div>
      </aside>
      <div className="backdrop" onClick={() => setMenuOpen(false)} />
      <main className="main">
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">☰</button>
        <Outlet />
      </main>
    </div>
  );
}

export function Topbar({ title, back }) {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <h1>
        {back && <button className="back-btn" onClick={() => navigate(back)} aria-label="Voltar">←</button>}
        {title}
      </h1>
      <div className="user-menu">
        <button className="user-btn" onClick={() => setOpen((o) => !o)}>
          🔔 {currentUser.nome} ▾
        </button>
        {open && (
          <div className="dropdown" onMouseLeave={() => setOpen(false)}>
            <button onClick={() => { setOpen(false); navigate('/configuracoes'); }}>Configurações</button>
            <button onClick={logout}>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
