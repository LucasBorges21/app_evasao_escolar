import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Topbar } from '../components/Layout.jsx';
import { Badge, Modal } from '../components/ui.jsx';
import { TURMAS } from '../data/seed.js';
import { nivelRisco, useApp } from '../store/AppContext.jsx';

const vazio = { nome: '', turma: TURMAS[0], turno: 'Manhã', matricula: '', nascimento: '', responsavel: '', score: '' };

export default function Alunos() {
  const { students, addStudent } = useApp();
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [turma, setTurma] = useState('Todas');
  const [risco, setRisco] = useState('Todos');
  const [form, setForm] = useState(null);

  const lista = students
    .filter((s) => s.nome.toLowerCase().includes(busca.toLowerCase()) || s.matricula.includes(busca))
    .filter((s) => turma === 'Todas' || s.turma === turma)
    .filter((s) => risco === 'Todos' || nivelRisco(s.score) === risco)
    .sort((a, b) => b.score - a.score);

  const salvar = (e) => {
    e.preventDefault();
    const id = addStudent(form);
    setForm(null);
    navigate(`/alunos/${id}`);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <Topbar title="Alunos" />
      <div className="content">
        <div className="card toolbar">
          <input className="search" placeholder="Buscar por nome ou matrícula…" value={busca} onChange={(e) => setBusca(e.target.value)} />
          <select value={turma} onChange={(e) => setTurma(e.target.value)}>
            <option>Todas</option>
            {TURMAS.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={risco} onChange={(e) => setRisco(e.target.value)}>
            <option>Todos</option><option>ALTO</option><option>MÉDIO</option><option>BAIXO</option>
          </select>
          <button className="btn btn-primary push-right" onClick={() => setForm({ ...vazio })}>+ Novo aluno</button>
        </div>

        <section className="card panel grow">
          <h3 className="tab-title">{lista.length} aluno(s)</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Nome</th><th>Matrícula</th><th>Turma</th><th>Turno</th><th>Score</th><th>Nível</th><th>Tutoria</th><th /></tr>
              </thead>
              <tbody>
                {lista.map((s) => (
                  <tr key={s.id}>
                    <td className="strong">{s.nome}</td>
                    <td>{s.matricula}</td>
                    <td>{s.turma}</td>
                    <td>{s.turno}</td>
                    <td>{s.score}/100</td>
                    <td><Badge>{nivelRisco(s.score)}</Badge></td>
                    <td>{s.emTutoria ? <span className="txt-green">Ativa</span> : <span className="muted">—</span>}</td>
                    <td><Link className="btn btn-outline btn-sm" to={`/alunos/${s.id}`}>Ver Perfil</Link></td>
                  </tr>
                ))}
                {!lista.length && <tr><td colSpan="8" className="muted center">Nenhum aluno encontrado.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {form && (
        <Modal title="Cadastrar aluno" onClose={() => setForm(null)}>
          <form className="form-grid" onSubmit={salvar}>
            <label className="span-2">Nome completo<input required value={form.nome} onChange={set('nome')} /></label>
            <label>Matrícula<input required value={form.matricula} onChange={set('matricula')} placeholder="2026.0001" /></label>
            <label>Nascimento<input type="date" value={form.nascimento} onChange={set('nascimento')} /></label>
            <label>Turma<select value={form.turma} onChange={set('turma')}>{TURMAS.map((t) => <option key={t}>{t}</option>)}</select></label>
            <label>Turno<select value={form.turno} onChange={set('turno')}><option>Manhã</option><option>Tarde</option><option>Noite</option></select></label>
            <label>Responsável<input value={form.responsavel} onChange={set('responsavel')} /></label>
            <label>Score de risco inicial (0–100)<input type="number" min="0" max="100" value={form.score} onChange={set('score')} /></label>
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
