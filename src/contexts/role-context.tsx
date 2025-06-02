
'use client';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'pharmacy' | 'medical_rep';

interface RoleContextType {
  currentUserRole: UserRole;
  setCurrentUserRole: Dispatch<SetStateAction<UserRole>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('pharmacy'); // Default role

  useEffect(() => {
    // This effect runs only on the client after hydration
    const storedRole = localStorage.getItem('currentUserRole') as UserRole | null;
    if (storedRole && (storedRole === 'pharmacy' || storedRole === 'medical_rep')) {
      setCurrentUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    // This effect runs only on the client
    if (typeof window !== 'undefined') {
        localStorage.setItem('currentUserRole', currentUserRole);
    }
  }, [currentUserRole]);

  return (
    <RoleContext.Provider value={{ currentUserRole, setCurrentUserRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
