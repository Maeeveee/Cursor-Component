const TestButton = () => {
  return (
    <div className="flex flex-wrap gap-6 p-8">
      <button className="target-btn w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs shadow-md hover:bg-blue-600 transition-all">A</button>
      <button className="target-btn w-56 h-16 rounded-xl bg-rose-500 text-white text-lg font-semibold shadow-md hover:bg-rose-600 transition-all">Button Besar</button>
      <a href="#" className="target-btn inline-block px-12 py-2.5 rounded-full bg-emerald-400 text-white text-base font-semibold shadow-md hover:bg-emerald-500 transition-all">Link Oval</a>
      <a href="#" className="target-btn inline-block w-10 h-10 leading-10 text-center rounded-md bg-yellow-400 text-neutral-900 text-xs font-bold shadow-md hover:bg-yellow-500 transition-all">A</a>
      <button className="target-btn w-24 h-7 rounded-full bg-purple-500 text-white text-xs font-medium shadow-md hover:bg-purple-600 transition-all">Pill</button>
      <button className="target-btn w-36 h-6 rounded bg-slate-700 text-white text-xs font-medium shadow-md hover:bg-slate-800 transition-all">Thin</button>
      <a href="#" className="target-btn inline-block w-16 h-16 rounded-full bg-orange-500 text-white text-center leading-[64px] text-xl font-semibold shadow-md hover:bg-orange-600 transition-all">O</a>
      <button className="target-btn w-20 h-20 rounded-lg bg-teal-500 text-white text-2xl shadow-md hover:bg-teal-600 transition-all">□</button>
      <a href="#" className="target-btn inline-block w-60 h-14 rounded-2xl bg-blue-600 text-white text-center leading-[56px] text-lg font-semibold shadow-md hover:bg-blue-700 transition-all">Link Besar</a>
      <button className="target-btn w-80 h-24 rounded-full bg-pink-500 text-white text-3xl font-bold shadow-lg hover:bg-pink-600 transition-all">Super Oval</button>
      <a href="#" className="target-btn inline-block w-96 h-20 rounded-3xl bg-green-600 text-white text-2xl font-bold text-center leading-[80px] shadow-lg hover:bg-green-700 transition-all">Link Jumbo</a>
      <button className="target-btn w-32 h-32 bg-indigo-500 text-white text-xl font-bold flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-all" style={{ clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)' }}>Hexagon</button>
      <button className="target-btn w-32 h-32 bg-yellow-600 text-white text-xl font-bold flex items-center justify-center shadow-lg hover:bg-yellow-700 transition-all" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>▲</button>
      <input className="target-btn w-96 h-16 rounded-2xl border-4 border-blue-400 text-2xl px-6 shadow-lg focus:outline-none" placeholder="Input Besar" />
      <textarea className="target-btn w-[500px] h-32 rounded-3xl border-4 border-purple-400 text-xl px-6 py-4 shadow-lg focus:outline-none resize-none" placeholder="Textarea Jumbo" />
      <div className="target-btn w-72 h-20 bg-cyan-500 text-white text-xl font-bold flex items-center justify-center shadow-lg" style={{ transform: 'skew(-20deg)' }}>Parallelogram</div>
      <div className="target-btn w-32 h-32 bg-red-400 text-white text-2xl font-bold flex items-center justify-center rounded-full shadow-lg">Circle Div</div>
    </div>
  );
};

export default TestButton;