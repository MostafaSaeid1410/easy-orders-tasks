# Easy Orders - Product Page Application

A modern, responsive e-commerce product page application built with React, TypeScript, and Vite. This application showcases product details, reviews, and shopping cart functionality with a clean, user-friendly interface.

## 🚀 Features

- **Product Details Page**: Display product information with image gallery, pricing, variants, and specifications
- **Product Reviews**: Comprehensive review system with ratings, filters, and breakdown statistics
- **Shopping Cart**: Full-featured cart with add/remove items, quantity management, and price calculations
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Product Variants**: Support for product variants (size, color, etc.) with proper cart management
- **Related Products**: Display related and popular products
- **API Integration**: Fetches real product data from Easy Orders API

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Data fetching and caching
- **React Router** - Client-side routing
- **Immer** - Immutable state updates

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd easy-orders-task
```

2. Install dependencies:

```bash
npm install
```

## 🏃 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 🏗️ Build

Build the application for production:

```bash
npm run build
```

The production build will be in the `dist` directory.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
src/
├── api/                    # API configuration
│   └── config.ts          # API endpoints and base URL
├── assets/                 # Static assets
│   ├── icons/             # SVG icons
│   ├── images/            # Image assets
│   └── styles/            # Global styles
├── components/             # Reusable components
│   ├── cart/              # Shopping cart components
│   ├── layout/            # Layout components (Header, Footer)
│   └── ui/                # UI components (Button, Badge, etc.)
├── features/               # Feature-based modules
│   ├── productDetails/    # Product details feature
│   │   ├── api/          # Product API calls
│   │   ├── components/   # Product-specific components
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utility functions
│   └── productList/       # Product listing feature
├── pages/                  # Page components
│   └── ProductPage.tsx   # Main product page
├── providers/              # Context providers
│   └── QueryProvider/    # React Query provider
├── stores/                 # State management
│   └── cart/             # Shopping cart store (Zustand)
└── dummyData/              # Mock data for development
```

## 🔧 Configuration

### API Configuration

The API base URL is configured in `src/api/config.ts`:

```typescript
export const API_BASE_URL = "https://api.easy-orders.net/api/v1";
```

### Environment Variables

Create a `.env` file in the root directory if you need to customize the API URL:

```env
VITE_API_BASE_URL=https://api.easy-orders.net/api/v1
```

## 🎨 Styling

The project uses Tailwind CSS for styling. Global styles are defined in `src/assets/styles/global.css`.

## 🧪 State Management

- **Zustand** is used for shopping cart state management
- **React Query** handles server state (product data fetching)
- Cart state persists during the session

## 📱 Features in Detail

### Product Details

- Image gallery with multiple views
- Product information (name, description, price)
- Variant selection (size, color, etc.)
- Stock availability
- Add to cart functionality

### Shopping Cart

- Add/remove items
- Update quantities
- Calculate totals
- Handle product variants
- Cart drawer UI

### Product Reviews

- Review listing with pagination
- Rating breakdown
- Review filtering
- Average rating display

## 👤 Author

Mostafa Saeid
