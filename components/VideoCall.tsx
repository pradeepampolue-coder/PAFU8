
import React, { useRef, useEffect, useState } from 'react';
import { UserProfile } from '../types';

interface VideoCallProps {
  currentUser: UserProfile;
  otherUser: UserProfile;
  onClose: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ currentUser, otherUser, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => {
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(e => console.error("Camera error:", e));

    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full h-full max-w-4xl bg-[#0a0a0a] rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
        
        {/* Remote Participant (Simulated with Placeholder) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={otherUser.avatar} className="w-32 h-32 rounded-full border-4 border-blue-600/30 blur-sm absolute opacity-20 scale-[4]" alt="" />
          <div className="text-center z-10">
             <div className="relative inline-block mb-4">
                <img src={otherUser.avatar} className="w-24 h-24 rounded-full border-2 border-white/20" alt="Remote" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
             </div>
             <h2 className="text-xl font-bold">{otherUser.name}</h2>
             <p className="text-blue-500 text-sm flex items-center justify-center gap-2 mt-2">
                <span className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></span>
                Encrypted Connection Stable
             </p>
          </div>
        </div>

        {/* Local Participant */}
        <div className="absolute bottom-6 right-6 w-32 md:w-48 aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-xl z-20">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]"
          />
        </div>

        {/* Controls Overlay */}
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-6 z-30">
          <button className="w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
            <i className="fas fa-microphone"></i>
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
            <i className="fas fa-video"></i>
          </button>
          <button 
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-500 transition-all shadow-xl shadow-red-900/40"
          >
            <i className="fas fa-phone-slash text-xl"></i>
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
            <i className="fas fa-camera"></i>
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
            <i className="fas fa-share-nodes"></i>
          </button>
        </div>

        {/* Status badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">HD 1080P</span>
        </div>
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-red-600/20 backdrop-blur-md rounded-full border border-red-600/30">
          <i className="fas fa-lock text-[10px] text-red-400"></i>
          <span className="text-[10px] text-red-400 font-bold">P2P ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
