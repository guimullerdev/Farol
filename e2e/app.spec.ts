import { test, expect, _electron as electron } from '@playwright/test';
import path from 'node:path';

const mainEntry = path.resolve(process.cwd(), 'apps/desktop/out/main/index.js');

test('opens the main window with the Farol title', async () => {
  const app = await electron.launch({ args: [mainEntry] });
  const window = await app.firstWindow();

  await expect(window).toHaveTitle('Farol');
  await expect(window.getByRole('heading', { name: 'Farol' })).toBeVisible();

  await app.close();
});
