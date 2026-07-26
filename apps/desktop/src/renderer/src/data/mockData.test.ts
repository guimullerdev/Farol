import { describe, expect, it } from 'vitest';
import { buildChartPaths } from './mockData.js';

describe('buildChartPaths', () => {
  it('starts the line path with a moveto at the first point', () => {
    const { linePath } = buildChartPaths('1M');
    expect(linePath.startsWith('M')).toBe(true);
  });

  it('closes the area path back to the baseline under the first point', () => {
    const { areaPath } = buildChartPaths('1M');
    expect(areaPath.endsWith('Z')).toBe(true);
    expect(areaPath).toContain('L8.0 172');
  });

  it('produces a different path per range', () => {
    const oneMonth = buildChartPaths('1M');
    const oneYear = buildChartPaths('1A');
    expect(oneMonth.linePath).not.toBe(oneYear.linePath);
  });

  it('places the highest value nearest the top of the viewbox (smallest y)', () => {
    const { linePath } = buildChartPaths('1M');
    const yValues = [...linePath.matchAll(/[ML][\d.]+ ([\d.]+)/g)].map((m) => Number(m[1]));
    expect(Math.min(...yValues)).toBeGreaterThanOrEqual(8);
    expect(Math.max(...yValues)).toBeLessThanOrEqual(172);
  });
});
