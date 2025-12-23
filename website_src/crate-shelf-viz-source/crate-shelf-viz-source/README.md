# 🎯 Crate Shelf Visualization - Smart India Hackathon

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?style=for-the-badge&logo=three.js)

**Interactive 3D visualization of crate shelf arrangements for warehouse management**

[Demo](#demo) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Tech Stack](#tech-stack)

</div>

---

## 📖 Overview

This application provides an **interactive 3D visualization system** for crate shelf arrangements using a matrix-based approach. Built for the **Smart India Hackathon**, it demonstrates modern web development practices and advanced 3D rendering capabilities.

### 🎯 Problem Statement

Warehouse managers and logistics professionals need an intuitive way to:
- Visualize shelf space utilization
- Plan optimal crate arrangements
- Understand front/back positioning for airflow optimization
- Simulate different configuration patterns

### 💡 Solution

A web-based 3D visualization tool that:
- Converts matrix data into interactive 3D scenes
- Allows real-time manipulation and viewing from any angle
- Provides responsive design for desktop and mobile
- Offers customizable crate configurations

---

## ✨ Features

### 🎨 3D Visualization
- **Interactive Scene**: Rotate, zoom, and pan with mouse controls
- **Real-time Updates**: Changes to matrix instantly reflect in 3D
- **Realistic Rendering**: Advanced lighting and shadows
- **Detailed Crates**: Wooden texture with slats, posts, and metal brackets

### 📊 Matrix-Based Configuration
- **Simple Format**: 2D array defines crate positions
- **Flexible Patterns**: Support for any grid size
- **Front/Back Positioning**: Optimized for airflow management
- **Empty Spaces**: Ability to leave positions vacant

### 🎛️ Advanced Controls
- **Adjustable Parameters**: Rows, columns, spacing, depth
- **Crate Customization**: Size, wood thickness, slat count
- **Color Themes**: Customizable wood and metal colors
- **Visual Toggles**: Show/hide metal plates and other details

### 📱 Responsive Design
- **Desktop Optimized**: Full sidebar and control panels
- **Mobile Friendly**: Adaptive layout for smaller screens
- **Touch Support**: Works with touch gestures on tablets

### 🎯 Multiple Pages
- **Home/Landing**: Project overview and navigation
- **Simulation**: Main 3D visualization tool
- **Dashboard**: Statistics and quick actions
- **About**: Project details and tech stack

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone or navigate to project directory
cd crate-shelf-viz

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Open in Browser

Navigate to **http://localhost:3000**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md)** | Comprehensive guide for beginners - explains every concept |
| **[COMMANDS.md](./COMMANDS.md)** | Step-by-step commands to run the app |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Quick reference card for common tasks |
| **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** | Detailed setup and customization guide |

---

## 🏗️ Project Structure

```
crate-shelf-viz/
│
├── 📂 app/                          # Next.js App Router
│   ├── page.tsx                     # Home page
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   ├── simulation/                  # 3D Simulation page
│   ├── dashboard/                   # Dashboard page
│   └── about/                       # About page
│
├── 📂 components/
│   ├── 3d/                          # 3D visualization components
│   │   ├── ShelfScene.tsx           # Main 3D scene
│   │   ├── Crate.tsx                # Simple crate
│   │   └── GroundPlane.tsx          # Ground/floor
│   ├── layout/                      # Layout components
│   │   ├── MainLayout.tsx           # Main wrapper
│   │   ├── Navbar.tsx               # Navigation bar
│   │   └── Sidebar.tsx              # Sidebar navigation
│   ├── ui/                          # shadcn/ui components
│   ├── WoodenCrate.tsx              # Detailed wooden crate
│   ├── CrateShelfCanvas.tsx         # Advanced 3D canvas
│   ├── ShelfFrame.tsx               # Shelf structure
│   ├── Room.tsx                     # Room environment
│   └── ControlsPanel.tsx            # Control panel
│
├── 📂 lib/                          # Utilities
│   └── utils.ts                     # Helper functions
│
└── 📂 public/                       # Static assets
```

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Fast, efficient package manager

---

## 📊 Matrix Format

The application uses a 2D array to define crate positions:

```typescript
const matrix = [
  [1, -1, 1, -1, 1],    // Top shelf
  [-1, 1, -1, 1, -1],   // Middle shelf
  [1, -1, 1, -1, 1]     // Bottom shelf
];
```

### Values
- `1` = Crate on **front** side (positive Z) - Blue
- `-1` = Crate on **back** side (negative Z) - Brown
- `0` = **Empty** space (no crate)

### Axes
- **Rows** = Y-axis (vertical, bottom to top)
- **Columns** = X-axis (horizontal, left to right)
- **Values** = Z-axis (depth, front to back)

---

## 🎮 Usage

### Basic Usage

1. **Navigate to Simulation** (`/simulation`)
2. **Input your matrix** in JSON format
3. **Click "Update"** to visualize
4. **Interact with 3D scene**:
   - **Rotate**: Left-click + drag
   - **Zoom**: Scroll wheel
   - **Pan**: Right-click + drag

### Example Matrices

**Checkerboard Pattern:**
```json
[[1, -1, 1, -1],
 [-1, 1, -1, 1],
 [1, -1, 1, -1]]
```

**Front-Heavy:**
```json
[[1, 1, 1, 1],
 [1, 1, 0, 0],
 [1, 0, 0, 0]]
```

**Sparse:**
```json
[[1, 0, -1, 0],
 [0, 1, 0, -1],
 [-1, 0, 1, 0]]
```

---

## 🎨 Customization

### Change Colors

**Edit:** `components/3d/ShelfScene.tsx`
```typescript
const color = value > 0 ? "#3b82f6" : "#8B5A2B";
```

### Adjust Sizes

**Edit:** `app/simulation/page.tsx`
```tsx
<ShelfScene 
  crateSize={0.8}
  spacing={1.2}
  depthOffset={0.6}
/>
```

### Add Components

```bash
npx shadcn@latest add [component-name]
```

---

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Component Management
npx shadcn@latest add button    # Add shadcn component
```

### Environment

- **Development**: `http://localhost:3000`
- **Production**: Build with `pnpm build`, then `pnpm start`

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Requires WebGL support

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
# Build
pnpm build

# Output in .next folder
# Deploy .next folder to your hosting
```

---

## 🎯 Roadmap

- [ ] Save/load configurations
- [ ] Export 3D view as image
- [ ] Animation support
- [ ] Multiple shelf configurations
- [ ] Backend API integration
- [ ] User authentication
- [ ] Database storage
- [ ] Collaborative editing

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is created for the Smart India Hackathon.

---

## 👥 Team

Developed for **Smart India Hackathon** by our team.

---

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Three.js** community for 3D graphics
- **shadcn** for beautiful UI components
- **Tailwind CSS** for utility-first styling

---

## 📞 Support

For issues or questions:

- Check [BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md)
- Read [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
- Review [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- Open an issue on GitHub

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

<div align="center">

**Built with ❤️ for Smart India Hackathon 2025**

⭐ Star this repo if you find it helpful!

</div>
