
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Message, UserID } from '../types';

interface ChatRoomProps {
  currentUser: UserProfile;
  otherUser: UserProfile;
  messages: Message[];
  onSendMessage: (msg: Message) => void;
  onStartCall: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ currentUser, otherUser, messages, onSendMessage, onStartCall }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      type: 'text',
      content: input,
      timestamp: Date.now(),
      isRead: false
    };
    onSendMessage(newMsg);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <header className="h-16 px-6 glass-panel border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={otherUser.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${otherUser.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{otherUser.name}</h3>
            <p className="text-xs text-gray-400">{otherUser.isOnline ? 'Online now' : 'Last active recently'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStartCall} className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
            <i className="fas fa-video"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center">
            <i className="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-4 rounded-2xl ${
                isMe 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white/5 text-gray-200 rounded-bl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className="text-[10px] mt-1 opacity-50 block text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-2 pr-4 border border-white/10 focus-within:border-blue-600/50 transition-all">
          <button className="w-10 h-10 text-gray-400 hover:text-white transition-all">
            <i className="fas fa-plus"></i>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Secure message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm"
          />
          <button onClick={handleSend} className="w-10 h-10 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
