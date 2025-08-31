# FraudShield - Real-time Fraud Detection Landing Page

A production-ready React.js front page for a fraud-detection product with a sleek black theme, neon glowing buttons, and animated background.

## 🚀 Features

- **Dark Theme**: Black background with subtle animated gradients and glowing orbs
- **Responsive Design**: Works perfectly on all devices from 360px to ultrawide screens
- **Neon Glow Effects**: Cyan, magenta, and lime neon buttons with hover animations
- **Animated Background**: CSS-based animated orbs and particle effects
- **Authentication Modal**: Login/Register modal with form validation
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance Optimized**: GPU-friendly animations and lazy loading

## 🛠️ Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **PostCSS** for CSS processing

## 📁 Project Structure

```
src/
├── components/
│   ├── Background.jsx      # Animated background with orbs
│   ├── NavBar.jsx          # Fixed navigation with mobile menu
│   ├── Hero.jsx            # Main hero section with CTA
│   ├── AuthModal.jsx       # Login/Register modal
│   └── SectionGetStarted.jsx # Features and stats section
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles and Tailwind imports
```

## 🎨 Design Features

### Visual Elements
- **Background**: Cybersecurity-themed image with animated orbs
- **Typography**: Clean sans-serif with gradient text effects
- **Buttons**: Neon glow effects with smooth hover animations
- **Glass Effects**: Translucent cards with backdrop blur
- **Animations**: Smooth entrance animations and micro-interactions

### Color Scheme
- **Primary**: Cyan (#00FFFF) for neon effects
- **Secondary**: Magenta (#FF00FF) and Lime (#00FF00) for accents
- **Background**: Pure black (#000000) with layered depth
- **Text**: White and gray variations for hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd front_page_cybershield
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎯 Key Components

### Background Component
- Animated orbs with CSS keyframes
- Cybersecurity-themed background image
- Subtle particle effects
- Performance-optimized animations

### NavBar Component
- Fixed positioning with glass effect
- Mobile-responsive hamburger menu
- Neon glow buttons
- Smooth slide-out drawer

### Hero Component
- Full-screen centered layout
- Gradient text effects
- Pulsing "Get Started" button
- Trust indicators section

### AuthModal Component
- Tabbed login/register interface
- Form validation with error handling
- Password visibility toggle
- Focus management and keyboard navigation
- ESC key and backdrop click to close

### SectionGetStarted Component
- Feature grid with icons
- Statistics section
- Call-to-action buttons
- Scroll-triggered animations

## 🎨 Customization

### Changing Brand Name
Replace "FraudShield" in:
- `src/components/NavBar.jsx` (line 25)
- `src/components/Hero.jsx` (title)
- `src/components/SectionGetStarted.jsx` (multiple locations)
- `index.html` (title tag)

### Background Image
Update the URL in `src/components/Background.jsx` (line 12)

### Color Scheme
Modify the neon colors in:
- `tailwind.config.js` (boxShadow section)
- Component files (gradient classes)

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Visible focus rings and logical tab order
- **Screen Reader Support**: ARIA labels and descriptive text
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Modal Accessibility**: Focus trap and escape key handling

## 📱 Responsive Design

- **Mobile First**: Optimized for 360px+ screens
- **Tablet**: Enhanced layout for 768px+ screens
- **Desktop**: Full feature set for 1024px+ screens
- **Ultrawide**: Optimized for 1440px+ screens

## 🔧 Performance Optimizations

- **CSS Animations**: GPU-accelerated transforms
- **Lazy Loading**: Background images with loading="lazy"
- **Minimal Dependencies**: Only essential packages included
- **Optimized Bundles**: Vite for fast development and builds

## 🐛 Troubleshooting

### Common Issues

1. **Tailwind CSS not working**
   - Ensure `tailwind.config.js` has correct content paths
   - Check that `src/index.css` includes Tailwind directives

2. **Animations not smooth**
   - Verify GPU acceleration is enabled in browser
   - Check for conflicting CSS animations

3. **Modal not opening**
   - Ensure all dependencies are installed
   - Check browser console for JavaScript errors

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
