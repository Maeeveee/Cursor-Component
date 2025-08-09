import React from 'react';


const isMobile = () => window.matchMedia('(pointer: coarse)').matches;

const CustomMobileAlert = ({ message }) => {
  if (!isMobile()) return null;
  // Disable scroll on mount, restore on unmount
  React.useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlHeight = document.documentElement.style.height;
    const originalBodyTouch = document.body.style.touchAction;
    const originalHtmlTouch = document.documentElement.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    document.body.style.touchAction = 'none';
    document.documentElement.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.height = originalBodyHeight;
      document.documentElement.style.height = originalHtmlHeight;
      document.body.style.touchAction = originalBodyTouch;
      document.documentElement.style.touchAction = originalHtmlTouch;
    };
  }, []);

  return (
    <>
      <style>{`
        html, body {
          overscroll-behavior: contain !important;
          overflow: hidden !important;
          height: 100vh !important;
          touch-action: none !important;
        }
      `}</style>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.35)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}>
      {/* Segel diagonal lines */}
      <div style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:100000}}>
        {/* Top-left alert to top-left window */}
        <div style={{position:'absolute',left:0,top:0,width:'calc(50vw - 160px)',height:2,background:'linear-gradient(90deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        <div style={{position:'absolute',left:0,top:0,width:2,height:'calc(50vh - 80px)',background:'linear-gradient(180deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        {/* Top-right alert to top-right window */}
        <div style={{position:'absolute',right:0,top:0,width:'calc(50vw - 160px)',height:2,background:'linear-gradient(270deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        <div style={{position:'absolute',right:0,top:0,width:2,height:'calc(50vh - 80px)',background:'linear-gradient(180deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        {/* Bottom-left alert to bottom-left window */}
        <div style={{position:'absolute',left:0,bottom:0,width:'calc(50vw - 160px)',height:2,background:'linear-gradient(90deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        <div style={{position:'absolute',left:0,bottom:0,width:2,height:'calc(50vh - 80px)',background:'linear-gradient(0deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        {/* Bottom-right alert to bottom-right window */}
        <div style={{position:'absolute',right:0,bottom:0,width:'calc(50vw - 160px)',height:2,background:'linear-gradient(270deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        <div style={{position:'absolute',right:0,bottom:0,width:2,height:'calc(50vh - 80px)',background:'linear-gradient(0deg,rgba(255,71,87,0.7),transparent)',transform:'rotate(0deg)',}} />
        {/* Diagonal lines */}
        <div style={{position:'absolute',left:0,top:0,width:'100vw',height:'100vh',pointerEvents:'none'}}>
          <svg width="100vw" height="100vh" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none'}}>
            <line x1="0" y1="0" x2="50%" y2="50%" stroke="#ff4757" strokeWidth="3" strokeDasharray="12 8" opacity="0.7" />
            <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#ff4757" strokeWidth="3" strokeDasharray="12 8" opacity="0.7" />
            <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#ff4757" strokeWidth="3" strokeDasharray="12 8" opacity="0.7" />
            <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#ff4757" strokeWidth="3" strokeDasharray="12 8" opacity="0.7" />
          </svg>
        </div>
      </div>
      <div style={{
        background: 'rgba(255, 71, 87, 0.98)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: '32px 20px',
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
        maxWidth: 320,
        width: '90vw',
        margin: '0 auto',
        zIndex: 100001,
      }}>
        {message}
      </div>
    </div>
    </>
  );
};

export default CustomMobileAlert;
