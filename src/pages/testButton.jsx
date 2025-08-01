const TestButton = () => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen gap-2">
      <div className="flex flex-col items-center justify-end gap-2">
        <div className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
        <div className="target-btn w-32 h-66 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <div className="target-btn w-65 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
          <div className="target-btn w-33 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
          <div className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
          <div className="target-btn w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="target-btn w-100 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="target-btn w-32 h-100 border-2 border-dashed border-gray-500 flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default TestButton;