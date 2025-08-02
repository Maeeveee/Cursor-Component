import { useEffect, useState, useRef, useCallback } from "react";

const TestButton = ({ cursorType }) => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const secretText = "yo wassup";
  const textRef = useRef(null);
  const throttleRef = useRef(null);

  const getBorderColor = () => {
    if (cursorType === 'negative') return 'border-black';
    return 'border-white';
  };
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      const buttons = document.querySelectorAll(".target-btn");
      buttons.forEach((button) => {
        button.style.transform = "scale(1)";
      });
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.currentTarget.style.transition = "transform 0.2s ease";
    e.currentTarget.style.transform = "scale(0.95)";
  };

  const handleSecretBoxMouseMove = useCallback((e) => {
    if (cursorType !== 'negative' || !textRef.current) return;
    
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
    }
    
    throttleRef.current = setTimeout(() => {
      const textRect = textRef.current?.getBoundingClientRect();
      if (!textRect) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const isOverText = mouseX >= textRect.left && 
                        mouseX <= textRect.right && 
                        mouseY >= textRect.top && 
                        mouseY <= textRect.bottom;
      
      if (isOverText) {
        const relativeX = (mouseX - textRect.left) / textRect.width;
        setMousePosition({ x: relativeX, y: (mouseY - textRect.top) / textRect.height });
      } else {
        setMousePosition({ x: -1, y: -1 });
      }
    }, 10);
  }, [cursorType]);

  const handleSecretBoxMouseLeave = useCallback(() => {
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
    }
    setHoveredElement(null);
    setMousePosition({ x: -1, y: -1 });
  }, []);

  const getDisplayText = () => {
    if (mousePosition.x < 0) {
      return secretText.split('').map((char, index) => (
        <span key={index} className="text-transparent">
          {char}
        </span>
      ));
    }

    const centerCharIndex = mousePosition.x * (secretText.length - 1);
    
    return secretText.split('').map((char, index) => {
      const distance = Math.abs(index - centerCharIndex);
      
      let isVisible = false;
      if (distance < 1.8) {
        isVisible = true;
      }
      
      return (
        <span
          key={index}
          className={`transition-all duration-150 ease-out ${
            isVisible ? 'text-black' : 'text-transparent'
          }`}
          style={{
            textShadow: isVisible ? '0 0 4px rgba(0,0,0,0.2)' : 'none',
            transform: isVisible ? 'scale(1.05)' : 'scale(1)',
            letterSpacing: isVisible ? '0.5px' : '0px'
          }}
        >
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-center min-h-screen gap-2">
      <div className="flex flex-col items-center justify-end gap-2">
        <div
          className={`target-btn w-32 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
          onMouseDown={handleMouseDown}
        ></div>
        <div
          className={`target-btn w-32 h-66 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <div
            className={`target-btn w-65 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className={`target-btn w-33 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`target-btn w-32 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className={`target-btn w-32 h-32 rounded-full border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className={`target-btn w-32 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className={`target-btn w-100 h-32 border-2 border-dashed ${getBorderColor()} flex items-center justify-center relative overflow-hidden`}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setHoveredElement('secret-box')}
            onMouseLeave={handleSecretBoxMouseLeave}
            onMouseMove={handleSecretBoxMouseMove}
          >
            <span 
              ref={textRef}
              className="text-lg font-bold select-none relative inline-block"
            >
              {cursorType === 'negative' && hoveredElement === 'secret-box' ? (
                getDisplayText()
              ) : (
                <span className="text-transparent pointer-events-none">
                  {secretText}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`target-btn w-32 h-100 border-2 border-dashed ${getBorderColor()} flex items-center justify-center`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default TestButton;