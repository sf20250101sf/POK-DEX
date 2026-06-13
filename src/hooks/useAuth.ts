import { useState, useEffect, useCallback } from 'react';
import { Trainer } from '../types';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface AuthSession {
  trainerId: string;
  expiresAt: number;
}

interface AuthState {
  users: Trainer[];
  session: AuthSession | null;
}

const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuB48w5EsP4vozUZbvFg_qsMXdbeEJJntgjLDK0kUNK6i9t0ycBZiSkKRxf93_lb7nBhNBxwIRa6vRnm66w961WIZuuekqLmAgtjmb65tbKzNHrVeSqyyXctCemfvD-prkWGy63Ao7m-ha6MPnD1uCfkmHh9Yhvez7gCuA5gT7UwpqIXcoO5-GLZeC6CVoS5G18jrbKyL6xCRmkJPozWV0so8KDEJAUjlVyuOWHbXpj8dd7a0V7jBZfJ6llSl0u_B9ecWaD1wZOKdJw";

function getAuthState(): AuthState {
  try {
    const raw = localStorage.getItem('pokedex_auth_state');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { users: [], session: null };
}

function saveAuthState(state: AuthState) {
  localStorage.setItem('pokedex_auth_state', JSON.stringify(state));
}

function seedDefaultUsers(state: AuthState): AuthState {
  if (state.users.length === 0) {
    state.users.push({
      trainerId: '8829-01',
      accessKey: 'kanto_pass',
      name: 'S. Redfield',
      avatarUrl: DEFAULT_AVATAR,
      isAwaitingVerification: true,
      systemLogs: [],
      uptimeSeconds: 0
    });
    state.users.push({
      trainerId: 'test',
      accessKey: 'test',
      name: 'Test Operator',
      avatarUrl: DEFAULT_AVATAR,
      isAwaitingVerification: true,
      systemLogs: [],
      uptimeSeconds: 0
    });
    saveAuthState(state);
  }
  return state;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => seedDefaultUsers(getAuthState()));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<Trainer | null>(null);

  // Check session on mount
  useEffect(() => {
    const state = getAuthState();
    const validSession = state.session && state.session.expiresAt > Date.now();
    if (validSession) {
      const user = state.users.find(u => u.trainerId === state.session!.trainerId);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        // Session points to deleted user, clear it
        state.session = null;
        saveAuthState(state);
      }
    }
  }, []);

  const validateCredentials = useCallback((trainerId: string, accessKey: string): { success: boolean; error?: string } => {
    const state = getAuthState();
    const user = state.users.find(u => u.trainerId.toLowerCase() === trainerId.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'SECURITY MISMATCH: TRAINER ID NOT FOUND IN REGISTRY.' };
    }
    
    if (user.accessKey !== accessKey) {
      return { success: false, error: 'SECURITY MISMATCH: ACCESS KEY VERIFICATION FAILED.' };
    }

    return { success: true };
  }, []);

  const login = useCallback((trainerId: string, accessKey: string): { success: boolean; error?: string } => {
    const state = getAuthState();
    const user = state.users.find(u => u.trainerId.toLowerCase() === trainerId.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'SECURITY MISMATCH: TRAINER ID NOT FOUND IN REGISTRY.' };
    }
    
    if (user.accessKey !== accessKey) {
      return { success: false, error: 'SECURITY MISMATCH: ACCESS KEY VERIFICATION FAILED.' };
    }

    const session: AuthSession = {
      trainerId: user.trainerId,
      expiresAt: Date.now() + SESSION_DURATION_MS
    };
    
    state.session = session;
    saveAuthState(state);
    setAuthState(state);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    return { success: true };
  }, []);

  const register = useCallback((trainer: Omit<Trainer, 'isAwaitingVerification' | 'systemLogs' | 'uptimeSeconds'>): { success: boolean; error?: string } => {
    const state = getAuthState();
    
    if (state.users.some(u => u.trainerId.toLowerCase() === trainer.trainerId.toLowerCase())) {
      return { success: false, error: 'REGISTRY CONFLICT: TRAINER ID ALREADY ALLOCATED.' };
    }
    
    const newUser: Trainer = {
      ...trainer,
      isAwaitingVerification: true,
      systemLogs: [],
      uptimeSeconds: 0
    };
    
    state.users.push(newUser);
    saveAuthState(state);
    setAuthState(state);
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    const state = getAuthState();
    state.session = null;
    saveAuthState(state);
    setAuthState(state);
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updates: Partial<Trainer>) => {
    if (!currentUser) return;
    const state = getAuthState();
    const idx = state.users.findIndex(u => u.trainerId === currentUser.trainerId);
    if (idx !== -1) {
      state.users[idx] = { ...state.users[idx], ...updates };
      saveAuthState(state);
      setAuthState(state);
      setCurrentUser(state.users[idx]);
    }
  }, [currentUser]);

  return {
    isAuthenticated,
    currentUser,
    validate: validateCredentials,
    login,
    register,
    logout,
    updateUser,
    allUsers: authState.users
  };
}
