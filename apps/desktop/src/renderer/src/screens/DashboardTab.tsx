import { useState } from 'react';
import {
  buildChartPaths,
  gainers,
  losers,
  marketIndicators,
  news,
  patrimonioTotal,
  patrimonioVariacao,
  topHoldings,
  type ChartRange,
} from '../data/mockData.js';

interface DashboardTabProps {
  onSeeAllNews: () => void;
}

const RANGES: ChartRange[] = ['1M', '6M', '1A'];

export default function DashboardTab({ onSeeAllNews }: DashboardTabProps): React.JSX.Element {
  const [range, setRange] = useState<ChartRange>('1M');
  const { linePath, areaPath } = buildChartPaths(range);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 1100 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>
            Bem-vindo de volta, Rafael
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          {marketIndicators.map((ind) => (
            <div
              key={ind.label}
              style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}
            >
              <span className="text-muted" style={{ fontSize: 11 }}>
                {ind.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{ind.value}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: ind.change.startsWith('+')
                    ? 'var(--positive-color)'
                    : ind.change.startsWith('-')
                      ? 'var(--negative-color)'
                      : 'inherit',
                }}
              >
                {ind.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-6)' }}>
        <div className="card elev-sm" style={{ padding: 'var(--space-6)' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <div>
              <span className="text-muted" style={{ fontSize: 12 }}>
                Patrimônio total
              </span>
              <h2 style={{ margin: '2px 0 4px' }}>{patrimonioTotal}</h2>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--positive-color)' }}>
                {patrimonioVariacao} nos últimos 30 dias
              </span>
            </div>
            <div className="seg">
              {RANGES.map((rg) => (
                <label
                  key={rg}
                  className={`seg-opt${range === rg ? ' is-checked' : ''}`}
                  onClick={() => setRange(rg)}
                >
                  <input type="radio" name="range" checked={range === rg} readOnly />
                  {rg}
                </label>
              ))}
            </div>
          </div>
          <svg
            viewBox="0 0 560 180"
            style={{ width: '100%', height: 180, marginTop: 'var(--space-3)' }}
          >
            <path d={areaPath} fill="url(#chartGrad)" stroke="none" />
            <path d={linePath} fill="none" stroke="var(--color-accent)" strokeWidth={2} />
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="card elev-sm" style={{ padding: 'var(--space-6)' }}>
          <span className="card-title">Carteira resumida</span>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-2)' }}>
            {topHoldings.map((h) => (
              <div
                key={h.ticker}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-2) 0',
                  borderBottom: '1px solid var(--color-divider)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{h.ticker}</span>
                  <span className="text-muted" style={{ fontSize: 11 }}>
                    {h.qty} un.
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{h.value}</span>
                  <span
                    className={`tag ${h.isPositive ? 'tag-accent' : 'tag-neutral'}`}
                    style={{ marginTop: 2 }}
                  >
                    {h.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-6)' }}>
        <div className="card elev-sm">
          <span className="card-title">Maiores altas</span>
          {gainers.slice(0, 4).map((g) => (
            <div
              key={g.ticker}
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}
            >
              <span style={{ fontWeight: 600 }}>{g.ticker}</span>
              <span style={{ fontWeight: 600, color: 'var(--positive-color)' }}>{g.change}</span>
            </div>
          ))}
        </div>
        <div className="card elev-sm">
          <span className="card-title">Maiores baixas</span>
          {losers.slice(0, 4).map((l) => (
            <div
              key={l.ticker}
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}
            >
              <span style={{ fontWeight: 600 }}>{l.ticker}</span>
              <span style={{ fontWeight: 600, color: 'var(--negative-color)' }}>{l.change}</span>
            </div>
          ))}
        </div>
        <div className="card elev-sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="card-title">Notícias em destaque</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSeeAllNews();
              }}
              className="btn-ghost btn"
              style={{ padding: 0, height: 'auto', fontSize: 11 }}
            >
              ver todas
            </a>
          </div>
          {news.slice(0, 3).map((n) => (
            <div key={n.title} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3 }}>{n.title}</span>
              <span className="text-muted" style={{ fontSize: 11 }}>
                {n.source} · {n.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
