# 📋 Step-by-Step Commands to Run

## ✅ Complete Setup Process

Follow these commands **in order**. Copy and paste each one into your terminal.

---

## Step 1: Verify Node.js Installation

```bash
node --version
```

**Expected output:** `v18.x.x` or higher (e.g., `v20.10.0`)

**If not installed:**
- Download from: https://nodejs.org/
- Install LTS version
- Restart terminal

---

## Step 2: Navigate to Project Directory

```bash
cd c:\Users\HP\Desktop\sih\crate-shelf-viz
```

**Verify you're in the right place:**
```bash
dir
```

You should see: `package.json`, `app`, `components`, etc.

---

## Step 3: Install Dependencies

```bash
pnpm install
```

**What this does:**
- Downloads all required packages
- Creates `node_modules` folder
- Sets up the project

**Expected output:**
```
Progress: resolved X, reused Y, downloaded Z, added W
Done in Xs
```

**If pnpm is not installed:**
```bash
npm install -g pnpm
```

Then retry `pnpm install`

**Alternative (using npm):**
```bash
npm install
```

---

## Step 4: Start Development Server

```bash
pnpm dev
```

**What this does:**
- Starts Next.js development server
- Enables hot-reload (instant updates)
- Usually runs on port 3000

**Expected output:**
```
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

**Keep this terminal window open!** The server needs to keep running.

---

## Step 5: Open in Browser

**Option 1: Click the link**
- Ctrl + Click on `http://localhost:3000` in the terminal

**Option 2: Manual**
- Open your browser
- Navigate to: `http://localhost:3000`

---

## 🎯 You Should See

1. **Home Page** with:
   - "Crate Shelf Visualization" title
   - Three cards: 3D Simulation, Dashboard, About
   - Navigation bar at top
   - Sidebar on left (desktop)

2. **Click "View Simulation"** to see:
   - 3D visualization of crates
   - Matrix input panel
   - Interactive 3D scene (rotate with mouse)

---

## 🔄 Making Changes

1. **Edit any file** (e.g., `app/page.tsx`)
2. **Save** (Ctrl + S)
3. **Browser auto-refreshes** with changes

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where `pnpm dev` is running

---

## 🔁 Restarting the Server

```bash
pnpm dev
```

---

## 📦 Additional Commands

### Build for Production
```bash
pnpm build
```

**What this does:**
- Creates optimized production build
- Checks for errors
- Outputs to `.next` folder

### Start Production Server
```bash
pnpm start
```

**Note:** Must run `pnpm build` first

### Run Linter
```bash
pnpm lint
```

**What this does:**
- Checks code for issues
- Suggests improvements

### Add shadcn/ui Component
```bash
npx shadcn@latest add button
```

Replace `button` with any component name:
- `card`, `input`, `dialog`, `tabs`, `dropdown-menu`, etc.

---

## 🐛 Troubleshooting

### Issue: "pnpm: command not found"

**Solution:**
```bash
npm install -g pnpm
```

### Issue: "Port 3000 is already in use"

**Solution 1:** Next.js will auto-use next available port (3001, 3002, etc.)

**Solution 2:** Kill the process using port 3000
```bash
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
pnpm install
```

### Issue: Changes not appearing

**Solution:**
1. Save the file (Ctrl + S)
2. Check terminal for errors
3. Hard refresh browser (Ctrl + Shift + R)
4. Restart dev server (Ctrl + C, then `pnpm dev`)

### Issue: TypeScript errors

**Solution:**
```bash
pnpm build
```

This shows all TypeScript errors at once.

---

## 📱 Testing on Mobile Device

1. **Find your computer's IP address:**
```bash
ipconfig
```

Look for `IPv4 Address` (e.g., `192.168.1.100`)

2. **On your phone/tablet:**
- Connect to same WiFi network
- Open browser
- Navigate to: `http://192.168.1.100:3000`

---

## 🎨 Development Workflow

```bash
# 1. Start development server
pnpm dev

# 2. Make changes to files
# (Edit in VS Code or your editor)

# 3. Save files (Ctrl + S)
# (Browser auto-refreshes)

# 4. When done, stop server
# (Ctrl + C)

# 5. Before deploying, build and test
pnpm build
pnpm start
```

---

## 📊 Checking if Everything Works

### Test Checklist

- [ ] Home page loads at `http://localhost:3000`
- [ ] Navigation bar visible at top
- [ ] Sidebar visible on left (desktop)
- [ ] Three cards visible: Simulation, Dashboard, About
- [ ] Click "View Simulation" → 3D scene loads
- [ ] Can rotate 3D scene with mouse
- [ ] Can input matrix and click "Update"
- [ ] Dashboard page loads
- [ ] About page loads

---

## 🚀 Ready for Hackathon Demo

### Pre-Demo Checklist

```bash
# 1. Build production version
pnpm build

# 2. Test production build
pnpm start

# 3. Test on different browsers
# - Chrome
# - Firefox
# - Edge

# 4. Test on mobile (optional)
# Use IP address method above

# 5. Prepare demo matrices
# Have 3-4 interesting patterns ready
```

### Demo Day Commands

```bash
# Start the app
pnpm dev

# Or for production:
pnpm build
pnpm start
```

**Pro Tip:** Have screenshots/video backup in case of WiFi issues!

---

## 📝 Summary

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `pnpm install` | Install dependencies | First time, or after pulling changes |
| `pnpm dev` | Start dev server | During development |
| `pnpm build` | Build for production | Before deploying, or to check errors |
| `pnpm start` | Start production server | After building, for production |
| `pnpm lint` | Check code quality | Before committing code |

---

## 🎯 Next Steps After Setup

1. ✅ Verify app runs successfully
2. 📖 Read `BEGINNER_GUIDE.md` for detailed explanations
3. 🎨 Customize colors, sizes, and content
4. 🧪 Experiment with different matrix patterns
5. 🚀 Prepare for demo

---

**You're all set! Happy coding! 🎉**

If you encounter any issues, check the troubleshooting section or the `BEGINNER_GUIDE.md` file.
