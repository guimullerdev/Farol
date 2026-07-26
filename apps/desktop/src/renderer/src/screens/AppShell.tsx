import { useState } from 'react';
import DashboardTab from './DashboardTab.js';
import AcoesTab from './AcoesTab.js';
import NoticiasTab from './NoticiasTab.js';
import ChatTab from './ChatTab.js';

type Tab = 'dashboard' | 'acoes' | 'noticias' | 'chat';

const NAV_ITEMS: Array<{ key: Tab; label: string }> = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'acoes', label: 'Ações' },
  { key: 'noticias', label: 'Notícias e Ranking' },
  { key: 'chat', label: 'Assistente IA' },
];

export default function AppShell(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>('dashboard');

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <div className="nav" style={{ borderBottom: '1px solid var(--color-divider)' }}>
        <span className="nav-brand">Farol</span>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href="#"
            className={tab === item.key ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setTab(item.key);
            }}
          >
            {item.label}
          </a>
        ))}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'var(--space-6)' }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'var(--color-accent-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-accent-100)',
            }}
          >
            RS
          </div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-8) 10%' }}>
        {tab === 'dashboard' && <DashboardTab onSeeAllNews={() => setTab('noticias')} />}
        {tab === 'acoes' && <AcoesTab />}
        {tab === 'noticias' && <NoticiasTab />}
        {tab === 'chat' && <ChatTab />}
      </div>
    </div>
  );
}
