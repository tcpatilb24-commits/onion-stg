# Quick Start Guide

## 🚀 Getting Started (3 Simple Steps)

### 1. Install Dependencies
```bash
pnpm install
```
or
```bash
npm install
```

### 2. Start Development Server
```bash
pnpm dev
```
or
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

That's it! Your app is running. 🎉

---

## 📁 What Was Created

### Pages
- ✅ **Home** (`/`) - Beautiful landing page
- ✅ **Dashboard** (`/dashboard`) - Overview and stats
- ✅ **Simulation** (`/simulation`) - Main 3D visualization
- ✅ **About** (`/about`) - Project information

### Layout Components
- ✅ **Navbar** - Top navigation (responsive)
- ✅ **Sidebar** - Left navigation (desktop only)
- ✅ **MainLayout** - Wraps all pages

### 3D Components
- ✅ **ShelfScene** - Main 3D canvas with controls
- ✅ **Crate** - Individual crate (cube) component
- ✅ **GroundPlane** - Floor/ground visualization

### Features
- ✅ Matrix-based crate arrangement
- ✅ Interactive 3D controls (rotate, zoom, pan)
- ✅ Responsive design (mobile + desktop)
- ✅ Modern UI with shadcn/ui
- ✅ Comprehensive comments for beginners

---

## 🎮 Using the 3D Simulation

1. Go to **Simulation** page
2. Enter a matrix in the input field:
   ```json
   [[1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1]]
   ```
3. Click **Update** to see the visualization
4. **Interact**:
   - Drag to rotate
   - Scroll to zoom
   - Right-click drag to pan

### Matrix Format
- `1` = Front crate (blue)
- `-1` = Back crate (brown)
- `0` = Empty space

---

## 📚 File Structure

```
app/
  ├── page.tsx          # Home page
  ├── dashboard/page.tsx # Dashboard
  ├── simulation/page.tsx # 3D Simulation
  ├── about/page.tsx    # About page
  └── layout.tsx         # Root layout

components/
  ├── layout/           # Navbar, Sidebar, MainLayout
  ├── 3d/               # 3D components (Crate, ShelfScene, etc.)
  └── ui/               # shadcn/ui components
```

---

## 🎨 Customization Tips

### Change Colors
Edit `components/3d/ShelfScene.tsx` line ~60:
```typescript
const color = value > 0 ? "#3b82f6" : "#8B5A2B";
```

### Adjust Sizes
Edit `app/simulation/page.tsx`:
```typescript
<ShelfScene 
  matrix={matrix}
  crateSize={0.8}    // Make crates bigger/smaller
  spacing={1.2}      // Space between crates
/>
```

---

## 🐛 Troubleshooting

**Port in use?** Next.js will use 3001, 3002, etc.

**3D not loading?** Check browser console. Make sure WebGL is enabled.

**TypeScript errors?** Run `pnpm build` to see all errors.

---

## 📖 Learn More

- See `SETUP_INSTRUCTIONS.md` for detailed documentation
- All code has comments explaining what each part does
- Check component files for inline documentation

---

## ✨ Next Steps

1. Try different matrix configurations
2. Customize colors and sizes
3. Add your own features
4. Deploy to Vercel (just connect your GitHub repo!)

Happy coding! 🚀

