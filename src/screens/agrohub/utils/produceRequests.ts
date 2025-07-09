// lib/api/submitProduce.ts
import axios from 'axios'
import type { ProduceFormData } from './produceFromValidation'

export const submitProduce = async (data: ProduceFormData) => {
  try {
    const response = await axios.post('/api/produce/add', data)
    console.log("Data: ", data)
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add new produce.",
    };
  }
}

export const fetchProduce = async () => {
 try {
  const response = await axios.get('/api/produce/get')
  return response.data.data
 }catch (error: any) {
  console.error('Error fetching produce:', error)
  throw error
 }
}