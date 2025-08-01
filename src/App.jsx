import './App.css'
import TestButton from './pages/testButton'
import { BrowserRouter } from "react-router-dom";
import LassoCursor from './components/lassoCursor'
import TargetCursor from './components/targetCursor';
import { useState } from 'react';

function App() {
  const [cursorType, setCursorType] = useState('lasso'); // Default to LassoCursor

  return (
    <BrowserRouter>
      {/* Menu untuk memilih demo kursor */}
      <div style={{ position: 'fixed', top: 10, left: 10, backgroundColor: 'black', padding: '10px', borderRadius: '8px' }}>
        <button
          className='target-btn' 
          onClick={() => setCursorType('lasso')} 
          style={{ 
            marginRight: 10, 
            padding: '8px 12px', 
            backgroundColor: cursorType === 'lasso' ? 'white' : 'gray', 
            color: cursorType === 'lasso' ? 'black' : 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Lasso Cursor
        </button>
        <button 
          className='target-btn'
          onClick={() => setCursorType('target')} 
          style={{ 
            padding: '8px 12px', 
            backgroundColor: cursorType === 'target' ? 'white' : 'gray', 
            color: cursorType === 'target' ? 'black' : 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Target Cursor
        </button>
      </div>

      {/* Render kursor sesuai pilihan */}
      {cursorType === 'lasso' && <LassoCursor />}
      {cursorType === 'target' && <TargetCursor />}

      <TestButton />
    </BrowserRouter>
  );
}
export default App
