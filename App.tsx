
import React, { useState, useEffect } from 'react';
import { UserID, AppView, Message, AppState } from './types';
import { USER_A, USER_B, SECURE_CREDENTIALS, VAULT_PASSPHRASE } from './constants';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';
import Vault from './components/Vault';
import VideoCall from './components/VideoCall';
import MediaRoom from './components/MediaRoom';
import GamesRoom from './components/GamesRoom';
import LocationTracker from './components/LocationTracker';
import Settings from './components/Settings';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [credentials, setCredentials] = useState(SECURE_CREDENTIALS);
  const [vaultPassphrase, setVaultPassphrase] = useState(VAULT_PASSPHRASE);
  const [state, setState] = useState<AppState>({
    currentUser: null,
    otherUser: USER_B,
    messages: [],
    vaultItems: [],
    isLocked: true,
    isCallActive: false,
    currentView: 'chat',
    // Fix: 'boolean' was used as a value instead of a type. Replaced with 'false'.
    isLocationSharing: false,
    syncMedia: {
      url: null,
      isPlaying: false,
      currentTime: 0,
      type: null
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem('duo_nexus_state');
    const savedCreds = localStorage.getItem('duo_nexus_creds');
    const savedVaultPass = localStorage.getItem('duo_nexus_vault_pass');
    
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(prev => ({
        ...prev,
        messages: parsed.messages || [],
        vaultItems: parsed.vaultItems || []
      }));
    }
    if (savedCreds) {
      setCredentials(JSON.parse(savedCreds));
    }
    if (savedVaultPass) {
      setVaultPassphrase(savedVaultPass);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('duo_nexus_state', JSON.stringify({
        messages: state.messages,
        vaultItems: state.vaultItems
      }));
    }
  }, [state.messages, state.vaultItems, isAuthenticated]);

  const handleLogin = (id: UserID, pin: string) => {
    if (credentials[id] === pin) {
      const currentUser = id === UserID.USER_A ? USER_A : USER_B;
      const otherUser = id === UserID.USER_A ? USER_B : USER_A;
      setState(prev => ({ ...prev, currentUser, otherUser }));
      setIsAuthenticated(true);
      setIsAppLocked(false);
    } else {
      alert('Unauthorized Access Attempt Logged.');
    }
  };

  const handleUpdatePin = (newPin: string) => {
    if (state.currentUser) {
      const newCreds = { ...credentials, [state.currentUser.id]: newPin };
      setCredentials(newCreds);
      localStorage.setItem('duo_nexus_creds', JSON.stringify(newCreds));
      alert('Security PIN updated successfully.');
    }
  };

  const handleUpdateVaultPassphrase = (newPass: string) => {
    setVaultPassphrase(newPass);
    localStorage.setItem('duo_nexus_vault_pass', newPass);
    alert('Vault Passphrase updated successfully.');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const handleSendMessage = (msg: Message) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  };

  const toggleCall = () => {
    setState(prev => ({ ...prev, isCallActive: !prev.isCallActive }));
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen bg-[#050505] overflow-hidden">
      {isAppLocked && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <i className="fas fa-lock text-blue-500 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4">Nexus Locked</h2>
            <button 
              onClick={() => setIsAppLocked(false)}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold transition-all"
            >
              Unlock Nexus
            </button>
          </div>
        </div>
      )}

      <Sidebar 
        currentView={state.currentView} 
        onViewChange={(view) => setState(prev => ({ ...prev, currentView: view }))}
        onPanicLock={() => setIsAppLocked(true)}
      />

      <main className="flex-1 relative flex flex-col overflow-hidden">
        {state.isCallActive && (
          <VideoCall 
            currentUser={state.currentUser!} 
            otherUser={state.otherUser} 
            onClose={toggleCall} 
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {state.currentView === 'chat' && (
            <ChatRoom 
              currentUser={state.currentUser!} 
              otherUser={state.otherUser}
              messages={state.messages}
              onSendMessage={handleSendMessage}
              onStartCall={toggleCall}
            />
          )}
          {state.currentView === 'vault' && (
            <Vault 
              items={state.vaultItems}
              currentPassphrase={vaultPassphrase}
              onAddItem={(item) => setState(prev => ({ ...prev, vaultItems: [...prev.vaultItems, item] }))}
              onDeleteItem={(id) => setState(prev => ({ ...prev, vaultItems: prev.vaultItems.filter(i => i.id !== id) }))}
            />
          )}
          {state.currentView === 'media' && <MediaRoom />}
          {state.currentView === 'games' && <GamesRoom />}
          {state.currentView === 'location' && <LocationTracker />}
          {state.currentView === 'settings' && (
            <Settings 
              currentUser={state.currentUser!} 
              onLogout={logout} 
              onUpdatePin={handleUpdatePin}
              onUpdateVaultPassphrase={handleUpdateVaultPassphrase}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
