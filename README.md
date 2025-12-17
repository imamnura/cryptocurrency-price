# 💰 Cryptocurrency Price Tracker

A modern, real-time cryptocurrency price tracking application built with React, TypeScript, and Vite. Monitor the most popular cryptocurrencies with advanced filtering, sorting, and beautiful UI.

## ✨ Features

- **Real-time Data**: Live cryptocurrency prices from CoinStats API
- **Advanced Sorting**: Click on any column header to sort data (ascending/descending)
- **Column Filters**: Filter data in each column independently
- **Sticky Columns**: Rank, Name, and Symbol columns remain visible when scrolling horizontally 📌
- **Fully Responsive Table**: Optimized horizontal scrolling with visual scroll indicators
- **Price Change Indicators**:
  - 24-hour price change (Prb 24J) with color coding
  - 7-day price change (Prb 7H) with color coding
  - Green for positive changes 📈
  - Red for negative changes 📉
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with gradient backgrounds and smooth animations
- **Search Functionality**: Quick search across all cryptocurrencies
- **Loading States**: Elegant loading indicators while fetching data

## 🚀 Tech Stack

- **React 19.2.3** - Latest version with new features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.3.0** - Lightning-fast build tool
- **Axios 1.13.2** - HTTP client for API calls
- **ESLint 9** - Modern linting with flat config
- **Design System** - Custom theme with CSS variables

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run linter
pnpm run lint
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Primary, secondary, success, danger, warning, and neutral colors
- **Typography**: System font stack with proper sizing and weights
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl)
- **Shadows**: Elevation system for depth
- **Border Radius**: Consistent corner rounding
- **Transitions**: Smooth animations throughout

## 🔒 Security

- ✅ All packages updated to latest versions
- ✅ No known vulnerabilities (verified with `pnpm audit`)
- ✅ TypeScript strict mode enabled
- ✅ ESLint with recommended rules

## 📊 API

Data is fetched from [CoinStats API](https://coinstats.app/) with the following information:

- Rank
- Name & Symbol
- Market Cap
- Current Price (IDR)
- 24-hour Price Change
- 7-day Price Change
- Available Supply
- 24-hour Volume

## 🎯 Key Improvements

### 1. Latest Packages ✅

- React 18 → 19 (major upgrade)
- Vite 5 → 7 (major upgrade)
- All dependencies updated to December 2025 versions
- Zero vulnerabilities

### 2. Enhanced Features ✅

- Sortable columns with visual indicators (↑ ↓ ⇅)
- Individual column filters
- **Sticky columns** (Rank, Name, Symbol) for better horizontal scrolling
- Smart scroll indicators showing more content
- Price change columns (24H & 7D)
- Color-coded percentage changes
- Loading states
- Empty state handling

### 3. Modern Styling ✅

- Professional gradient background
- Card-based table design
- Hover effects and animations
- **Fully responsive table** with sticky columns
- Smooth horizontal scrolling experience
- Visual shadows on sticky columns
- Custom scrollbar styling
- Design system with CSS variables

### 4. Clean Code ✅

- TypeScript strict mode
- No ESLint errors
- Proper type definitions
- Memoized calculations for performance
- Clean component structure

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT

## 👨‍💻 Development

```bash
# Check for outdated packages
pnpm outdated

# Update packages
pnpm update --latest

# Security audit
pnpm audit

# Type check
tsc --noEmit
```

---

Made with ❤️ using React + TypeScript + Vite
