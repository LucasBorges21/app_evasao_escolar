// Componentes visuais reutilizáveis

const TONE = {
  ALTO: 'red', ALTA: 'red', CRÍTICA: 'red',
  'MÉDIO': 'yellow', 'MÉDIA': 'yellow',
  BAIXO: 'green', BAIXA: 'green',
};
const STATUS_TONE = { Pendente: 'red', 'Em análise': 'yellow', Resolvido: 'green' };

export function Badge({ children, tone }) {
  const t = tone || TONE[children] || 'blue';
  return <span className={`badge badge-${t}`}>{children}</span>;
}

export const statusTone = (s) => STATUS_TONE[s] || 'blue';

export function StatCard({ label, value, tone = 'blue', hint }) {
  return (
    <div className={`card stat stat-${tone}`}>
      <div>
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
        {hint && <span className={`stat-hint txt-${tone}`}>{hint}</span>}
      </div>
      <span className={`stat-icon bg-${tone}`} />
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal card" role="dialog" aria-label={title}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ProgressBar({ value, tone = 'blue' }) {
  return (
    <div className="progress"><div className={`progress-fill bg-solid-${tone}`} style={{ width: `${value}%` }} /></div>
  );
}

// Gráfico de barras simples (1 série)
export function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.valor), 1);
  return (
    <div className="barchart">
      {data.map((d) => (
        <div className="bar-col" key={d.mes} title={`${d.mes}: ${d.valor}${d.previsto ? ' (previsto)' : ''}`}>
          <span className="bar-val">{d.valor}</span>
          <div className={`bar ${d.previsto ? 'bar-forecast' : ''}`} style={{ height: `${(d.valor / max) * 100}%` }} />
          <span className="bar-label">{d.mes}</span>
        </div>
      ))}
    </div>
  );
}

// Gráfico de barras agrupadas (notas por bimestre e disciplina)
export function GroupedBars({ groups, series, max = 10 }) {
  return (
    <div>
      <div className="grouped">
        {groups.map((g, gi) => (
          <div className="group" key={g}>
            <div className="group-bars">
              {series.map((s) => {
                const v = s.values[gi];
                return (
                  <div
                    key={s.name}
                    className="gbar"
                    style={{ height: v == null ? 0 : `${(v / max) * 100}%`, background: s.color }}
                    title={`${s.name} · ${g}: ${v ?? '—'}`}
                  />
                );
              })}
            </div>
            <span className="bar-label">{g}</span>
          </div>
        ))}
      </div>
      <div className="legend">
        {series.map((s) => (
          <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>
        ))}
      </div>
    </div>
  );
}

export const formatDate = (iso) => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
