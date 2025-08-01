import { useEffect } from "react";

const TestButton = () => {
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

  return (
    <div className="flex flex-row items-center justify-center min-h-screen gap-2">
      <div className="flex flex-col items-center justify-end gap-2">
        <div
          className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
          onMouseDown={handleMouseDown}
        ></div>
        <div
          className="target-btn w-32 h-66 border-2 border-dashed border-gray-500 flex items-center justify-center"
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <div
            className="target-btn w-65 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className="target-btn w-33 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="target-btn w-100 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className="target-btn w-32 h-100 border-2 border-dashed border-gray-500 flex items-center justify-center"
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default TestButton;