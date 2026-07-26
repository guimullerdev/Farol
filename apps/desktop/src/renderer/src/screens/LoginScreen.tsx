interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps): React.JSX.Element {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '12%',
      }}
    >
      <div className="card elev-md" style={{ width: 380, padding: 'var(--space-8)' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-4)' }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--color-accent)',
              boxShadow: '0 0 12px var(--color-accent)',
            }}
          />
          <h3 style={{ margin: 0 }}>Farol</h3>
        </div>
        <p
          className="text-muted"
          style={{ marginTop: -8, marginBottom: 'var(--space-4)', fontSize: 13 }}
        >
          Sua bússola para investir com clareza
        </p>
        <div className="field" style={{ marginBottom: 'var(--space-3)' }}>
          <label>E-mail</label>
          <input className="input" type="email" defaultValue="voce@email.com" readOnly />
        </div>
        <div className="field" style={{ marginBottom: 'var(--space-2)' }}>
          <label>Senha</label>
          <input className="input" type="password" defaultValue="********" readOnly />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-3)' }}
        >
          <a
            href="#"
            className="btn-ghost btn"
            style={{ padding: 0, height: 'auto', fontSize: 12 }}
          >
            Esqueci minha senha
          </a>
        </div>
        <button onClick={onLogin} className="btn btn-primary btn-block">
          Entrar
        </button>
        <p
          className="text-muted"
          style={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 'var(--space-4)',
            marginBottom: 0,
          }}
        >
          Não tem conta? <a href="#">Criar conta</a>
        </p>
      </div>
    </div>
  );
}
