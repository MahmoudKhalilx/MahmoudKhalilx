# Playwright TypeScript Framework — Page Object Model

A production-ready **Playwright** test automation framework built with **TypeScript** and the **Page Object Model (POM)** design pattern, following industry best practices.

---

## 📁 Project Structure

```
├── playwright.config.ts        # Playwright configuration (browsers, retries, reporters)
├── tsconfig.json               # TypeScript compiler options
├── package.json                # Dependencies and npm scripts
├── .env.example                # Environment variable template
│
├── src/
│   ├── pages/                  # Page Object classes
│   │   ├── BasePage.ts         # Base class with shared helpers
│   │   ├── LoginPage.ts        # Login page interactions
│   │   ├── HomePage.ts         # Inventory / home page interactions
│   │   └── index.ts            # Barrel export
│   │
│   ├── fixtures/
│   │   └── page-fixtures.ts    # Custom Playwright fixtures (DI for page objects)
│   │
│   ├── utils/
│   │   ├── config.ts           # Typed environment configuration
│   │   ├── logger.ts           # Lightweight console logger
│   │   └── test-data.ts        # JSON test-data loader
│   │
│   └── types/
│       └── index.ts            # Shared TypeScript interfaces
│
├── tests/                      # Test spec files
│   ├── login.spec.ts           # Login page tests
│   └── home.spec.ts            # Home / inventory page tests
│
├── test-data/
│   └── users.json              # Test user credentials
│
└── .github/
    └── workflows/
        └── playwright.yml      # GitHub Actions CI pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MahmoudKhalilx/MahmoudKhalilx.git
cd MahmoudKhalilx

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. Create your local environment file
cp .env.example .env
```

---

## 🧪 Running Tests

| Command | Description |
| --- | --- |
| `npm test` | Run **all** tests across all configured browsers |
| `npm run test:chromium` | Run tests on **Chromium** only |
| `npm run test:firefox` | Run tests on **Firefox** only |
| `npm run test:webkit` | Run tests on **WebKit / Safari** only |
| `npm run test:mobile` | Run tests on **Mobile Chrome (Pixel 5)** |
| `npm run test:headed` | Run tests in **headed** (visible browser) mode |
| `npm run test:debug` | Run tests with the **Playwright Inspector** |
| `npm run test:ui` | Open the **Playwright UI** mode |
| `npm run report` | Open the last HTML test report |
| `npm run lint` | TypeScript type-check (no emit) |

---

## 🏗️ Framework Design

### Page Object Model (POM)

Every page in the application is represented by a class that extends `BasePage`:

```
BasePage              ← shared helpers (click, fill, getText, assertions …)
  ├── LoginPage       ← login-specific locators & actions
  └── HomePage        ← inventory-specific locators & actions
```

**Adding a new page object:**

1. Create `src/pages/MyNewPage.ts` extending `BasePage`.
2. Define locators as `private readonly` fields in the constructor.
3. Add action and assertion methods.
4. Export it from `src/pages/index.ts`.
5. Register it as a fixture in `src/fixtures/page-fixtures.ts`.

### Custom Fixtures

Page objects are injected into tests via Playwright's custom fixture mechanism:

```typescript
// src/fixtures/page-fixtures.ts
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  homePage:  async ({ page }, use) => { await use(new HomePage(page)); },
});
```

Tests import `test` and `expect` from the fixtures file:

```typescript
import { test, expect } from "../src/fixtures/page-fixtures";

test("should login", async ({ loginPage, homePage }) => {
  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");
  await homePage.expectHomePageLoaded();
});
```

### Environment Configuration

All settings live in a `.env` file (see `.env.example`):

| Variable | Default | Description |
| --- | --- | --- |
| `BASE_URL` | `https://www.saucedemo.com` | Application under test |
| `ENV` | `staging` | Environment name |
| `HEADLESS` | `true` | Run browsers headlessly |
| `DEFAULT_TIMEOUT` | `30000` | Action / navigation timeout (ms) |
| `EXPECT_TIMEOUT` | `10000` | Assertion timeout (ms) |
| `RETRIES` | `1` | Test retries on failure |
| `WORKERS` | `4` | Parallel worker count |

### Test Data

JSON files in `test-data/` are loaded at runtime with the `loadTestData` helper:

```typescript
import { loadTestData } from "../src/utils/test-data";
import type { UserCredentials } from "../src/types";

const users = loadTestData<UserCredentials[]>("users.json");
```

---

## ⚙️ CI / CD

A **GitHub Actions** workflow (`.github/workflows/playwright.yml`) runs on every push and pull request to `main`:

- Installs dependencies and Chromium browser
- Runs all Chromium tests
- Uploads the HTML report as a build artifact

---

## 🧩 Best Practices Applied

| Practice | Implementation |
| --- | --- |
| **Page Object Model** | Each page is a class with encapsulated locators, actions, and assertions |
| **Custom Fixtures** | Page objects injected via Playwright fixtures — no manual instantiation in tests |
| **Data-driven testing** | Test data stored in JSON files, loaded with a typed helper |
| **Environment config** | `.env` file with typed access via `config.ts` |
| **Type safety** | Full TypeScript strict mode, shared interfaces in `src/types/` |
| **Robust locators** | `data-test` attributes preferred over CSS classes |
| **Auto-wait** | Explicit `waitFor` before interactions in `BasePage` |
| **Reporting** | HTML report + GitHub reporter in CI |
| **Screenshots & video** | Captured automatically on failure / first retry |
| **Tracing** | Playwright traces captured on first retry for debugging |
| **Parallelism** | Tests run in parallel locally, single-worker in CI for stability |
| **Linting** | `npm run lint` runs `tsc --noEmit` for type checking |
| **CI pipeline** | GitHub Actions workflow with artifact upload |

---

## 📝 License

ISC

