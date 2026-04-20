import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// This webhook can be called by a cron job or external service (like Twilio or Make/Zapier)
// to trigger WhatsApp messages for subscribers.
export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all active subscribers
    if (!adminDb) {
      return NextResponse.json({ error: 'Firebase Admin not initialized due to missing environment variables.' }, { status: 500 });
    }
    const subscribersSnapshot = await adminDb.collection('subscribers').where('active', '==', true).get();
    
    if (subscribersSnapshot.empty) {
      return NextResponse.json({ message: 'No active subscribers found.' }, { status: 200 });
    }

    const phoneNumbers = [];
    subscribersSnapshot.forEach(doc => {
      phoneNumbers.push(doc.data().phone);
    });

    // Here you would integrate with your WhatsApp provider (e.g. Twilio API)
    // For now, we simulate exporting the numbers.
    console.log(`Exporting ${phoneNumbers.length} numbers for WhatsApp reminders.`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscribers exported successfully',
      count: phoneNumbers.length,
      data: phoneNumbers 
    }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
