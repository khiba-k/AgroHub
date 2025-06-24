
import { create } from 'zustand'

// User data interface
interface UserData {
  userId: string | undefined;
  email: string | undefined;
  avatar: string;
  role: string;
}

// Complete User Store interface
interface UserStore {
  // State
  userId: string | undefined;
  email: string | undefined;
  avatar: string;
  role: string;
  loading: boolean;
  
  // Actions
  setUser: (userData: UserData) => void;
  setUserId: (userId: string | undefined) => void;
  setEmail: (email: string | undefined) => void;
  setAvatar: (avatar: string) => void;
  setRole: (role: string) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

// User store with proper typing
export const useUserStore = create<UserStore>((set) => ({
  // User state
  userId: undefined,
  email: undefined,
  avatar: "",
  role: "",
  loading: true,
  
  // User actions
  setUser: (userData: UserData) => set({
    userId: userData.userId,
    email: userData.email,
    avatar: userData.avatar,
    role: userData.role,
  }),
  
  setUserId: (userId: string | undefined) => set({ userId }),
  setEmail: (email: string | undefined) => set({ email }),
  setAvatar: (avatar: string) => set({ avatar }),
  setRole: (role: string) => set({ role }),
  setLoading: (loading: boolean) => set({ loading }),
  
  // Clear user data
  clearUser: () => set({
    userId: undefined,
    email: undefined,
    avatar: "",
    role: "",
    loading: false,
  }),
}))

// Farm data interface
interface FarmData {
  farmId: string | undefined;
  farmName: string | undefined;
  farmDetails: any; // Replace 'any' with a more specific type if possible
}

// Complete Farm Store interface
interface FarmStore {
  // State
  farmId: string | undefined;
  farmName: string | undefined;
  farmDetails: any;
  loading: boolean;
  
  // Actions
  setFarm: (farmData: FarmData) => void;
  setFarmId: (farmId: string | undefined) => void;
  setFarmName: (farmName: string | undefined) => void;
  setFarmDetails: (farmDetails: any) => void;
  setLoading: (loading: boolean) => void;
  clearFarm: () => void;
}

// Farm store with proper typing
export const useFarmStore = create<FarmStore>((set) => ({
  // Farm state
  farmId: undefined,
  farmName: undefined,
  farmDetails: null,
  loading: false,
  
  // Farm actions
  setFarm: (farmData: FarmData) => set({
    farmId: farmData.farmId,
    farmName: farmData.farmName,
    farmDetails: farmData.farmDetails,
  }),
  
  setFarmId: (farmId: string | undefined) => set({ farmId }),
  setFarmName: (farmName: string | undefined) => set({ farmName }),
  setFarmDetails: (farmDetails: any) => set({ farmDetails }),
  setLoading: (loading: boolean) => set({ loading }),
  
  // Clear farm data
  clearFarm: () => set({
    farmId: undefined,
    farmName: undefined,
    farmDetails: null,
    loading: false,
  }),
}))