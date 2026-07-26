import { gainers, losers, news } from '../data/mockData.js';

export default function NoticiasTab(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 900 }}>
      <div>
        <h2>Notícias e Ranking</h2>
        <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>
          Atualizado há 12 minutos
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div className="card elev-sm">
          <span className="card-title">Maiores altas</span>
          {gainers.map((g) => (
            <div
              key={g.ticker}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 13,
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-divider)',
              }}
            >
              <span style={{ fontWeight: 600 }}>
                {g.ticker}{' '}
                <span className="text-muted" style={{ fontWeight: 400 }}>
                  {g.name}
                </span>
              </span>
              <span style={{ fontWeight: 600, color: 'var(--positive-color)' }}>{g.change}</span>
            </div>
          ))}
        </div>
        <div className="card elev-sm">
          <span className="card-title">Maiores baixas</span>
          {losers.map((l) => (
            <div
              key={l.ticker}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 13,
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-divider)',
              }}
            >
              <span style={{ fontWeight: 600 }}>
                {l.ticker}{' '}
                <span className="text-muted" style={{ fontWeight: 400 }}>
                  {l.name}
                </span>
              </span>
              <span style={{ fontWeight: 600, color: 'var(--negative-color)' }}>{l.change}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h4 style={{ margin: 0 }}>Últimas notícias</h4>
        {news.map((n) => (
          <div key={n.title} className="card elev-sm" style={{ gap: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{n.title}</span>
            <span className="text-muted" style={{ fontSize: 12 }}>
              {n.source} · {n.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
