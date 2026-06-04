# Weather Application

A modern, responsive weather tracking web application built on top of **React 19**, **Vite**, and **TypeScript**. 
The project features interactive charts, dynamic theming, asynchronous state management via React Query,
and comprehensive unit test coverage for atomic components using Vitest.

---

## 🔗 Live Demo

You can check out the live application here: [Weather App](https://larindmitry.github.io/weather_app/)

---

## 🚀 Tech Stack

### Frontend
* **Core Library:** React 19 (Functional Components, Hooks)
* **Build Tool:** Vite 8
* **Language:** TypeScript 6
* **Styling:** Styled Components & Material UI (MUI 7)
* **API Fetching & State:** Axios & TanStack React Query v5
* **Charts:** Chart.js

### Testing & Quality Assurance
* **Test Runner:** Vitest
* **Environment:** Testing Library (React & Jest-DOM), JSDOM
* **Code Quality:** ESLint 9 (Flat Config), Prettier, Vite Plugin Checker

### Backend
* **API:** [WeatherApi](https://www.weatherapi.com/) 
* **Swagger:** [Api Swagger](https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2)

---

## 📂 Project Structure

```
src/
├── api/             # Weather API requests and configuration (weather.ts)
├── assets/          # Static assets (icons/, images/)
├── components/      # UI Components
│   ├── BaseComponents/     # Atomic reusable components (Icon, Image, Loader)
│   └── GeneralComponents/  # Composite interface blocks (NoContentPlug, etc.)
├── pages/           # Application views/pages (Main, NotFound)
├── services/        # Service configurations (queryClient.ts for React Query)
├── theme/           # Global styles, typography, color palettes, and themes
├── App.tsx          # Root component wrapping all necessary providers
├── index.tsx        # Application entry point
└── vite-env.d.ts    # Vite environment type declarations
```

## 🛠️ Absolute Imports Configuration

Absolute imports are configured to maintain a clean and maintainable codebase. You can import modules directly using the following aliases (defined in `tsconfig.json` and `vite.config.ts`):

* `src/*`
* `assets/*`
* `components/*`
* `pages/*`
* `api/*`
* `services/*`
* `theme/*`

*Example usage:*
```
import BaseLoader from 'components/BaseComponents/BaseLoader';
import {theme} from 'theme/index';
```

## 💻 Available Scripts

In the project root directory, you can run the following commands:

### Development
Runs the local development server (Vite) with real-time TypeScript type-checking handled by `vite-plugin-checker`:
```
npm run start
```

### Testing
Runs isolated unit tests in interactive watch mode using Vitest:
```
npm run test
```

## 🧪 Testing Approach

The application follows a robust, predictable, and isolated unit testing strategy designed to keep tests
lightning-fast and resilient to global configuration changes:

* **Native DOM API Reliance:** To ensure maximum compatibility and zero reliance on external environmental setup, tests use standard JavaScript DOM methods (`querySelector`, `getAttribute`) instead of extending the global matchers.
* **Component Isolation & Mocking:** External libraries (such as `react-router` and `react-toastify`) and static assets (SVG icons, WebP images) are mocked strictly to ensure components are tested in complete isolation.
* **Theming Context Integration:** Components that rely on `styled-components` theme variables are automatically wrapped in a mock `ThemeProvider` during render tests to prevent style token runtime errors.
* **Behavior Verification:** Tests actively simulate and assert native DOM events, including mouse clicks (`onClick`), and media lifecycles (`onLoad`, `onError`).
* **Visual Regression Guard:** Snapshot testing is integrated across all base components to track and prevent accidental UI layout regressions.