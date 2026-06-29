import { NextResponse } from 'next/server';

// In a production environment, this should be stored in process.env.ADMIN_PASSWORD
// For this deployment, we securely hardcode it on the SERVER SIDE only.
// The client will NEVER see this string.
const ADMIN_PASSWORD = 'ejb752018@';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      );
    }

    // Secure server-side comparison
    if (password === ADMIN_PASSWORD) {
      // Password matches. Return a success token.
      // In a real app, you would sign a JWT here.
      const mockToken = Buffer.from(`admin-auth-${Date.now()}`).toString('base64');
      
      return NextResponse.json(
        { 
          success: true, 
          token: mockToken,
          message: 'Authentication successful'
        }, 
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid master password. Access Denied.' },
        { status: 403 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during authentication' },
      { status: 500 }
    );
  }
}
