"use client";
import { getUserObj } from '@/actions/auth/BasicAuthActions';
import { Toast } from '@/components/agrohub/ui/Toast';
import { useUserStore } from '@/lib/store/userStores';
// app/agrohub/layout.tsx
import AgroHubHeader from '@/screens/agrohub/header/AgroHubHeader';
import AgroHubSidebar from '@/screens/agrohub/sidebar/AgroHubSidebar';
import React, { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Fetch user and farm data on component mount
  const { setUser, setLoading: setUserLoading } = useUserStore();
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            setUserLoading(true);

            const user = await getUserObj();
            if (user) {
                // Store user data in Zustand
                setUser({
                    userId: user.id,
                    email: user.email,
                    avatar: user.metadata?.avatar_url || "",
                    role: user.metadata?.role || "",
                });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setUserLoading(false);
        }
    };

    fetchUserData();
}, [setUser]);
  return (
    <div className='flex flex-row'>
       <AgroHubSidebar/>
        
        <div className='flex flex-col w-[100%]'>
        <AgroHubHeader/>
          {children}
          <Toast/>
          </div>
    </div>
  );
}
