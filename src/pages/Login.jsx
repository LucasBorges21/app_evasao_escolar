import { useState } from 'react';
import { useApp } from '../store/AppContext.jsx';

export default function Login() {
  const { login } = useApp();
  const [perfil, setPerfil] = useState('gestor');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [esqueceu, setEsqueceu] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setErro(login(email, senha, perfil) || '');
  };

  const preencher = (p) => {
    setPerfil(p);
    setEmail(p === 'gestor' ? 'gestor@escola.edu.br' : 'professor@escola.edu.br');
    setSenha('123456');
    setErro('');
  };

  return (
    <div className="login-page">
      <div className="login-glow" />
      <form className="login-card card" onSubmit={submit}>
        <div className="login-logo">[ LOGO ]</div>
        <h2>Ecossistema Escolar Inteligente</h2>
        <p className="muted center">Acesse sua conta</p>
        <hr />
        <label className="field-label">Perfil de Acesso</label>
        <div className="segmented">
          <button type="button" className={perfil === 'gestor' ? 'on' : ''} onClick={() => setPerfil('gestor')}>
            ( {perfil === 'gestor' ? '•' : ' '} ) Gestor Escolar
          </button>
          <button type="button" className={perfil === 'professor' ? 'on' : ''} onClick={() => setPerfil('professor')}>
            ( {perfil === 'professor' ? '•' : ' '} ) Professor
          </button>
        </div>
        <label className="field-label" htmlFor="email">Usuário / E-mail</label>
        <input id="email" type="email" placeholder="usuario@escola.edu.br" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="field-label" htmlFor="senha">Senha</label>
        <input id="senha" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        {erro && <p className="error">{erro}</p>}
        <button className="btn btn-primary btn-block" type="submit">ENTRAR</button>
        <button type="button" className="link-btn center" onClick={() => setEsqueceu((v) => !v)}>Esqueceu sua senha?</button>
        {esqueceu && <p className="muted small center">Peça ao gestor da escola para redefinir sua senha em “Usuários”.</p>}

        <div className="demo-box">
          <span className="small muted">Acesso de demonstração (senha 123456):</span>
          <div className="demo-actions">
            <button type="button" className="chip" onClick={() => preencher('gestor')}>Entrar como Gestor</button>
            <button type="button" className="chip" onClick={() => preencher('professor')}>Entrar como Professor</button>
          </div>
        </div>
      </form>
    </div>
  );
}
