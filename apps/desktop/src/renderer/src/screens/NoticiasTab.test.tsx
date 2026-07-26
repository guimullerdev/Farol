// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NoticiasTab from './NoticiasTab.js';
import { gainers, losers, news } from '../data/mockData.js';

describe('NoticiasTab', () => {
  it('renders the full gainers and losers lists, not just the dashboard preview', () => {
    render(<NoticiasTab />);
    for (const g of gainers) expect(screen.getByText(g.ticker)).toBeInTheDocument();
    for (const l of losers) expect(screen.getByText(l.ticker)).toBeInTheDocument();
  });

  it('renders every news item', () => {
    render(<NoticiasTab />);
    for (const n of news) expect(screen.getByText(n.title)).toBeInTheDocument();
  });
});
