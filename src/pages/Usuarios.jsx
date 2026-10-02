import { useState } from 'react';
import { Topbar } from '../components/Layout.jsx';
import { Badge, formatDate, Modal, StatCard } from '../components/ui.jsx';
import { useApp } from '../store/AppContext.jsx';

const vazio = { nome: '', email: '', senha: '', perfil: 'professor' };

export default function Usuarios() {
  const { users, currentUser, saveUser, toggleUser, deleteUser } = useApp();
  const [form, setForm] = useState(null);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  const abrir = (u) => { setErro(''); setForm(u ? { ...u } : { ...vazio }); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    if (form.senha.length < 6) return setErro('A senha precisa ter pelo menos 6 caracteres.');
    const msg = saveUser(form);
    if (msg) return setErro(msg);
    setForm(null);
  };

  const excluir = (u) => {
    if (window.confirm(`Excluir o usuário ${u.nome}?`)) deleteUser(u.id);
  };

  const lista = users.filter((u) => `${u.nome} ${u.email}`.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Topbar title="Usuários do Sistema" />
      <div className="content">
        <div className="grid-4">
          <StatCard label="Total de Usuários" value={users.length} tone="blue" />
          <StatCard label="Gestores" value={users.filter((u) => u.perfil === 'gestor').length} tone="yellow" />
          <StatCard label="Professores" value={users.filter((u) => u.perfil === 'professor').length} tone="green" />
          <StatCard label="Desativados" value={users.filter((u) => !u.ativo).length} tone="red" />
        </div>

        <div className="card toolbar">
          <input className="search" placeholder="Buscar por nome ou e-mail…" value={busca} onChange={(e) => setBusca(e.target.value)} />
          <button className="btn btn-primary push-right" onClick={() => abrir(null)}>+ Novo usuário</button>
        </div>

        <section className="card panel grow">
          <h3 className="tab-title">Cadastro de Usuários</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Criado em</th><th>Status</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {lista.map((u) => {
                  const eu = u.id === currentUser.id;
                  return (
                    <tr key={u.id}>
                      <td className="strong">{u.nome}{eu && <span className="muted small"> (você)</span>}</td>
                      <td>{u.email}</td>
                      <td><Badge tone={u.perfil === 'gestor' ? 'blue' : 'green'}>{u.perfil === 'gestor' ? 'GESTOR' : 'PROFESSOR'}</Badge></td>
                      <td>{formatDate(u.criadoEm)}</td>
                      <td>{u.ativo ? <span className="txt-green">Ativo</span> : <span className="txt-red">Desativado</span>}</td>
                      <td className="actions">
                        <button className="btn btn-outline btn-sm" onClick={() => abrir(u)}>Editar</button>
                        {!eu && <button className="btn btn-ghost btn-sm" onClick={() => toggleUser(u.id)}>{u.ativo ? 'Desativar' : 'Ativar'}</button>}
                        {!eu && <button className="btn btn-danger btn-sm" onClick={() => excluir(u)}>Excluir</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {form && (
        <Modal title={form.id ? 'Editar usuário' : 'Novo usuário'} onClose={() => setForm(null)}>
          <form className="form-grid" onSubmit={salvar}>
            <label className="span-2">Nome completo<input required value={form.nome} onChange={set('nome')} /></label>
            <label className="span-2">E-mail<input required type="email" value={form.email} onChange={set('email')} placeholder="nome@escola.edu.br" /></label>
            <label>Senha<input required type="text" value={form.senha} onChange={set('senha')} placeholder="mín. 6 caracteres" /></label>
            <label>Perfil
              <select value={form.perfil} onChange={set('perfil')} disabled={form.id === currentUser.id}>
                <option value="professor">Professor</option>
                <option value="gestor">Gestor Escolar</option>
              </select>
            </label>
            {erro && <p className="error span-2">{erro}</p>}
            <div className="form-actions span-2">
              <button type="button" className="btn btn-ghost" onClick={() => setForm(null)}>Cancelar</button>
              <button className="btn btn-primary">Salvar</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
