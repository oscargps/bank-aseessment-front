# Bank Store Application

## Description
Modern web application built with React, Vite, TypeScript and Tailwind CSS.

## 🔧 Technologies & Tools
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Jest + React Testing Library
- ESLint + Prettier

## 📋 Requirements
- Node.js 18+
- npm or pnpm

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/oscargps/bank-aseessment-front

# Install dependencies
npm install
# or
pnpm install
```

## ⚙️ Environment Setup
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_URL=https://api.dev/
VITE_API_KEY=sk_122334
```

## 🏃‍♂️ Development

```bash
# Run development server
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

```bash
# Run unit tests
npm run test
# or
pnpm test

# Run tests with coverage
npm run test:cov
# or
pnpm test:cov
```

### Test Results
```

82.91% Statements 199/240
82.27% Branches 65/79
79.06% Functions 68/86
83.11% Lines 192/231


Test Suites: 17 passed, 17 total
Tests: 60 passed, 60 total
Coverage: 82.91%
```

## 🏗️ Build

```bash
# Build for production
npm run build
# or
pnpm build
```

## 🚀 Deployment

```bash
# Preview production build locally
npm run preview
# or
pnpm preview
```

### Deployment Instructions
1. Build the project using `npm run build`
2. The built files will be in the `dist` directory
3. Deploy the contents of `dist` to your hosting service

## 📁 Project Structure
```
└── 📁src
    └── 📁app
        └── App.css
        └── App.tsx
        └── 📁assets
        └── 📁components
        └── 📁Context
        └── 📁hooks
        └── 📁mappers
        └── 📁pages
        └── 📁router
        └── 📁Types
    └── 📁modules
        └── 📁bank-store
            └── 📁bussiness
                └── 📁helpers
                └── 📁usecases
            └── 📁domain
                └── 📁models
            └── 📁infrastructure
                └── 📁controllers
                └── 📁services
        └── 📁core
            └── 📁bussiness
                └── 📁helpers
    └── 📁test
        └── 📁__mocks__
        └── 📁app
            └── 📁components
            └── 📁pages
        └── 📁modules
            └── 📁controllers
            └── 📁helpers
            └── 📁services
            └── 📁usecase
    └── config.ts
    └── index.css
    └── main.tsx
    └── query-client.ts
    └── vite-env.d.ts
```


## 🔍 Code Quality

```bash
# Run linter
npm run lint
# or
pnpm lint

# Run formatter
npm run format
# or
pnpm format
```

## 👥 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
