# 🚀 Fast React Pizza

A modern React + Vite web app for browsing pizza menus, managing a cart, and placing orders.  
Built with Tailwind CSS and Redux Toolkit for state management.

## 📁 Project Structure

```
src/
├─ features/
│  ├─ cart/          (Cart pages & slice)
│  ├─ menu/          (Menu browsing)
│  ├─ order/         (Order creation/search/update)
│  └─ user/          (User creation & slice)
├─ services/         (API helpers)
├─ ui/               (Layout & reusable components)
└─ utils/            (misc helpers)
```

Other config files include Tailwind, PostCSS, Vite, Prettier, and package.json.

## ⚙️ Tech Stack

- **React 18** with JSX
- **Vite** for fast development/build
- **Tailwind CSS** for styling
- **Redux Toolkit** for state
- **React Router** (assumed) for navigation
- **APIs**: geocoding & restaurant services

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ / npm or yarn

### Running Locally

```bash
npm run dev
# open http://localhost:5173 in your browser
```

### Building for Production

```bash
npm run build
npm run preview    # to preview the production build
```

## 🧩 Features

- 🛒 Cart with add/remove/update quantity
- 🍕 Menu browsing via `Menu` & `MenuItem`
- 📝 Order creation, search, update
- 👤 User creation and name display
- 🚚 Geocoding & restaurant API service helpers
- ⚠️ Loading states, error handling in UI components

## 🛠️ Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build production bundle  |
| `npm run preview` | Preview production build |

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -m 'Add foo'`)
4. Push to branch and open a PR
