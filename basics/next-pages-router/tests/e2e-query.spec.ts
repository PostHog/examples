// @ignoreFile
import { test, expect } from '@playwright/test';
import packageJson from '../package.json';

test('e2e-query', async () => {
  // Calculate yesterday's date in yyyy-mm-dd format (UTC)
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0]; // yyyy-mm-dd format
  
  // Generate yesterday's username in format: {package.json name}-{yyyy-mm-dd}-test-user
  const packageName = packageJson.name;
  const yesterdayUsername = `${packageName}-${dateStr}-test-user`;
  
  console.log(`Querying for distinct_id: ${yesterdayUsername}`);
  
  // Get PostHog credentials from environment variables
  const posthogApiKey = process.env.PERSONAL_ACCESS_KEY;
  const posthogProjectId = process.env.PROJECT_ID;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com';
  
  if (!posthogApiKey || !posthogProjectId) {
    throw new Error('PERSONAL_ACCESS_KEY and POSTHOG_PROJECT_ID environment variables are required');
  }
  
  // Expected events to validate
  const expectedEvents = ['server_login', '$web_vitals', 'user_logged_in', '$identify'];
  
  // Construct the query
  const query = {
    kind: 'HogQLQuery',
    query: `SELECT * FROM events WHERE distinct_id = '${yesterdayUsername}'`
  };
  
  // Make the API request
  const url = `${posthogHost}/api/projects/${posthogProjectId}/query/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${posthogApiKey}`
    },
    body: JSON.stringify({
      query: query,
      name: 'e2e-query-yesterday-user-events'
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PostHog API request failed: ${response.status} ${response.statusText}\n${errorText}`);
  }
  
  const data = await response.json();
  
  console.log('Query results:', JSON.stringify(data, null, 2));
  
  // Assert that we got results
  expect(data).toHaveProperty('results');
  expect(Array.isArray(data.results)).toBe(true);
  
  // Extract events from results
  // Results are arrays where each row corresponds to a column in the columns array
  // We need to find the index of the 'event' column from the columns array
  const columns = data.columns || [];
  const eventColumnIndex = columns.indexOf('event');
  
  expect(eventColumnIndex).not.toBe(-1);
  expect(eventColumnIndex).toBeGreaterThanOrEqual(0);
  
  const foundEvents = data.results
    .map((row: any[]) => row[eventColumnIndex])
    .filter((event: string) => event !== null && event !== undefined);
  
  console.log(`✅ Found ${data.results.length} event(s) for yesterday's user`);
  console.log(`📋 Found events: ${foundEvents.join(', ')}`);
  
  // Validate that all expected events are present
  expectedEvents.forEach(expectedEvent => {
    expect(foundEvents).toContain(expectedEvent);
  });
  
  console.log(`✅ All expected events found: ${expectedEvents.join(', ')}`);
  
  // Log all events for debugging
  data.results.forEach((result: any, index: number) => {
    const eventName = result[eventColumnIndex];
    console.log(`Event ${index + 1}: ${eventName}`);
  });
});
