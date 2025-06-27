import { getProduce } from '@/actions/produce/produceActions'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const produceList = await getProduce()
    return NextResponse.json({ success: true, data: produceList })
  } catch (error) {
    console.error('Failed to fetch produce:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
