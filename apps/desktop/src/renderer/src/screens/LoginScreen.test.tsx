// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LoginScreen from './LoginScreen.js';

describe('LoginScreen', () => {
  it('calls onLogin when "Entrar" is clicked', async () => {
    const onLogin = vi.fn();
    render(<LoginScreen onLogin={onLogin} />);
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(onLogin).toHaveBeenCalledOnce();
  });
});
