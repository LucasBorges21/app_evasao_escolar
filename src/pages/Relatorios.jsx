import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar } from '../components/Layout.jsx';
import { Badge, formatDate, StatCard, statusTone } from '../components/ui.jsx';
import { TURMAS } from '../data/seed.js';
import { useApp } from '../store/AppContext.jsx';

const MESES = [
  ['Todos', 'Todos'], ['2026-05', 'Mai/2026'], ['2026-06', 'Jun/2026'],
];

export default function Relatorios() {
  const { alerts, students, setAlertStatus } = useApp();
  const [turma, setTurma] = useState('Todas');
  const [periodo, setPeriodo] = useState('2026-06');
  const [risco, setRisco] = useState('Todos');

  const aluno = (id) => students.find((s) => s.id === id);
  const lista = alerts
    .map((a) => ({ ...a, aluno: aluno(a.alunoId) }))
    .filter((a) => a.aluno)
    .filter((a) => turma === 'Todas' || a.aluno.turma === turma)
    .filter((a) => periodo === 'Todos' || a.data.startsWith(periodo))
    .filter((a) => risco === 'Todos' || a.urgencia === risco)
    .sort((a, b) => b.data.localeCompare(a.data));

  const count = (fn) => lista.filter(fn).length;

  return (
    <>
      <Topbar title="Alertas e Relatórios" />
      <div className="content">
        <div className="card toolbar no-print">
          <span className="muted small strong">Filtros:</span>
          <select value={turma} onChange={(e) => setTurma(e.target.value)}>
            <option value="Todas">Turma: Todas</option>
            {TURMAS.map((t) => <option key={t} value={t}>Turma: {t}</option>)}
          </select>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            {MESES.map(([v, l]) => <option key={v} value={v}>Período: {l}</option>)}
          </select>
          <select value={risco} onChange={(e) => setRisco(e.target.value)}>
            <option value="Todos">Risco: Todos</option>
            <option value="ALTA">Risco: Alta</option>
            <option value="MÉDIA">Risco: Média</option>
            <option value="BAIXA">Risco: Baixa</option>
          </select>
          <button className="btn btn-primary push-right" onClick={() => window.print()}>⬇ Exportar PDF</button>
        </div>

        <div className="grid-4">
          <StatCard label="Total de Alertas" value={lista.length} tone="blue" />
          <StatCard label="Urgência Alta" value={count((a) => a.urgencia === 'ALTA')} tone="red" />
          <StatCard label="Urgência Média" value={count((a) => a.urgencia === 'MÉDIA')} tone="yellow" />
          <StatCard label="Resolvidos" value={count((a) => a.status === 'Resolvido')} tone="green" />
        </div>

        <section className="card panel grow">
          <h3 className="tab-title">Alertas Automáticos do Sistema</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Aluno</th><th>Descrição do Alerta</th><th>Turma</th><th>Data</th><th>Urgência</th><th>Status</th></tr>
              </thead>
              <tbody>
                {lista.map((a) => (
                  <tr key={a.id}>
                    <td className="strong"><Link className="plain-link" to={`/alunos/${a.alunoId}`}>{a.aluno.nome}</Link></td>
                    <td className="muted">{a.descricao}</td>
                    <td>{a.aluno.turma}</td>
                    <td>{formatDate(a.data)}</td>
                    <td><Badge>{a.urgencia}</Badge></td>
                    <td>
                      <select
                        className={`status-select txt-${statusTone(a.status)}`}
                        value={a.status}
                        onChange={(e) => setAlertStatus(a.id, e.target.value)}
                      >
                        <option>Pendente</option><option>Em análise</option><option>Resolvido</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {!lista.length && <tr><td colSpan="6" className="muted center">Nenhum alerta para os filtros selecionados.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
