// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AcoesTab from './AcoesTab.js';
import { portfolio } from '../data/mockData.js';

describe('AcoesTab', () => {
  it('renders one table row per portfolio position', () => {
    render(<AcoesTab />);
    for (const p of portfolio) {
      expect(screen.getByText(p.ticker)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('row')).toHaveLength(portfolio.length + 1); // + header row
  });

  it('shows the position count in the subheading', () => {
    render(<AcoesTab />);
    expect(
      screen.getByText(`${portfolio.length} posições · R$ 43.863,00 investidos`),
    ).toBeInTheDocument();
  });
});
