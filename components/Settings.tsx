
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsProps {
  currentUser: UserProfile;
  onLogout: () => void;
  onUpdatePin: (newPin: string) => void;
  onUpdateVaultPassphrase: (newPass: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ currentUser, onLogout, onUpdatePin, onUpdateVaultPassphrase }) => {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [newVaultPass, setNewVaultPass] = useState('');
  const [confirmVaultPass, setConfirmVaultPass] = useState('');

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(Number(newPin))) {
      alert("PIN must be 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      alert("PINs do not match.");
      return;
    }
    onUpdatePin(newPin);
    setNewPin('');
    setConfirmPin('');
  };

  const handleVaultUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVaultPass.length < 4) {
      alert("Passphrase must be at least 4 characters.");
      return;
    }
    if (newVaultPass !== confirmVaultPass) {
      alert("Passphrases do not match.");
      return;
    }
    onUpdateVaultPassphrase(newVaultPass);
    setNewVaultPass('');
    setConfirmVaultPass('');
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#050505] overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-500 text-sm">Manage your private environment</p>
      </header>

      <div className="max-w-2xl space-y-8 pb-10">
        {/* Profile */}
        <section className="glass-panel p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-user-circle text-blue-500"></i>
            Identity Profile
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img src={currentUser.avatar} className="w-24 h-24 rounded-full border-2 border-white/10" alt="Me" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] text-gray-500 uppercase font-bold">Display Name</label>
                   <p className="text-sm font-medium">{currentUser.name}</p>
                 </div>
                 <div>
                   <label className="text-[10px] text-gray-500 uppercase font-bold">Email Address</label>
                   <p className="text-sm font-medium">{currentUser.email}</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security PIN Update Section */}
        <section className="glass-panel p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-500">
            <i className="fas fa-key"></i>
            Update Security PIN
          </h3>
          <form onSubmit={handlePinUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">New 4-Digit PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="****"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Confirm PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="****"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none font-mono"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl transition-all text-sm"
            >
              Update Credentials
            </button>
          </form>
        </section>

        {/* Private Vault Passphrase Update Section */}
        <section className="glass-panel p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-amber-500">
            <i className="fas fa-vault"></i>
            Update Vault Passphrase
          </h3>
          <form onSubmit={handleVaultUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">New Vault Passphrase</label>
                <input 
                  type="password" 
                  value={newVaultPass}
                  onChange={(e) => setNewVaultPass(e.target.value)}
                  placeholder="Enter new passphrase"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Confirm Passphrase</label>
                <input 
                  type="password" 
                  value={confirmVaultPass}
                  onChange={(e) => setConfirmVaultPass(e.target.value)}
                  placeholder="Repeat passphrase"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded-xl transition-all text-sm shadow-lg shadow-amber-900/20"
            >
              Update Vault Access
            </button>
          </form>
        </section>

        {/* Device Management */}
        <section className="glass-panel p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-mobile-screen text-blue-500"></i>
            Device Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    <i className="fas fa-desktop"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Nexus Web (Current)</p>
                    <p className="text-[10px] text-gray-500">Chrome Environment • Encrypted</p>
                  </div>
               </div>
               <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">ACTIVE</span>
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-red-600/10 border border-red-600/20 text-red-500 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-inner"
          >
            <i className="fas fa-arrow-right-from-bracket"></i>
            Terminate Session & Logout
          </button>
          <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-[0.2em]">DuoSecure v3.6.0 • PRODUCTION GRADE</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
