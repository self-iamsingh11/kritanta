# Kritanta - Premium Wall Art & Custom Posters

A beautiful e-commerce frontend for a poster selling website, built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Live Demo

Deploy your own version with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/kritanta)

## ✨ Features

- **Modern UI/UX** - Premium design with smooth animations
- **Hero Carousel** - Auto-advancing showcase with beautiful imagery
- **Mega Menu Navigation** - Organized product categories
- **Product Cards** - Interactive cards with hover effects and badges
- **Custom Poster Builder** - Upload images, select sizes, dynamic pricing
- **Cart Drawer** - Slide-out cart with gamification (Buy 4 Get 3 FREE)
- **Responsive Design** - Optimized for all screen sizes
- **SEO Optimized** - Meta tags, semantic HTML, fast loading

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/kritanta.git
cd kritanta
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── custom-poster/     # Custom poster builder
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Header, Footer
│   ├── ui/                # Reusable UI components
│   └── home/              # Homepage sections
├── context/               # React Context providers
│   ├── CartContext.tsx    # Shopping cart state
│   └── ToastContext.tsx   # Toast notifications
└── lib/
    ├── data.ts            # Mock product data
    └── utils.ts           # Utility functions
```

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will detect Next.js and configure the build settings automatically
4. Click "Deploy"

### Build for Production

```bash
npm run build
npm run start
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```ts
colors: {
  'brand-red': '#C93744',
  'brand-charcoal': '#1E1E1E',
  'brand-mustard': '#D4A853',
  // ...
}
```

### Fonts

The project uses Bebas Neue for display text and system fonts for body text. Customize in `globals.css`.

## 📄 License

MIT License - feel free to use this for your own projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
