// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DashboardTab from './DashboardTab.js';

describe('DashboardTab', () => {
  it('defaults the chart range to 1M', () => {
    render(<DashboardTab onSeeAllNews={vi.fn()} />);
    expect(screen.getByRole('radio', { name: '1M' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '6M' })).not.toBeChecked();
  });

  it('switches the checked range segment on click', async () => {
    render(<DashboardTab onSeeAllNews={vi.fn()} />);
    await userEvent.click(screen.getByRole('radio', { name: '1A' }));
    expect(screen.getByRole('radio', { name: '1A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '1M' })).not.toBeChecked();
  });

  it('calls onSeeAllNews when the "ver todas" link is clicked', async () => {
    const onSeeAllNews = vi.fn();
    render(<DashboardTab onSeeAllNews={onSeeAllNews} />);
    await userEvent.click(screen.getByRole('link', { name: 'ver todas' }));
    expect(onSeeAllNews).toHaveBeenCalledOnce();
  });

  it('renders the top holdings from mock data', () => {
    render(<DashboardTab onSeeAllNews={vi.fn()} />);
    expect(screen.getByText('PETR4')).toBeInTheDocument();
    expect(screen.getByText('BBAS3')).toBeInTheDocument();
  });
});
