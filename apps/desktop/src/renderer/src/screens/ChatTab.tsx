import { chatMessages } from '../data/mockData.js';

export default function ChatTab(): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 140px)',
        maxWidth: 700,
        gap: 'var(--space-4)',
      }}
    >
      <div>
        <h2>Assistente Farol</h2>
        <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>
          Pergunte sobre sua carteira ou conceitos de investimento
        </p>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          paddingRight: 6,
        }}
      >
        {chatMessages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              className={m.from === 'user' ? 'tag-accent' : 'card'}
              style={{
                maxWidth: '70%',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 13.5,
                lineHeight: 1.5,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-divider)',
        }}
      >
        <input
          className="input"
          placeholder="Pergunte algo sobre suas ações..."
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary">Enviar</button>
      </div>
    </div>
  );
}
