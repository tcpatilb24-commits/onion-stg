# Setup Instructions - Crate Shelf Visualization

## Step-by-Step Setup Guide

Follow these instructions to get your Next.js app running with 3D crate shelf visualization.

### Prerequisites

Make sure you have Node.js installed (version 18 or higher). You can check by running:
```bash
node --version
```

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

or if you're using pnpm (which seems to be set up):

```bash
pnpm install
```

This will install all the required packages including:
- Next.js (React framework)
- React Three Fiber (3D rendering)
- Three.js (3D graphics library)
- Tailwind CSS (styling)
- shadcn/ui components
- TypeScript

### Step 2: Start the Development Server

Run the development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the home page with navigation to different sections.

## Project Structure Explained

```
crate-shelf-viz/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/Landing page
│   ├── dashboard/         # Dashboard page
│   ├── simulation/        # 3D Simulation page (main feature)
│   ├── about/             # About/Project details page
│   ├── layout.tsx         # Root layout (wraps all pages)
│   └── globals.css        # Global styles
│
├── components/
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx     # Top navigation bar
│   │   ├── Sidebar.tsx    # Left sidebar (desktop)
│   │   └── MainLayout.tsx # Main layout wrapper
│   │
│   ├── 3d/                # 3D visualization components
│   │   ├── Crate.tsx      # Single crate (cube) component
│   │   ├── GroundPlane.tsx # Ground/floor component
│   │   └── ShelfScene.tsx # Main 3D scene with canvas
│   │
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
└── lib/
    └── utils.ts           # Utility functions
```

## How to Use the 3D Simulation

1. **Navigate to Simulation Page**: Click "Simulation" in the navbar or sidebar

2. **Input Matrix**: In the control panel on the right, enter a matrix in JSON format:
   ```json
   [[1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1]]
   ```

3. **Matrix Values**:
   - `1` = Crate on front side (positive Z) - shown in blue
   - `-1` = Crate on back side (negative Z) - shown in brown
   - `0` = No crate at this position

4. **Interact with 3D Scene**:
   - **Rotate**: Click and drag with left mouse button
   - **Zoom**: Scroll mouse wheel
   - **Pan**: Right-click and drag

5. **Update Visualization**: Click "Update" button to apply your matrix changes

## Understanding the Matrix

The matrix is a 2D array where:
- **Rows** = Shelf levels (Y-axis, from bottom to top)
- **Columns** = Positions along X-axis (left to right)
- **Values** = Front/back position along Z-axis

Example:
```javascript
[
  [1, -1, 1],   // Top shelf: front, back, front
  [-1, 1, -1]   // Bottom shelf: back, front, back
]
```

## Available Pages

1. **Home** (`/`) - Landing page with overview
2. **Dashboard** (`/dashboard`) - Overview and statistics
3. **Simulation** (`/simulation`) - Main 3D visualization tool
4. **About** (`/about`) - Project information

## Customization

### Change Crate Colors

Edit `components/3d/ShelfScene.tsx`:
```typescript
const color = value > 0 ? "#3b82f6" : "#8B5A2B"; // Change these hex colors
```

### Adjust Crate Size and Spacing

In `app/simulation/page.tsx`, modify the ShelfScene props:
```typescript
<ShelfScene 
  matrix={matrix} 
  crateSize={0.8}      // Change crate size
  spacing={1.2}        // Change spacing between crates
  depthOffset={0.6}    // Change front/back offset
/>
```

### Modify Layout

- Navbar: `components/layout/Navbar.tsx`
- Sidebar: `components/layout/Sidebar.tsx`
- Main Layout: `components/layout/MainLayout.tsx`

## Building for Production

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.)

### 3D Scene Not Loading
- Make sure all dependencies are installed
- Check browser console for errors
- Ensure your browser supports WebGL

### TypeScript Errors
Run:
```bash
npm run build
```
to check for type errors

## Next Steps

- Add more interactive controls (rotation speed, lighting)
- Implement save/load configurations
- Add animations
- Integrate with backend API
- Add user authentication

## Support

For issues or questions, check:
- Next.js docs: https://nextjs.org/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- shadcn/ui: https://ui.shadcn.com

