# Temporal Oracle

A single-page web app that drops users into genuine historical "fog of war," asks them to forecast outcomes, then scores their calibration over time. Think of it as Wordle for epistemics.

## Core Mechanic

1. **Time Travel** — User is placed at a specific past date with real historical context.
2. **Forecast** — They assign a probability to a question whose outcome was genuinely uncertain *at that time*.
3. **Reveal** — Animated outcome reveal with scoring, bias tagging, and expert comparison.
4. **Track** — Brier scores, calibration curves, achievements, and prediction history accumulate over time.

## Project Structure

The project is built as a pure frontend single-page application (SPA).

- **`index.html`**: The main UI for the application, featuring a "retro-futurism meets newsroom" aesthetic.
- **`app.js`**: Core application controller, managing state machine, game modes, and UI updates.
- **`scenarios.js`**: Data layer containing curated historical scenarios spanning 2005–2024.
- **`scoring.js`**: Scoring engine responsible for calculating Brier scores, calibration curves, and comparisons.
- **`wiki.js`**: Wikipedia integration for fetching historical articles and diff time-lapses.
- **`style.css`**: Design system implementation.

## Features

- **Game Modes**: Free Play, Daily Challenge, Calibration Drill, and Extremes Training.
- **Fog of War**: Progressive reveal/hide of UI sections based on a "Fog-of-War intensity" control.
- **Performance Tracking**: Detailed dashboard with calibration curves, Brier score over time, category radar charts, and achievement galleries.
- **Wikipedia Integration**: See what the world knew at the time with historical Wikipedia article snapshots.
- **Bias & Signals**: Learn from past events with key signals you could have caught and cognitive bias callouts.

## Setup

Since this is a client-side application, you can simply open `index.html` in your web browser, or serve it using a local static file server.

```bash
# Example using Python's built-in HTTP server
python -m http.server
```

Then navigate to `http://localhost:8000` in your browser.
