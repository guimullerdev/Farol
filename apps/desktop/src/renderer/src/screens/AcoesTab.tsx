import { patrimonioTotal, portfolio } from '../data/mockData.js';

export default function AcoesTab(): React.JSX.Element {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 1100 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h2>Minhas ações</h2>
          <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>
            {portfolio.length} posições · {patrimonioTotal} investidos
          </p>
        </div>
        <input className="input" placeholder="Buscar ativo..." style={{ width: 220 }} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Ativo</th>
            <th>Qtd.</th>
            <th>Preço médio</th>
            <th>Preço atual</th>
            <th>Total</th>
            <th>P&amp;L</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((p) => (
            <tr key={p.ticker}>
              <td>
                <span style={{ fontWeight: 600 }}>{p.ticker}</span>{' '}
                <span className="text-muted">{p.name}</span>
              </td>
              <td>{p.qty}</td>
              <td>{p.avgPrice}</td>
              <td>{p.currentPrice}</td>
              <td style={{ fontWeight: 600 }}>{p.total}</td>
              <td>
                <span className={`tag ${p.isPositive ? 'tag-accent' : 'tag-neutral'}`}>{p.pl}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
