// app/agrohub/layout.tsx
import AgroHubHeader from '@/screens/agrohub/header/AgroHubHeader';
import AgroHubSidebar from '@/screens/agrohub/sidebar/AgroHubSidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-row'>
       <AgroHubSidebar/>
        
        <div className='flex flex-col w-[100%]'>
        <AgroHubHeader/>
          {children}</div>
    </div>
  );
}
