
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onPanicLock: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onPanicLock }) => {
  const navItems: { view: AppView; icon: string; label: string }[] = [
    { view: 'chat', icon: 'fa-comments', label: 'Chat' },
    { view: 'vault', icon: 'fa-vault', label: 'Vault' },
    { view: 'media', icon: 'fa-film', label: 'Cinema' },
    { view: 'games', icon: 'fa-gamepad', label: 'Games' },
    { view: 'location', icon: 'fa-location-dot', label: 'GPS' },
    { view: 'settings', icon: 'fa-gear', label: 'Settings' },
  ];

  return (
    <aside className="w-20 md:w-24 bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-6 gap-8 z-50">
      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
        <i className="fas fa-nexus-dot text-white text-xl"></i>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
              currentView === item.view 
                ? 'bg-blue-600/20 text-blue-500' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className={`fas ${item.icon} text-lg`}></i>
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onPanicLock}
        className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
        title="Panic Lock"
      >
        <i className="fas fa-lock text-lg"></i>
      </button>
    </aside>
  );
};

export default Sidebar;
