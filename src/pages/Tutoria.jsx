import { Link, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../components/Layout.jsx';
import { Badge, formatDate, ProgressBar } from '../components/ui.jsx';
import { DISCIPLINAS } from '../data/seed.js';
import { nivelRisco, useApp } from '../store/AppContext.jsx';

const LACUNA_TONE = { 'CRÍTICA': 'red', ALTA: 'orange', 'MÉDIA': 'yellow', BAIXA: 'green' };
const PROG_TONE = { 'Matemática': 'blue', 'Português': 'green', 'Ciências': 'yellow', 'História': 'red' };
const ICON = { 'Vídeo': '▶', Apostila: '📄', Exercício: '✏️' };
const ABREV = { 'Matemática': 'Mat.', 'Português': 'Port.', 'Ciências': 'Ciên.', 'História': 'Hist.' };

export default function Tutoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, toggleMaterial, updateStudent } = useApp();
  const emTutoria = students.filter((s) => s.emTutoria);
  const s = students.find((x) => x.id === id) || (!id ? emTutoria[0] : null);

  if (!s) {
    return (
      <>
        <Topbar title="Tutoria Personalizada" />
        <div className="content">
          <div className="card panel empty">
            <p>Nenhum aluno em tutoria no momento.</p>
            <Link className="btn btn-primary" to="/alunos">Escolher um aluno</Link>
          </div>
        </div>
      </>
    );
  }

  const recuperacao = Math.round(DISCIPLINAS.reduce((acc, d) => acc + (s.progresso[d] || 0), 0) / DISCIPLINAS.length);

  return (
    <>
      <Topbar title={`Tutoria Personalizada · ${s.nome}`} />
      <div className="content">
        {emTutoria.length > 1 && (
          <div className="card toolbar">
            <span className="muted small strong">Alunos em tutoria:</span>
            <select value={s.id} onChange={(e) => navigate(`/tutoria/${e.target.value}`)}>
              {emTutoria.map((x) => <option key={x.id} value={x.id}>{x.nome} ({x.turma})</option>)}
            </select>
          </div>
        )}

        <section className="card tutor-head">
          <div className="avatar sm" />
          <div className="grow-1">
            <strong>{s.nome}</strong>
            <p className="muted small">{s.turma} · Score: {s.score} ({nivelRisco(s.score)}) · Atualização: {formatDate(s.atualizadoEm)}</p>
            <div className="recovery">
              <span className="txt-green small strong">Recuperação: {recuperacao}%</span>
              <ProgressBar value={recuperacao} tone="green" />
            </div>
          </div>
          {s.emTutoria
            ? <button className="btn btn-ghost btn-sm" onClick={() => updateStudent(s.id, { emTutoria: false })}>Encerrar tutoria</button>
            : <button className="btn btn-success btn-sm" onClick={() => updateStudent(s.id, { emTutoria: true })}>Iniciar tutoria</button>}
        </section>

        <h3 className="section-title">Lacunas Identificadas</h3>
        {s.lacunas.length ? (
          <div className="grid-4">
            {s.lacunas.map((l) => (
              <div key={l.disciplina + l.topico} className={`card gap-card border-${LACUNA_TONE[l.nivel]}`}>
                <strong>{l.disciplina}</strong>
                <span className="muted small">{l.topico}</span>
                <Badge tone={LACUNA_TONE[l.nivel]}>{l.nivel}</Badge>
              </div>
            ))}
          </div>
        ) : <p className="muted">Nenhuma lacuna identificada para este aluno.</p>}

        <h3 className="section-title">Trilha de Estudos Recomendada</h3>
        <div className="grid-2 grow">
          <section className="card panel">
            <h4 className="muted">Materiais Recomendados</h4>
            {s.materiais.length ? (
              <ul className="materials">
                {s.materiais.map((m) => (
                  <li key={m.id}>
                    <span className="mat-icon">{ICON[m.tipo] || '•'}</span>
                    <div className="grow-1">
                      <strong>{m.titulo}</strong>
                      <span className="muted small">{m.tipo} · {m.duracao} min · {ABREV[m.disciplina]}</span>
                    </div>
                    <button
                      className={`check ${m.concluido ? 'done' : ''}`}
                      onClick={() => toggleMaterial(s.id, m.id)}
                      aria-label={m.concluido ? 'Marcar como pendente' : 'Marcar como concluído'}
                    >{m.concluido ? '✓' : ''}</button>
                  </li>
                ))}
              </ul>
            ) : <p className="muted">Nenhum material recomendado ainda.</p>}
          </section>
          <section className="card panel">
            <h4 className="muted">Progresso por Disciplina</h4>
            {DISCIPLINAS.map((d) => (
              <div className="prog-row" key={d}>
                <div className="prog-top"><span>{d}</span><strong className={`txt-${PROG_TONE[d]}`}>{s.progresso[d] || 0}%</strong></div>
                <ProgressBar value={s.progresso[d] || 0} tone={PROG_TONE[d]} />
              </div>
            ))}
            <p className="muted small mt">Marque um material como concluído para somar 10% ao progresso da disciplina.</p>
          </section>
        </div>
      </div>
    </>
  );
}
