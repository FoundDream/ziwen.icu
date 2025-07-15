# Development Rules for ziwen.icu

## 📋 Project Overview
This is a personal blog website built with Next.js 15, TypeScript, and Tailwind CSS. The project uses Contentlayer for content management and focuses on performance with native CSS animations.

## 🛠 Technology Stack

### Core Technologies
- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Content Management**: Contentlayer 0.3.4
- **Package Manager**: pnpm
- **Runtime**: React 19

### Development Tools
- **Linting**: ESLint 9 with Next.js config
- **Formatting**: Prettier
- **Fonts**: Google Fonts (DM Serif Display, Geist, Raleway)
- **Date Handling**: date-fns 4.1.0

## 📁 Project Structure

```
src/
├── app/                 # App Router pages
│   ├── contact/        # Contact page
│   ├── friends/        # Friends page
│   ├── posts/          # Blog posts
│   │   └── [slug]/     # Dynamic blog post pages
│   ├── projects/       # Projects page
│   ├── globals.css     # Global styles and animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── NavBar2/        # Main navigation
│   ├── Navbar/         # Alternative navigation (unused)
│   └── PageTransition.tsx # Page transition wrapper
└── fonts/              # Font configurations
```

## 🎯 Coding Standards

### 1. TypeScript Rules
- **Strict Mode**: Always enabled (`"strict": true`)
- **Type Safety**: All components must be properly typed
- **Interface Definitions**: Use interfaces for props and complex objects
- **Path Aliases**: Use `@/` for src imports
- **No `any` Types**: Avoid using `any`, use proper typing

### 2. React/Next.js Rules
- **Client Components**: Use `"use client"` only when necessary
- **Server Components**: Default to server components when possible
- **Hydration**: Handle client-side hydration with `mounted` state pattern
- **Image Optimization**: Always use `next/image` for images
- **Metadata**: Define proper metadata for SEO

### 3. Styling Rules
- **Tailwind First**: Use Tailwind CSS for all styling
- **Custom CSS**: Only for animations and complex styling
- **Responsive Design**: Mobile-first approach with responsive classes
- **Animation Performance**: Use native CSS animations over JavaScript libraries
- **Color Scheme**: Consistent color palette (orange-500 for accents, gray tones)

### 4. Animation Guidelines
- **Native CSS**: Use CSS keyframes and animations over motion libraries
- **Performance**: Prefer `transform` and `opacity` for animations
- **Timing**: Use consistent animation durations (0.3s, 0.5s, 0.6s)
- **Delays**: Stagger animations with calculated delays
- **Easing**: Use `ease-out` for natural motion

### 5. Content Management
- **Contentlayer**: Use for all blog content
- **Markdown**: Store posts in `/posts` directory
- **Frontmatter**: Include `title` and `date` fields
- **URL Structure**: Use `/posts/[slug]` pattern

## 🔧 Development Workflow

### Setup Commands
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Code Quality
- **ESLint**: Run before commits
- **Prettier**: Auto-format on save
- **TypeScript**: Check for type errors
- **Build**: Ensure clean builds

## 📝 Component Guidelines

### 1. Page Components
- Use default exports
- Include proper TypeScript typing
- Handle loading states
- Implement proper SEO metadata

### 2. Reusable Components
- Place in `/src/components`
- Use named exports
- Include proper prop interfaces
- Document with JSDoc comments

### 3. Animation Components
- Use CSS classes from `globals.css`
- Implement staggered animations with delays
- Include fallbacks for reduced motion

## 🎨 Design System

### Colors
- **Primary**: Orange-500 (`#f97316`)
- **Text**: Gray-600, Gray-700
- **Background**: `#efefef`
- **Accents**: Gray-500 for secondary text

### Typography
- **Headings**: DM Serif Display
- **Body**: Geist Sans
- **Navigation**: Raleway

### Spacing
- **Consistent**: Use Tailwind spacing scale
- **Responsive**: Adjust for different screen sizes
- **Margins**: Consistent vertical rhythm

## 🚀 Performance Rules

### 1. Images
- Use `next/image` with proper sizing
- Include `alt` attributes
- Use `priority` for above-fold images
- Configure remote patterns in `next.config.ts`

### 2. Animations
- Avoid layout thrashing
- Use CSS transforms over position changes
- Implement `will-change` for complex animations
- Consider `prefers-reduced-motion`

### 3. Loading
- Implement proper loading states
- Use React Suspense where appropriate
- Minimize JavaScript bundle size

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

### Layout
- Mobile-first approach
- Flexible grid systems
- Responsive typography
- Touch-friendly interactions

## 🔒 Security & Best Practices

### 1. External Links
- Use `target="_blank"` with `rel="noopener noreferrer"`
- Validate external URLs
- Implement proper CORS headers

### 2. Content Security
- Sanitize user input
- Use `dangerouslySetInnerHTML` carefully
- Implement proper error boundaries

### 3. SEO
- Include proper meta tags
- Use semantic HTML
- Implement structured data
- Optimize for Core Web Vitals

## 📦 Dependencies Management

### Adding Dependencies
- Use `pnpm add` for production dependencies
- Use `pnpm add -D` for development dependencies
- Keep dependencies minimal and up-to-date
- Prefer native solutions over heavy libraries

### Removing Dependencies
- Clean up unused imports
- Update package.json
- Run `pnpm install` to update lockfile

## 🐛 Error Handling

### Error Boundaries
- Implement for page-level errors
- Provide user-friendly error messages
- Log errors for debugging

### TypeScript Errors
- Fix all TypeScript errors before deployment
- Use proper type assertions
- Avoid `@ts-ignore` comments

## 🚀 Deployment

### Build Process
1. Run `pnpm lint` to check code quality
2. Run `pnpm build` to create production build
3. Test production build locally
4. Deploy to hosting platform

### Environment Variables
- Use `.env.local` for local development
- Never commit sensitive data
- Use proper environment variable naming

## 📚 Documentation

### Code Documentation
- Use JSDoc for complex functions
- Include README updates for new features
- Document API endpoints and data structures

### Component Documentation
- Include prop interfaces
- Document component behavior
- Provide usage examples

## 🔄 Git Workflow

### Commit Messages
- Use conventional commit format
- Include descriptive messages
- Reference issues when applicable

### Branch Strategy
- Use feature branches for new features
- Keep main branch stable
- Review code before merging

---

*Last updated: 2025-01-27*
*Version: 1.0.0* 