
import { UserID, UserProfile } from './types';

export const USER_A: UserProfile = {
  id: UserID.USER_A,
  name: 'Alex',
  email: 'alex@secure.nexus',
  avatar: 'https://picsum.photos/seed/alex/200',
  isOnline: true,
  lastActive: new Date().toISOString()
};

export const USER_B: UserProfile = {
  id: UserID.USER_B,
  name: 'Jordan',
  email: 'jordan@secure.nexus',
  avatar: 'https://picsum.photos/seed/jordan/200',
  isOnline: false,
  lastActive: new Date().toISOString()
};

export const SECURE_CREDENTIALS = {
  [UserID.USER_A]: '1234',
  [UserID.USER_B]: '5678'
};

export const VAULT_PASSPHRASE = 'SECURE_VAULT_2024';
