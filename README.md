# TestCafe + Mocha API Framework

A dual‑runner API automation framework using **TestCafe** and **Mocha** with:

* Modern **JavaScript (ESM)** project structure
* Unified **API client** for TestCafe & Mocha
* **Allure reporting** for both runners
* **Dockerfile** and **GitHub Actions** CI
* **.env‑driven configuration** (base URL, tokens, retries)

---

## ✨ Features

* **TestCafe** integration with `t.request` for API calls
* **Mocha + Axios** integration for Node‑side API flows
* **Allure reporter** with per‑test combined log attachments
* **Joi schema validation** for response bodies
* **Data‑driven tests (DDT)** in Mocha (create users with different payloads)
* **Negative scenarios** (missing fields, not found)
* **CRUD flows** (create, update, patch, delete)
* **Resources tests** (list & single resource)
* **Retry helper** for flaky calls
* Runs in **Docker** or locally

---

## 📂 Project Structure

```
config/           # env.js wrapper around dotenv
src/api/          # API clients (TestCafe, Node)
src/steps/        # Reusable API steps
src/utils/        # Logger, retry helper
src/paths/        # Centralized endpoints
src/validators/   # Joi schemas

.tests/tc/        # TestCafe fixtures
.tests/mocha/     # Mocha suites (auth, user, resources, negative)
```

---

## 🚀 Getting Started

```bash
# Install deps
npm ci

# Run TestCafe suite
npm run test:tc

# Run Mocha suite
npm run test:mocha

# Run both
npm run test:all
```

### Environment

Create a `.env` file (see `.env.example`):

```env
BASE_URL=https://reqres.in
ACCEPT_LANGUAGE=en-US
API_TOKEN=reqres-free-v1
RETRY_MAX=2
LOG_LEVEL=info
```

---

## 📊 Reports

* **Allure** results stored in `reports/allure`
* View with:

```bash
npm run allure:serve
```

*(requires [Allure CLI](https://allurereport.org/docs/))*

---

## 🐳 Docker

```bash
docker build -t testcafe-mocha-api .
docker run --rm testcafe-mocha-api
```

---

## ⚙️ GitHub Actions

* Runs both **TestCafe** and **Mocha**
* Matrix build for **Node 18 & 20**
* Uploads Allure results as artifacts

---

## 💡 Tips

* Use `Logger` in every test to generate combined logs.
* Call `attachLogIfPossible(logger)` in Mocha to include logs in Allure.
* Adjust `.testcaferc.json` to change browsers, timeouts, reporters.

---

## 📖 Example Tests

* **Auth:** login & register (positive + negative)
* **Users:** list, create, update (PUT/PATCH), delete, delayed response
* **Resources:** list all, fetch single by ID
* **Negative:** 400 & 404 flows

---