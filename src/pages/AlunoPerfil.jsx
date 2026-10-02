import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../components/Layout.jsx';
import { formatDate, GroupedBars } from '../components/ui.jsx';
import { DISCIPLINAS } from '../data/seed.js';
import { nivelRisco, useApp } from '../store/AppContext.jsx';

const CORES = { 'Matemática': '#4f8ff7', 'Português': '#f25c5c', 'Ciências': '#3dd68c', 'História': '#f5c242' };
const TABS = ['Dados Acadêmicos', 'Dados Comportamentais', 'Dados Socioeconômicos'];

function InfoGrid({ items }) {
  return (
    <div className="info-grid">
      {items.map(([k, v]) => (
        <div className="info-item" key={k}><span className="muted small">{k}</span><strong>{v}</strong></div>
      ))}
    </div>
  );
}

export default function AlunoPerfil() {
  const { id } = useParams();
  const { students, alerts, updateStudent } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const s = students.find((x) => x.id === id);
  if (!s) return <Navigate to="/alunos" replace />;

  const nivel = nivelRisco(s.score);
  const tone = nivel === 'ALTO' ? 'red' : nivel === 'MÉDIO' ? 'yellow' : 'green';
  const medias = DISCIPLINAS.map((d) => {
    const n = s.notas[d] || [];
    return [d, n.length ? (n.reduce((a, b) => a + b, 0) / n.length).toFixed(1).replace('.', ',') : '—'];
  });
  const alertasAluno = alerts.filter((a) => a.alunoId === s.id);

  const iniciarTutoria = () => {
    updateStudent(s.id, { emTutoria: true });
    navigate(`/tutoria/${s.id}`);
  };

  return (
    <>
      <Topbar title={`Alunos · ${s.nome}`} back="/alunos" />
      <div className="content">
        <section className="card profile-head accent-top">
          <div className="avatar">FOTO</div>
          <div className="profile-info">
            <h2>{s.nome}</h2>
            <p className="muted">{s.turma} • Turno: {s.turno} • Matrícula: {s.matricula}</p>
            <p className="muted">Nascimento: {formatDate(s.nascimento)} • Responsável: {s.responsavel || '—'}</p>
          </div>
          <div className="risk">
            <span className="risk-label">SCORE DE RISCO DE EVASÃO</span>
            <div className={`risk-pill risk-${tone}`}>{s.score}</div>
            <span className={`txt-${tone} small strong`}>▲ {nivel} RISCO</span>
          </div>
        </section>

        <div className="tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        <section className="card panel grow tab-panel">
          {tab === 0 && (
            <>
              <h3>Desempenho por Bimestre</h3>
              <div className="chart-box">
                <GroupedBars
                  groups={['1º Bim', '2º Bim', '3º Bim', '4º Bim']}
                  series={DISCIPLINAS.map((d) => ({ name: d, color: CORES[d], values: s.notas[d] || [] }))}
                />
              </div>
              <h4 className="mt">Média anual por disciplina</h4>
              <InfoGrid items={medias} />
            </>
          )}
          {tab === 1 && (
            <>
              <h3>Indicadores Comportamentais</h3>
              <InfoGrid items={[
                ['Frequência', `${s.comportamento.frequencia}%`],
                ['Faltas no ano', s.comportamento.faltas],
                ['Atrasos', s.comportamento.atrasos],
                ['Ocorrências disciplinares', s.comportamento.ocorrencias],
                ['Participação em aula', s.comportamento.participacao],
                ['Entregas atrasadas', s.comportamento.entregasAtrasadas],
              ]} />
              <h4 className="mt">Alertas deste aluno</h4>
              {alertasAluno.length ? (
                <ul className="simple-list">
                  {alertasAluno.map((a) => <li key={a.id}><span>{a.descricao}</span><span className="muted small">{formatDate(a.data)} · {a.status}</span></li>)}
                </ul>
              ) : <p className="muted">Nenhum alerta registrado.</p>}
            </>
          )}
          {tab === 2 && (
            <>
              <h3>Contexto Socioeconômico</h3>
              <InfoGrid items={[
                ['Renda familiar', s.socio.renda],
                ['Pessoas na casa', s.socio.moradores],
                ['Transporte até a escola', s.socio.transporte],
                ['Distância', s.socio.distancia],
                ['Acesso à internet', s.socio.internet],
                ['Trabalha / responsabilidades', s.socio.trabalha],
                ['Benefício social', s.socio.beneficio],
              ]} />
            </>
          )}
        </section>

        <button className="btn btn-success btn-block btn-lg" onClick={iniciarTutoria}>
          {s.emTutoria ? 'Abrir Tutoria Personalizada →' : 'Iniciar Tutoria Personalizada →'}
        </button>
      </div>
    </>
  );
}
