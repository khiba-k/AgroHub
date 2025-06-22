// app/agrohub/layout.tsx
import AgroHubHeader from '@/screens/agrohub/header/AgroHubHeader';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <AgroHubHeader/>
      {children}
    </div>
  );
}
