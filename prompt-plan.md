# Health Dashboard Project Blueprint & Iterative Prompts

This document contains a detailed, step-by-step blueprint for building the Health Dashboard project along with iterative prompts for a code-generation LLM. Each prompt builds on the previous ones in a test-driven manner, ensuring incremental progress, early testing, and integration at every stage.

---

## Blueprint Overview

1. **Project Setup & Environment Initialization**
   - Create a new repository.
   - Initialize a Node.js project for the backend (Netlify Functions) and a React project for the frontend.
   - Set up ESLint, Prettier, and testing frameworks (Jest for backend, React Testing Library for frontend).

2. **Backend Foundation**
   - Build the Netlify Functions framework with a basic “hello world” endpoint.
   - Set up a connection to MongoDB Atlas.
   - Create initial schemas for user settings, activity logs, and raw API responses.
   - Write unit tests for backend endpoints and database connectivity.

3. **Authentication Module**
   - Implement Google OAuth for user login.
   - Create endpoints to handle authentication callbacks.
   - Write tests to simulate login and verify secure token handling.

4. **Data Sync & API Integration**
   - Create Netlify Functions endpoints for “Sync Now” functionality.
   - Implement logic for incremental data fetching from Strava, Zwift, and Samsung Health (with caching and error handling, including retries).
   - Write tests for sync endpoints and verify that only new data is fetched.

5. **Frontend Dashboard Setup**
   - Build the dashboard UI using React with hybrid (sidebar + top) navigation.
   - Integrate theme toggling (light/dark mode) and responsive design.
   - Develop basic components and pages that later wire into data endpoints.
   - Write component tests to ensure proper rendering and behavior.

6. **Data Visualization & Filtering**
   - Implement widgets: line and bar charts for activity trends using a charting library.
   - Add filtering options (date range, activity type, keyword search) and data aggregation logic (weekly/monthly totals, average pace).
   - Write tests to validate that charts render correctly and filtering works as expected.

7. **Notifications System**
   - Develop a notification module using Netlify Functions and Resend for email alerts.
   - Create triggers for personal bests, daily/weekly summaries, and sync issues.
   - Write tests for both in-app and email notification logic.

8. **Integration & Final Wiring**
   - Wire frontend components to the backend endpoints.
   - Ensure the complete flow: authentication → data sync → dashboard display → notifications.
   - Perform integration and end-to-end tests (using Playwright) and load/security tests.
   - Finalize logging, error handling, and cleanup routines.

---

## Iterative Prompts for Code Generation

Each prompt below is designed to produce code for a specific stage of the project. They are small enough to allow for strong testing while incrementally building the project.

---

### Prompt 1: Project Setup & Initial Environment

```text
Prompt 1: Set up the project repository and initial development environment.
Description:
- Create a new Git repository.
- Initialize a Node.js project for backend development.
- Create a new React application (using Create React App, Vite, or Next.js) for the frontend.
- Set up ESLint and Prettier configurations for code quality.
- Install initial testing frameworks: Jest for backend and React Testing Library for frontend.
- Write a basic test (e.g., “Hello World” test) to verify that the testing setup is working.
Your code should include package.json scripts for running tests and linting.

Prompt 2: Establish the backend foundation using Netlify Functions.
Description:
- Create the folder structure for Netlify Functions.
- Implement a basic “hello world” API endpoint (e.g., GET /api/hello) that returns a simple JSON message.
- Set up a local development environment that can emulate Netlify Functions.
- Write unit tests (using Jest) for the “hello world” endpoint.
- Ensure that the endpoint is wired correctly with proper error handling.

Prompt 3: Integrate MongoDB and define initial schemas.
Description:
- Set up a connection to MongoDB Atlas from your Netlify Functions backend.
- Create Mongoose (or native MongoDB driver) schemas/models for:
  - User Settings (including unit preferences, theme, notifications)
  - Activity Logs (tracking steps, heart rate, distance, duration, etc.)
  - Raw API Responses (for debugging purposes)
- Write unit tests to verify connection and validate schema constraints.
- Ensure that your database connection is resilient and logs errors appropriately.

Prompt 4: Implement Google OAuth for user authentication.
Description:
- Develop a backend endpoint to initiate the Google OAuth flow.
- Create a callback endpoint to handle the OAuth response and securely exchange the authorization code for tokens.
- Integrate the authentication flow into your user settings storage in MongoDB.
- Write unit and integration tests to simulate the login process and verify token storage.
- Ensure security best practices, such as using HTTPS and storing tokens securely.

Prompt 5: Build the Data Sync API endpoints to fetch external activity data.
Description:
- Create an endpoint (e.g., POST /api/sync) that triggers data synchronization.
- Implement logic to fetch incremental updates from Strava, Zwift, and Samsung Health APIs.
- Include caching mechanisms in MongoDB to avoid redundant API calls.
- Implement error handling with a retry mechanism (exponential backoff) for API failures.
- Write tests to verify that:
  - Only new data is fetched (incremental update).
  - Caching is working correctly.
  - Error handling gracefully falls back to cached data.

Prompt 6: Set up the frontend dashboard and basic UI components.
Description:
- Create a React layout with hybrid navigation (sidebar and top navigation).
- Implement a theme toggle (light/dark mode) that persists in user settings.
- Develop basic components for the dashboard, including placeholders for data widgets.
- Wire up initial API calls to the backend “hello world” endpoint to test connectivity.
- Write component tests using React Testing Library to ensure components render correctly.

Prompt 7: Add data visualization components to the dashboard.
Description:
- Integrate a charting library (e.g., Chart.js or Recharts) into your React project.
- Develop line and bar chart components to display activity trends.
- Use mock data to populate the charts initially.
- Ensure charts are responsive and update based on provided props.
- Write tests to validate that charts render correctly with different data sets.

Prompt 8: Develop data filtering and aggregation functionalities.
Description:
- Implement UI controls for filtering activity data by date range, activity type, and keyword search.
- Develop functions on the backend to aggregate data (e.g., weekly/monthly totals, average pace & speed).
- Wire these filtering options into the frontend, ensuring the UI dynamically updates based on filter selections.
- Write tests for both frontend filter components and backend aggregation logic to verify accuracy.

Prompt 9: Build the notifications system for alerts and summaries.
Description:
- Create backend endpoints (using Netlify Functions) to trigger notifications:
  - Email notifications via Resend for new personal bests, daily/weekly summaries, and sync issues.
  - In-app notifications for immediate user feedback.
- Integrate these endpoints with user settings stored in MongoDB.
- Implement tests that simulate notification triggers and verify that both email and in-app alerts are processed correctly.

Prompt 10: Integrate all modules and finalize wiring of the application.
Description:
- Wire together the frontend and backend:
  - Ensure that user authentication, data sync, and dashboard display work seamlessly.
  - Integrate the notification system with activity data updates.
- Develop end-to-end tests (using Playwright) to simulate user flows:
  - User logs in → dashboard loads with cached data → user triggers “Sync Now” → data updates → notifications are sent.
- Validate that error handling, caching, and logging work as expected.
- Finalize any remaining wiring to ensure no orphaned components or hanging code.

Prompt 11: Conduct performance, security, and final integration tests.
Description:
- Implement API load testing to ensure the backend can handle multiple concurrent sync requests.
- Perform security audits:
  - Validate that API tokens are securely stored (using environment variables).
  - Test for vulnerabilities in authentication and data handling.
- Write and run integration tests to confirm that all components (frontend, backend, database) work together reliably.
- Document any final configuration steps needed for deployment on Netlify and MongoDB Atlas.
