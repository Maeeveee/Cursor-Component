import { useState, useEffect } from 'react';
import LassoCursor from '../components/lassoCursor';
import TargetCursor from '../components/targetCursor';
import TestButton from './testButton';

function Home() {
  const [cursorType, setCursorType] = useState('lasso');

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      alert("jangan dibuka di hp bosss. di dekstop aja yaa");
    }
  }, []);

  return (
    <div>
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
          Glass Cursor
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

      {cursorType === 'lasso' && <LassoCursor />}
      {cursorType === 'target' && <TargetCursor />}

      <TestButton />
    </div>
  );
}

export default Home;