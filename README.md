# Bassam Assaf - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Inspired by clean, minimalist design principles with smooth animations and excellent user experience.

## ✨ Features

- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS v4
- **Responsive Design**: Fully responsive and mobile-first approach
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Performance**: Optimized for Core Web Vitals and fast loading
- **Accessibility**: Built with accessibility best practices
- **Clean Code**: Well-structured, maintainable TypeScript codebase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bassam/bassamassaf.com.git
cd bassamassaf.com
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

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Manual Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main portfolio page
│   └── not-found.tsx     # Custom 404 page
└── components/           # Reusable components (if needed)
```

## 🎨 Design Philosophy

This portfolio takes inspiration from [Rauno Freiberg's website](https://rauno.me), focusing on:

- **Minimalism**: Clean, uncluttered design that puts content first
- **Typography**: Careful attention to readability and hierarchy
- **Spacing**: Generous whitespace for better visual flow
- **Interactions**: Subtle animations that enhance the experience
- **Performance**: Fast loading and smooth interactions

## 📝 Customization

### Projects

Edit the `projects` array in `src/app/page.tsx` to showcase your work:

```typescript
const projects = [
  {
    name: "Your Project",
    url: "https://yourproject.com",
    description: "Brief description of your project",
    status: "Live", // or 'In Development'
  },
  // Add more projects...
];
```

### Personal Information

Update the hero section and about section in `src/app/page.tsx` with your information.

### Metadata

Update SEO information in `src/app/layout.tsx`:

- Title and description
- Open Graph tags
- Twitter card information
- Keywords and author information

## 🌟 Features in Detail

### Hero Section

- Eye-catching gradient avatar
- Compelling headline and tagline
- Clear call-to-action buttons

### Work Section

- Project showcase with status indicators
- External links to live projects
- Clean card-based layout

### About Section

- Personal story and background
- Skills and experience highlights
- Professional photo placeholder

### Contact Section

- Direct email and social links
- Professional contact form
- Social media integration

## 📱 Responsive Design

The portfolio is fully responsive with carefully crafted breakpoints:

- **Mobile**: Optimized for small screens (320px+)
- **Tablet**: Enhanced layout for medium screens (768px+)
- **Desktop**: Full-featured experience (1024px+)

## ⚡ Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Font Loading**: Optimized font loading strategies

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file for any environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://bassamassaf.com
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bassam/bassamassaf.com/issues).

## 📞 Contact

**Bassam Assaf**

- Website: [bassamassaf.com](https://bassamassaf.com)
- Email: hello@bassam.dev
- GitHub: [@bassam](https://github.com/bassam)
- Twitter: [@bassam](https://twitter.com/bassam)

---

Built with ❤️ using Next.js and deployed on Vercel.
