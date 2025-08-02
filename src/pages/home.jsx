import { useState, useEffect } from 'react';
import LassoCursor from '../components/lassoCursor';
import TargetCursor from '../components/targetCursor';
import NegativeCursor from '../components/negativeCursor';
import CrosshairCursor from '../components/crosshairCursor';
import RibbonCursor from '../components/ribbonCursor';
import TestButton from './testButton';

function Home() {
  const [cursorType, setCursorType] = useState('lasso');

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      alert("jangan dibuka di hp bosss. di dekstop aja yaa");
    }
  }, []);

  console.log("cursorType", cursorType);

  const getGitHubUrl = () => {
    const urls = {
      'lasso': 'https://github.com/Maeeveee/Cursor-Component/blob/main/src/components/lassoCursor.jsx',
      'target': 'https://github.com/Maeeveee/Cursor-Component/blob/main/src/components/targetCursor.jsx',
      'negative': 'https://github.com/Maeeveee/Cursor-Component/blob/main/src/components/negativeCursor.jsx',
      'crosshair': 'https://github.com/Maeeveee/Cursor-Component/blob/main/src/components/crosshairCursor.jsx',
      'ribbon': 'https://github.com/Maeeveee/Cursor-Component/blob/main/src/components/ribbonCursor.jsx'
    };
    return urls[cursorType];
  };

  const getInspirationText = () => {
    const inspirations = {
      'lasso': 'Motion : IOS Pointer Animation',
      'target': 'Motion : Magnetic Target',
      'negative': 'Webflow : Abhishek Shankar Website',
      'crosshair': 'React bits : Crosshair',
      'ribbon': 'React bits : Ribbon Cursor'
    };
    return inspirations[cursorType];
  };

  const handleViewGitHub = () => {
    window.open(getGitHubUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`min-h-screen ${cursorType === 'negative' ? 'bg-white' : ''}`}
    >
      <div className="fixed top-2.5 left-2.5 bg-black p-2.5 rounded-lg z-[1000] flex items-center gap-2.5">
        <button
          className={`target-btn px-3 py-2 border-none rounded cursor-pointer transition-colors ${
            cursorType === 'lasso' 
              ? 'bg-white text-black' 
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
          onClick={() => setCursorType('lasso')} 
        >
          Glass Cursor
        </button>
        <button 
          className={`target-btn px-3 py-2 border-none rounded cursor-pointer transition-colors ${
            cursorType === 'target' 
              ? 'bg-white text-black' 
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
          onClick={() => setCursorType('target')} 
        >
          Target Cursor
        </button>
        <button 
          className={`target-btn px-3 py-2 border-none rounded cursor-pointer transition-colors ${
            cursorType === 'negative' 
              ? 'bg-white text-black' 
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
          onClick={() => setCursorType('negative')} 
        >
          Negative Cursor
        </button>
        <button 
          className={`target-btn px-3 py-2 border-none rounded cursor-pointer transition-colors ${
            cursorType === 'crosshair' 
              ? 'bg-white text-black' 
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
          onClick={() => setCursorType('crosshair')} 
        >
          Crosshair Cursor
        </button>
        <button 
          className={`target-btn px-3 py-2 border-none rounded cursor-pointer transition-colors ${
            cursorType === 'ribbon' 
              ? 'bg-white text-black' 
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
          onClick={() => setCursorType('ribbon')} 
        >
          Caterpillar Cursor
        </button>
      </div>

      <div className="target-btn fixed bottom-5 left-5 bg-[#24292f] text-white border border-[#30363d] px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-[1000] flex items-center gap-2 hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span className="text-xs">
          <span className="opacity-70">Inspired by:</span> <span className="font-semibold">{getInspirationText()}</span>
        </span>
      </div>

      <button 
        className="target-btn fixed bottom-5 right-5 px-4 py-3 bg-[#24292f] text-white border border-[#30363d] rounded-lg cursor-pointer text-sm font-medium flex items-center gap-2 hover:bg-[#30363d] hover:border-[#8b949e] transition-all shadow-lg z-[1000]"
        onClick={handleViewGitHub}
        style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif' }}
      >
        <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        View Code
      </button>

      {cursorType === 'lasso' && <LassoCursor />}
      {cursorType === 'target' && <TargetCursor />}
      {cursorType === 'negative' && <NegativeCursor />}
      {cursorType === 'crosshair' && <CrosshairCursor />}
      {cursorType === 'ribbon' && <RibbonCursor />}

      <TestButton cursorType={cursorType} />
    </div>
  );
}

export default Home;