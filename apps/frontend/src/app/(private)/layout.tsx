// app/(private)/layout.tsx
'use client';

import { useAuth } from "../hooks/useAuth";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Carregando...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
