
export enum UserID {
  USER_A = 'USER_A',
  USER_B = 'USER_B'
}

export interface UserProfile {
  id: UserID;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastActive: string;
}

export type MessageType = 'text' | 'image' | 'video' | 'file' | 'location';

export interface Message {
  id: string;
  senderId: UserID;
  type: MessageType;
  content: string;
  timestamp: number;
  isRead: boolean;
  metadata?: any;
}

export interface VaultItem {
  id: string;
  type: 'image' | 'video' | 'note';
  title: string;
  data: string; // Base64 or URL
  addedAt: number;
}

export type AppView = 'chat' | 'vault' | 'video' | 'media' | 'games' | 'location' | 'settings';

export interface AppState {
  currentUser: UserProfile | null;
  otherUser: UserProfile;
  messages: Message[];
  vaultItems: VaultItem[];
  isLocked: boolean;
  isCallActive: boolean;
  currentView: AppView;
  isLocationSharing: boolean;
  syncMedia: {
    url: string | null;
    isPlaying: boolean;
    currentTime: number;
    type: 'video' | 'audio' | null;
  };
}
