
import React, { useState } from 'react';

const MediaRoom: React.FC = () => {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#050505]">
      <header className="mb-8">
        <h2 className="text-2xl font-bold">Cinema & Audio Room</h2>
        <p className="text-gray-500 text-sm">Synchronized playback for User A & B</p>
      </header>

      {!mediaUrl ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] bg-[#0a0a0a]/50">
          <div className="w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center mb-6 border border-purple-600/20">
            <i className="fas fa-clapperboard text-3xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Start a Shared Session</h3>
          <p className="text-gray-500 mb-8 max-w-xs text-center">Upload a movie or track to begin synchronized playback.</p>
          <input type="file" id="media-upload" className="hidden" onChange={handleFile} accept="video/*,audio/*" />
          <label htmlFor="media-upload" className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-bold cursor-pointer hover:bg-purple-500 transition-all">
            Choose Media File
          </label>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="relative aspect-video bg-black rounded-[40px] overflow-hidden border border-white/10 group">
            <video 
              src={mediaUrl} 
              className="w-full h-full" 
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            />
          </div>
          
          <div className="mt-8 glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <i className="fas fa-file-video text-blue-500"></i>
                </div>
                <div>
                  <h4 className="font-bold">Active Sync Session</h4>
                  <p className="text-xs text-gray-500">2 Participants connected</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-green-600/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20">SYNCED</span>
                 <button onClick={() => setMediaUrl(null)} className="text-gray-500 hover:text-red-500 transition-all">
                    <i className="fas fa-power-off"></i>
                 </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
               <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-black bg-blue-600 flex items-center justify-center text-[10px] text-white">A</div>
                  <div className="w-6 h-6 rounded-full border border-black bg-purple-600 flex items-center justify-center text-[10px] text-white">B</div>
               </div>
               <span>Session active for 02:45s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaRoom;
