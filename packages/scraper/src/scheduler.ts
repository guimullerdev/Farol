import cron from 'node-cron';

export interface ScrapingJob {
  name: string;
  cronExpression: string;
  run: () => Promise<void>;
}

/**
 * Schedules scraping jobs. Every source used here must be official
 * (B3, CVM, investor relations pages) — see security rules in CLAUDE.md.
 */
export function scheduleScrapingJobs(jobs: ScrapingJob[]): void {
  for (const job of jobs) {
    cron.schedule(job.cronExpression, () => {
      void job.run();
    });
  }
}
