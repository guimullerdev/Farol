// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AppShell from './AppShell.js';

describe('AppShell', () => {
  it('starts on the dashboard tab', () => {
    render(<AppShell />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('switches to the Ações tab on nav click', async () => {
    render(<AppShell />);
    await userEvent.click(screen.getByRole('link', { name: 'Ações' }));
    expect(screen.getByRole('heading', { name: 'Minhas ações' })).toBeInTheDocument();
  });

  it('switches to the Notícias tab on nav click', async () => {
    render(<AppShell />);
    await userEvent.click(screen.getByRole('link', { name: 'Notícias e Ranking' }));
    expect(screen.getByRole('heading', { name: 'Notícias e Ranking' })).toBeInTheDocument();
  });

  it('switches to the chat tab on nav click', async () => {
    render(<AppShell />);
    await userEvent.click(screen.getByRole('link', { name: 'Assistente IA' }));
    expect(screen.getByRole('heading', { name: 'Assistente Farol' })).toBeInTheDocument();
  });

  it('jumps to Notícias when "ver todas" is clicked from the dashboard', async () => {
    render(<AppShell />);
    await userEvent.click(screen.getByRole('link', { name: 'ver todas' }));
    expect(screen.getByRole('heading', { name: 'Notícias e Ranking' })).toBeInTheDocument();
  });
});
