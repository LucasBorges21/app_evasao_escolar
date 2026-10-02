import { Link } from 'react-router-dom';
import { Topbar } from '../components/Layout.jsx';
import { Badge, BarChart, StatCard } from '../components/ui.jsx';
import { nivelRisco, useApp } from '../store/AppContext.jsx';

export default function Dashboard() {
  const { students, evolucaoMensal } = useApp();
  const emRisco = students.filter((s) => s.score >= 55);
  const altoRisco = students.filter((s) => s.score >= 70);
  const taxa = students.length ? ((altoRisco.length / students.length) * 100).toFixed(1).replace('.', ',') : '0';
  const ranking = [...students].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <>
      <Topbar title="Dashboard · Visão Geral" />
      <div className="content">
        <div className="grid-4">
          <StatCard label="Total de Alunos" value={students.length.toLocaleString('pt-BR')} tone="blue" hint="↑ vs. mês ant." />
          <StatCard label="Alunos em Risco" value={emRisco.length} tone="red" hint="↑ vs. mês ant." />
          <StatCard label="Taxa de Evasão Prevista" value={`${taxa}%`} tone="yellow" hint="↑ vs. mês ant." />
          <StatCard label="Alunos em Tutoria" value={students.filter((s) => s.emTutoria).length} tone="green" hint="↑ vs. mês ant." />
        </div>

        <section className="card panel">
          <div className="panel-head">
            <h3>Evolução Mensal do Risco de Evasão</h3>
            <div className="legend inline">
              <span><i className="bg-solid-blue-dim" />Score Médio</span>
              <span><i className="bg-solid-blue" />Tendência (previsto)</span>
            </div>
          </div>
          <BarChart data={evolucaoMensal} />
        </section>

        <section className="card panel grow">
          <h3 className="tab-title">Alunos em Risco · Ação Imediata</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Nome do Aluno</th><th>Turma</th><th>Score de Risco</th><th>Nível</th><th>Ação</th></tr>
              </thead>
              <tbody>
                {ranking.map((s) => (
                  <tr key={s.id}>
                    <td className="strong">{s.nome}</td>
                    <td>{s.turma}</td>
                    <td>{s.score}/100</td>
                    <td><Badge>{nivelRisco(s.score)}</Badge></td>
                    <td><Link className="btn btn-outline btn-sm" to={`/alunos/${s.id}`}>Ver Perfil</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
