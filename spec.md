**Health Dashboard Specification**

# 1. Overview

This document outlines the requirements, architecture, and implementation details for a personal health dashboard. The application will track activity data from Strava, Zwift, and Samsung Health, providing insights via a responsive web dashboard.

# 2. Core Features

## 2.1 Activity Tracking

- Fetch and store activity data from Strava, Zwift, and Samsung Health.
- Track personal metrics: steps, heart rate, distance, duration, cadence, calories burned.
- Display a map of the last cycling route with a link to Strava for all activities.

## 2.2 Dashboard UI

- **Hybrid navigation**: Sidebar + top navigation.
- **Minimalist, data-focused design**.
- **Theme toggle**: Dark and light mode.
- **Widgets**: Line and bar charts for activity trends.
- **Filtering options**:
  - Date range filtering.
  - Activity type filtering (cycling, running, etc.).
  - Keyword search.
  - General filters.
- **Data aggregation**:
  - Weekly/monthly totals (distance, calories burned).
  - Average pace & speed trends.
- **Personal bests (PBs)** dynamically calculated from stored activity data.

## 2.3 User Settings

- **Stored in MongoDB**:
  - Unit preferences (Imperial/Metric).
  - Theme selection (light/dark mode).
  - Notification preferences (email, in-app alerts).

## 2.4 Notifications

- **In-app and email notifications** using Netlify Functions + Resend.
- Triggers:
  - New personal bests.
  - Daily/weekly activity summaries.
  - Sync issues or API errors.

## 2.5 Sync & Data Handling

- **Manual "Sync Now" button** on the dashboard.
- **Incremental updates**: Only fetch new data since the last sync.
- **Caching in MongoDB**: Avoid redundant API calls.
- **Automatic cleanup**: Old logs and sync data deleted after a retention period.
- **Raw API response storage**: Retain original API data for debugging and future use.

# 3. Architecture

## 3.1 Tech Stack

- **Frontend**: React (hosted on Netlify)
- **Backend**: Netlify Functions (Node.js API layer)
- **Database**: MongoDB (Atlas for cloud sync)
- **Authentication**: Google OAuth initially, with support for Strava, Zwift, and Samsung Health later.

## 3.2 Data Flow

1. User logs in via Google OAuth.
2. The dashboard pulls cached data from MongoDB.
3. If needed, a sync request triggers Netlify Functions.
4. Netlify Functions call Strava/Zwift/Samsung APIs to fetch new data.
5. Data is processed, stored in MongoDB, and served to the frontend.
6. User receives notifications on significant events (PBs, sync issues).

## 3.3 API Handling & Error Strategy

- **Rate Limits**:
  - Cached responses in MongoDB.
  - Fetch only new activities since the last sync.
- **Error Handling**:
  - **Retry mechanism with exponential backoff** for failed API requests.
  - **Graceful UI degradation**: If API fails, show cached data.
  - **Logging in MongoDB** for API failures and sync errors.

# 4. Testing Plan

## 4.1 Unit Testing

- **Frontend**: Jest + React Testing Library.
- **Backend**: Jest + Supertest for API functions.

## 4.2 Integration Testing

- **Playwright tests** for UI interaction and data updates.
- **API tests**: Ensure data sync and caching work correctly.

## 4.3 Performance & Security Testing

- **API load testing** to handle multiple requests.
- **Security audits**: Ensure API tokens are stored in Netlify Environment Variables.

# 5. Future Enhancements

- Additional OAuth providers (Strava, Zwift, Samsung Health).
- Drill-down visualizations for deeper insights.
- Mobile-specific features (push notifications, offline mode).
- Advanced analytics for training load and efficiency.

---



