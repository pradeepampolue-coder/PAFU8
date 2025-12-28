
import React, { useState } from 'react';
import { UserID } from '../types';

interface AuthProps {
  onLogin: (id: UserID, pin: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<UserID>(UserID.USER_A);
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleClear = () => setPin('');

  const handleSubmit = () => {
    if (pin.length === 4) {
      onLogin(selectedUser, pin);
      setPin('');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#050505] text-white">
      <div className="mb-8 text-center">
        <div className="inline-block p-4 rounded-3xl bg-blue-600/10 mb-4 border border-blue-600/20">
          <i className="fas fa-shield-halved text-4xl text-blue-500"></i>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">DuoSecure Nexus</h1>
        <p className="text-gray-500 mt-2">Authenticated Encrypted Environment</p>
      </div>

      <div className="glass-panel p-8 rounded-[40px] w-full max-w-sm flex flex-col items-center">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedUser(UserID.USER_A)}
            className={`px-6 py-3 rounded-2xl transition-all font-medium ${selectedUser === UserID.USER_A ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-white/5 text-gray-400'}`}
          >
            User A
          </button>
          <button
            onClick={() => setSelectedUser(UserID.USER_B)}
            className={`px-6 py-3 rounded-2xl transition-all font-medium ${selectedUser === UserID.USER_B ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-white/5 text-gray-400'}`}
          >
            User B
          </button>
        </div>

        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all ${pin.length > i ? 'bg-blue-500 border-blue-500' : 'border-gray-700'}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8 w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl font-semibold transition-all active:scale-90"
            >
              {num}
            </button>
          ))}
          <button onClick={handleClear} className="w-16 h-16 rounded-full flex items-center justify-center text-red-500 text-sm font-bold">CLEAR</button>
          <button onClick={() => handleKeyPress('0')} className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl font-semibold">0</button>
          <button onClick={handleSubmit} className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white"><i className="fas fa-check"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
