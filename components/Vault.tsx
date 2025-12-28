
import React, { useState } from 'react';
import { VaultItem } from '../types';

interface VaultProps {
  items: VaultItem[];
  currentPassphrase: string;
  onAddItem: (item: VaultItem) => void;
  onDeleteItem: (id: string) => void;
}

const Vault: React.FC<VaultProps> = ({ items, currentPassphrase, onAddItem, onDeleteItem }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [passphrase, setPassphrase] = useState('');

  const unlock = () => {
    if (passphrase === currentPassphrase) {
      setIsLocked(false);
      setPassphrase('');
    } else {
      alert('Invalid Passphrase');
    }
  };

  if (isLocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#050505]">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 border border-amber-500/20">
          <i className="fas fa-vault text-3xl text-amber-500"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">Encrypted Vault</h2>
        <p className="text-gray-500 mb-8 max-w-xs">Enter your secondary vault passphrase to access private assets.</p>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center tracking-widest focus:border-amber-500/50 outline-none text-white"
            placeholder="Enter passphrase"
          />
          <button onClick={unlock} className="bg-amber-500 text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-all">
            Unlock Vault
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#050505]">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Secure Vault</h2>
          <p className="text-gray-500 text-sm">Stored on device with E2EE</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 border border-white/5">
            Add Folder
          </button>
          <button 
            onClick={() => setIsLocked(true)}
            className="bg-red-600/10 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600 hover:text-white border border-red-600/20"
          >
            Lock Vault
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
        {items.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <i className="fas fa-folder-open text-4xl text-gray-700 mb-4"></i>
            <p className="text-gray-500">Vault is empty. Add private assets here.</p>
            <input 
                type="file" 
                className="hidden" 
                id="vault-upload" 
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        onAddItem({
                            id: Date.now().toString(),
                            type: 'image',
                            title: file.name,
                            data: URL.createObjectURL(file),
                            addedAt: Date.now()
                        });
                    }
                }}
            />
            <label htmlFor="vault-upload" className="mt-4 inline-block bg-blue-600 px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-500 transition-all">
                Upload File
            </label>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="group relative aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src={item.data} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt={item.title} />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-[10px] truncate font-medium text-white">{item.title}</p>
                <button onClick={() => onDeleteItem(item.id)} className="text-red-500 mt-1 hover:text-red-400 transition-colors"><i className="fas fa-trash text-xs"></i></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vault;
