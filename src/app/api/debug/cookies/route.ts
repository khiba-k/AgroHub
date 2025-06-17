// api/debug-cookies/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    
    // Find all Supabase auth cookies
    const supabaseCookies = allCookies.filter(cookie => 
        cookie.name.includes('sb-oyczsqfgkfhdxxnrinnu-auth-token')
    );
    
    console.log('=== SUPABASE COOKIES DEBUG ===');
    
    supabaseCookies.forEach((cookie, index) => {
        console.log(`\nCookie ${index + 1}:`);
        console.log(`Name: ${cookie.name}`);
        console.log(`Value length: ${cookie.value.length}`);
        console.log(`First 100 chars: ${cookie.value.substring(0, 100)}`);
        console.log(`Starts with "base64-": ${cookie.value.startsWith('base64-')}`);
        
        // Try to see if it's valid base64 after removing "base64-" prefix
        if (cookie.value.startsWith('base64-')) {
            const withoutPrefix = cookie.value.substring(7); // Remove "base64-"
            console.log(`Without prefix first 50 chars: ${withoutPrefix.substring(0, 50)}`);
            
            try {
                const decoded = atob(withoutPrefix);
                console.log(`Decoded first 100 chars: ${decoded.substring(0, 100)}`);
                JSON.parse(decoded);
                console.log(`✅ Valid JSON after removing prefix`);
            } catch (e) {
                if (e instanceof Error) {
                    console.log(`❌ Still invalid after removing prefix: ${e.message}`);
                } else {
                    console.log(`❌ Still invalid after removing prefix: Unknown error`);
                }
            }
        } else {
            // Try to decode as-is
            try {
                const decoded = atob(cookie.value);
                JSON.parse(decoded);
                console.log(`✅ Valid base64 JSON as-is`);
            } catch (e) {
                if (e instanceof Error) {
                    console.log(`❌ Invalid base64 or JSON as-is: ${e.message}`);
                } else {
                    console.log(`❌ Invalid base64 or JSON as-is: Unknown error`);
                }
            }
        }
    });
    
    return NextResponse.json({
        message: 'Check console for cookie debug info',
        cookieCount: supabaseCookies.length,
        cookieNames: supabaseCookies.map(c => c.name)
    });
}