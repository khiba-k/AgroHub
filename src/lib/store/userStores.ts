
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
  farmDescription: string | undefined;
  farmDistrict: string | undefined;
  farmCountry: string | undefined;
  farmContactNumber1: string | undefined;
  farmContactNumber2: string | undefined;
}

// Complete Farm Store interface
interface FarmStore {
  // State
  farmId: string | undefined;
  farmName: string | undefined;
  farmDescription: string | undefined;
  farmDistrict: string | undefined;
  farmCountry: string | undefined;
  farmContactNumber1: string | undefined;
  farmContactNumber2: string | undefined;  
  loading: boolean;
  
  // Actions
  setFarm: (farmData: FarmData) => void;
  setFarmId: (farmId: string | undefined) => void;
  setFarmName: (farmName: string | undefined) => void;
  setFarmDescription: (farmDescription: string | undefined) => void;
  setFarmDistrict: (farmDistrict: string | string | undefined) => void;
  setFarmCountry: (farmCountry: string | undefined) => void;
  setFarmContactNumber1: (farmContactNumber1: string | undefined) => void;
  setFarmContactNumber2: (farmContactNumber2: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  clearFarm: () => void;
}

// Farm store with proper typing
export const useFarmStore = create<FarmStore>((set) => ({
  // Farm state
  farmId: undefined,
  farmName: undefined,
  farmDescription: undefined,
  farmDistrict: undefined,
  farmCountry: undefined,
  farmContactNumber1: undefined,
  farmContactNumber2: undefined,
  loading: false,
  
  // Farm actions
  setFarm: (farmData: FarmData) => set({
    farmId: farmData.farmId,
    farmName: farmData.farmName,
    farmDescription: farmData.farmDescription,
    farmDistrict: farmData.farmDistrict,
    farmCountry: farmData.farmCountry,
    farmContactNumber1: farmData.farmContactNumber1,
    farmContactNumber2: farmData.farmContactNumber2,
  }),
  
  setFarmId: (farmId: string | undefined) => set({ farmId }),
  setFarmName: (farmName: string | undefined) => set({ farmName }),
  setFarmDescription: (farmDescription: string | undefined) => set ({farmDescription}),
  setFarmDistrict: (farmDistrict: string | undefined) => set ({farmDistrict}),
  setFarmCountry: (farmCountry: string | undefined) => set ({farmCountry}),
  setFarmContactNumber1: (farmContactNumber1 : string | undefined) => set ({farmContactNumber1}),
  setFarmContactNumber2: (farmContactNumber2: string | undefined) => set ({farmContactNumber2}),
  setLoading: (loading: boolean) => set({ loading }),
  
  // Clear farm data
  clearFarm: () => set({
    farmId: undefined,
    farmName: undefined,
    farmDescription: undefined,
    farmDistrict: undefined,
    farmCountry: undefined,
    farmContactNumber1: undefined,
    farmContactNumber2: undefined,
    loading: false,
  }),
}))