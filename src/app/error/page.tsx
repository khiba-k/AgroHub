'use client'

import { useRouter } from 'next/navigation'

export default function ErrorPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold mb-4">Sorry, something went wrong...</h1>
            <p className="text-lg text-gray-400 mb-6">
                Click below to try again.
            </p>
            <button
                onClick={() => router.back()}
                className="text-blue-600 hover:underline text-lg"
            >
                Try again
            </button>
        </div>
    )
}
