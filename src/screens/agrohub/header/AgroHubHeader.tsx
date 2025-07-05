"use client"
import { Button } from '@/components/ui/button'
import { Plus, User } from 'lucide-react'
import React, { useState } from 'react'
import { ProductFormData } from '../utils/types';
import AgroHubAddProductForm from '../listings/components/AgroHubAddProductForm';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFarmStore, useUserStore } from '@/lib/store/userStores';
import { useRouter } from 'next/navigation';

const AgroHubHeader = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  // Get user data from Zustand store
  const { email, avatar, role, clearUser } = useUserStore();
  const { farmName, clearFarm } = useFarmStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.ok) {
        // Clear both stores on logout
        clearUser();
        clearFarm();
        router.push('/welcome');
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  }

  // Get user name from email (first part before @)
  const userName = email ? email.split('@')[0] : '';
  return (
    <>
      <div>
        <header className="border-b border-gray-200 ">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold ">AgroHub</h1>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Produce</span>
              </Button>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <ThemeSwitcher />


                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={avatar} alt={userName} />
                          <AvatarFallback>{email?.charAt(0)?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {userName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {email}
                          </p>
                          {farmName && (
                            <p className="text-xs leading-none text-muted-foreground">
                              Farm: {farmName}
                            </p>
                          )}
                          <p className="text-xs leading-none text-muted-foreground">
                            {role && role.charAt(0).toUpperCase() + role.slice(1)}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/settings")}>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        console.log("Dropdown item clicked");
                        handleLogout();
                      }}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Form for adding new produce */}
        <AgroHubAddProductForm showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct} />

      </div>
    </>
  )
}

export default AgroHubHeader