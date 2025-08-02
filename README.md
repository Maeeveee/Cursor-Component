# WhereIsMyCursor

A React-based web application featuring interactive custom cursors with smooth animations and unique visual effects.

## ✨ Features

- **Multiple Cursor Types**:
  - **Glass Cursor**: Transparent cursor with glass-like effect
  - **Target Cursor**: Crosshair-style cursor with smooth tracking
  - **Negative Cursor**: Inverted color cursor with mix-blend-mode for unique visual effects

- **Interactive Elements**:
  - Responsive cursor behavior on hover
  - Smooth animations and transitions
  - Dynamic cursor size changes
  - Easter egg with spotlight text reveal effect

- **Modern Tech Stack**:
  - React 18+ with Hooks
  - Tailwind CSS for styling
  - Vite for fast development

## 🎯 Demo

The application includes interactive test buttons to showcase cursor behaviors and a hidden easter egg that reveals text only when using the Negative Cursor with a spotlight effect.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Maeeveee/Cursor-Component.git
cd Cursor-Component
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

### Basic Implementation

To use these custom cursors in your own project:

1. **Copy the cursor components** from `src/components/`:
   - `lassoCursor.jsx` (Glass Cursor)
   - `targetCursor.jsx` (Target Cursor)
   - `negativeCursor.jsx` (Negative Cursor)

2. **Simple Usage (Single Cursor)**:
```jsx
import LassoCursor from './components/lassoCursor';

function App() {
  return (
    <div>
      <LassoCursor />
      {/* Your content here */}
      <div className="target-btn">Hover me!</div>
    </div>
  );
}
```

3. **Advanced Usage (Multiple Cursors with Switcher)**:
```jsx
import { useState } from 'react';
import LassoCursor from './components/lassoCursor';
import TargetCursor from './components/targetCursor';
import NegativeCursor from './components/negativeCursor';

function App() {
  const [cursorType, setCursorType] = useState('lasso');

  return (
    <div>
      {/* Cursor selection buttons */}
      <button onClick={() => setCursorType('lasso')}>Glass Cursor</button>
      <button onClick={() => setCursorType('target')}>Target Cursor</button>
      <button onClick={() => setCursorType('negative')}>Negative Cursor</button>

      {/* Render active cursor */}
      {cursorType === 'lasso' && <LassoCursor />}
      {cursorType === 'target' && <TargetCursor />}
      {cursorType === 'negative' && <NegativeCursor />}

      {/* Your content here */}
    </div>
  );
}
```

4. **Add interactive elements** with the `target-btn` class:
```jsx
import { useState } from 'react';
import LassoCursor from './components/lassoCursor';
import TargetCursor from './components/targetCursor';
import NegativeCursor from './components/negativeCursor';

function App() {
  const [cursorType, setCursorType] = useState('lasso');

  return (
    <div>
      {/* Cursor selection buttons */}
      <button onClick={() => setCursorType('lasso')}>Glass Cursor</button>
      <button onClick={() => setCursorType('target')}>Target Cursor</button>
      <button onClick={() => setCursorType('negative')}>Negative Cursor</button>

      {/* Render active cursor */}
      {cursorType === 'lasso' && <LassoCursor />}
      {cursorType === 'target' && <TargetCursor />}
      {cursorType === 'negative' && <NegativeCursor />}

      {/* Your content here */}
    </div>
  );
}
```

3. **Add interactive elements** with the `target-btn` class:
```jsx
<div className="target-btn">Hover me!</div>
```

### Customization

- **Cursor Size**: Modify the `size` values in the cursor components
- **Animation Speed**: Adjust the `lerp` function parameters for different responsiveness
- **Visual Effects**: Customize CSS properties like `mix-blend-mode`, `backdrop-filter`, etc.
- **Hover Targets**: Add the `target-btn` class to any element you want to be interactive

## 🎨 Easter Egg

The application includes a hidden easter egg in the test button area. When using the **Negative Cursor**, hover over the wide rectangular button to reveal hidden text with a spotlight effect!

## 📱 Browser Support

- Chrome/Chromium-based browsers (recommended)
- Firefox
- Safari
- Edge

*Note: Some advanced visual effects work best in Chromium-based browsers.*

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Inspired by modern web design trends

---

**⚠️ Important**: This application is optimized for desktop use. Mobile devices are not recommended due to the nature of cursor interactions.