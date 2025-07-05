-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily error report generation at midnight (12 AM)
SELECT cron.schedule(
  'daily-error-report-midnight',
  '0 0 * * *', -- Every day at midnight
  $$
  SELECT
    net.http_post(
        url:='https://faubmvkpcgjxmzemztye.supabase.co/functions/v1/daily-error-report',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdWJtdmtwY2dqeG16ZW16dHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MDU3MjQsImV4cCI6MjA2NDI4MTcyNH0.WscnDVE8o9J1waP4JDxsr0BRzLvtwWi2RMPotSbgb9c"}'::jsonb,
        body:='{"scheduled": true, "time": "' || now() || '"}'::jsonb
    ) as request_id;
  $$
);

-- Schedule error pattern analysis every 6 hours
SELECT cron.schedule(
  'error-pattern-analysis',
  '0 */6 * * *', -- Every 6 hours
  $$
  SELECT public.analyze_error_patterns();
  $$
);