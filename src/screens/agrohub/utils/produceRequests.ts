// lib/api/submitProduce.ts
import axios from 'axios'
import type { ProduceFormData } from './produceFromValidation'

export const submitProduce = async (data: ProduceFormData) => {
  try {
    const response = await axios.post('/api/produce/add', data)
    console.log("Data: ", data)
    return response.data
  } catch (error: any) {
    // Log and rethrow for UI to handle if needed
    console.error('Error submitting produce:', error)
    throw error
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