import { useState } from 'react';
import { Topbar } from '../components/Layout.jsx';
import { useApp } from '../store/AppContext.jsx';

export default function Configuracoes() {
  const { currentUser, saveUser, resetData } = useApp();
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  const trocarSenha = (e) => {
    e.preventDefault();
    if (senha.length < 6) return setMsg('A senha precisa ter pelo menos 6 caracteres.');
    saveUser({ ...currentUser, senha });
    setSenha('');
    setMsg('Senha alterada com sucesso.');
  };

  const restaurar = () => {
    if (window.confirm('Restaurar todos os dados de exemplo? Alterações feitas serão perdidas.')) resetData();
  };

  return (
    <>
      <Topbar title="Configurações" />
      <div className="content">
        <div className="grid-2">
          <section className="card panel">
            <h3>Minha conta</h3>
            <p><span className="muted">Nome:</span> {currentUser.nome}</p>
            <p><span className="muted">E-mail:</span> {currentUser.email}</p>
            <p><span className="muted">Perfil:</span> {currentUser.perfil === 'gestor' ? 'Gestor Escolar' : 'Professor'}</p>
            <form className="inline-form mt" onSubmit={trocarSenha}>
              <input type="password" placeholder="Nova senha" value={senha} onChange={(e) => { setSenha(e.target.value); setMsg(''); }} />
              <button className="btn btn-primary">Alterar senha</button>
            </form>
            {msg && <p className="small mt">{msg}</p>}
          </section>
          <section className="card panel">
            <h3>Dados de demonstração</h3>
            <p className="muted">
              Este protótipo guarda os dados no navegador (localStorage). Nada é enviado para servidor.
              Use o botão abaixo para voltar aos alunos, alertas e usuários de exemplo.
            </p>
            <button className="btn btn-danger mt" onClick={restaurar}>Restaurar dados de exemplo</button>
          </section>
        </div>
      </div>
    </>
  );
}
