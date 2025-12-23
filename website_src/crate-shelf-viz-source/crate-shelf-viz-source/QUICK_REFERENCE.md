# 🚀 Quick Reference Card

## ⚡ Essential Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Add shadcn/ui component
npx shadcn@latest add [component-name]
```

## 📂 Important Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `app/page.tsx` | Home page | Change landing page content |
| `app/simulation/page.tsx` | 3D simulation page | Modify simulation UI/logic |
| `components/3d/ShelfScene.tsx` | Main 3D scene | Change 3D rendering, lighting, camera |
| `components/3d/Crate.tsx` | Single crate | Modify crate appearance |
| `components/layout/Navbar.tsx` | Top navigation | Add/remove nav links |
| `app/globals.css` | Global styles | Change theme colors |
| `package.json` | Dependencies | Add/remove packages |

## 🎨 Common Customizations

### Change Matrix Pattern
**File:** `app/simulation/page.tsx` (line 26)
```typescript
const defaultMatrix = [
  [1, -1, 1],
  [-1, 1, -1]
];
```

### Change Crate Colors
**File:** `components/3d/ShelfScene.tsx` (line 69)
```typescript
const color = value > 0 ? "#3b82f6" : "#8B5A2B";
```

### Adjust Camera Position
**File:** `components/3d/ShelfScene.tsx` (line 86)
```typescript
<Canvas camera={{ position: [8, 6, 10], fov: 50 }}>
```

### Change Crate Size
**File:** `app/simulation/page.tsx` (line 89)
```tsx
<ShelfScene crateSize={0.8} spacing={1.2} depthOffset={0.6} />
```

## 🔧 3D Controls (In Browser)

| Action | How |
|--------|-----|
| **Rotate** | Left-click + drag |
| **Zoom** | Scroll wheel |
| **Pan** | Right-click + drag |

## 📊 Matrix Format

```typescript
[
  [1, -1, 1, 0],   // Row 0 (top shelf)
  [-1, 1, -1, 1]   // Row 1 (bottom shelf)
]
```

- `1` = Front (blue)
- `-1` = Back (brown)
- `0` = Empty

## 🎯 Project Structure

```
app/
├── page.tsx              → / (home)
├── simulation/page.tsx   → /simulation
├── dashboard/page.tsx    → /dashboard
└── about/page.tsx        → /about

components/
├── 3d/                   → 3D components
├── layout/               → Layout components
└── ui/                   → shadcn/ui components
```

## 🌐 Routes

| URL | Page |
|-----|------|
| `/` | Home |
| `/simulation` | 3D Simulation |
| `/dashboard` | Dashboard |
| `/about` | About |
| `/test` | Test Page |

## 🎨 Tailwind Classes Cheat Sheet

```tsx
// Layout
flex, grid, block, inline

// Spacing
p-4 (padding), m-4 (margin), gap-4

// Sizing
w-full (width: 100%), h-screen (height: 100vh)

// Colors
bg-blue-500, text-white, border-gray-300

// Responsive
sm:, md:, lg:, xl:
// Example: md:grid-cols-2 (2 columns on tablet+)

// Hover/Focus
hover:bg-blue-600, focus:ring-2
```

## 🔍 Debugging

```bash
# Check for TypeScript errors
pnpm build

# View browser console
Press F12 → Console tab

# Check terminal output
Look for errors in terminal where pnpm dev is running
```

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` | UI library |
| `three` | 3D graphics |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | 3D helpers |
| `tailwindcss` | CSS framework |
| `typescript` | Type safety |

## 🎯 Component Props Quick Reference

### ShelfScene
```tsx
<ShelfScene 
  matrix={[[1, -1]]}
  crateSize={0.8}
  spacing={1.2}
  depthOffset={0.6}
/>
```

### Crate
```tsx
<Crate 
  position={[0, 0, 0]}
  size={0.8}
  color="#8B5A2B"
/>
```

### WoodenCrate
```tsx
<WoodenCrate
  position={[0, 0, 0]}
  size={1.0}
  woodThickness={0.05}
  sideSlatCount={3}
  bottomSlatCount={4}
  showPlates={true}
  woodColor="#8B5A2B"
  plateColor="#888888"
/>
```

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Use suggested port (3001, etc.) |
| 3D scene black | Check console, verify WebGL support |
| Changes not showing | Save file, check terminal for errors |
| TypeScript errors | Run `pnpm build` to see all errors |
| Module not found | Run `pnpm install` |

## 📱 Responsive Breakpoints

| Breakpoint | Screen Size | Prefix |
|------------|-------------|--------|
| Mobile | < 640px | (default) |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 768px | `md:` |
| Large | ≥ 1024px | `lg:` |
| XL | ≥ 1280px | `xl:` |

## 🎨 shadcn/ui Components Available

```bash
# Install any of these:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add slider
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add toast
```

## 💡 Quick Tips

1. **Auto-save in VS Code:** File → Auto Save
2. **Format on save:** Install Prettier extension
3. **Multiple cursors:** Alt + Click
4. **Find in files:** Ctrl + Shift + F
5. **Go to file:** Ctrl + P
6. **Command palette:** Ctrl + Shift + P

## 🔗 Useful Links

- **Next.js Docs:** https://nextjs.org/docs
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Three.js:** https://threejs.org/docs

---

**Keep this handy while developing! 📌**
