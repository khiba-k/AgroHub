
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
  farmId: string;
  farmName: string;
  farmDescription: string;
  farmDistrict: string;
  farmCountry: string;
  farmContactNumber1: string;
  farmContactNumber2: string;
  farmHasPaymentMethod: string;
}

// Complete Farm Store interface
interface FarmStore {
  // State
  farmId: string;
  farmName: string;
  farmDescription: string;
  farmDistrict: string;
  farmCountry: string;
  farmContactNumber1: string;
  farmContactNumber2: string;
  farmHasPaymentMethod: string;  
  loading: boolean;
  
  // Actions
  setFarm: (farmData: FarmData) => void;
  setFarmId: (farmId: string) => void;
  setFarmName: (farmName: string) => void;
  setFarmDescription: (farmDescription: string) => void;
  setFarmDistrict: (farmDistrict: string | string) => void;
  setFarmCountry: (farmCountry: string) => void;
  setFarmContactNumber1: (farmContactNumber1: string) => void;
  setFarmContactNumber2: (farmContactNumber2: string) => void;
  setFarmHasPaymentMethod: (farmHasPaymentMethod: string) => void;
  setLoading: (loading: boolean) => void;
  clearFarm: () => void;
}

// Farm store with proper typing
export const useFarmStore = create<FarmStore>((set) => ({
  // Farm state
  farmId: "",
  farmName: "",
  farmDescription: "",
  farmDistrict: "",
  farmCountry: "",
  farmContactNumber1: "",
  farmContactNumber2: "",
  farmHasPaymentMethod: "",
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
    farmHasPaymentMethod: farmData.farmHasPaymentMethod,
  }),
  
  setFarmId: (farmId: string) => set({ farmId }),
  setFarmName: (farmName: string) => set({ farmName }),
  setFarmDescription: (farmDescription: string) => set ({farmDescription}),
  setFarmDistrict: (farmDistrict: string) => set ({farmDistrict}),
  setFarmCountry: (farmCountry: string) => set ({farmCountry}),
  setFarmContactNumber1: (farmContactNumber1 : string) => set ({farmContactNumber1}),
  setFarmContactNumber2: (farmContactNumber2: string) => set ({farmContactNumber2}),
  setFarmHasPaymentMethod: (farmHasPaymentMethod: string) => set ({farmHasPaymentMethod}),
  setLoading: (loading: boolean) => set({ loading }),
  
  // Clear farm data
  clearFarm: () => set({
    farmId: "",
    farmName: "",
    farmDescription: "",
    farmDistrict: "",
    farmCountry: "",
    farmContactNumber1: "",
    farmContactNumber2: "",
    farmHasPaymentMethod:"",
    loading: false,
  }),
}))