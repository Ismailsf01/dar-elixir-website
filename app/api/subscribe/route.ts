import { NextResponse } from 'next/server';

const serviceId = process.env.EMAILJS_SERVICE_ID!;
const templateId = process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID!;
const publicKey = process.env.EMAILJS_PUBLIC_KEY!;
const privateKey = process.env.EMAILJS_PRIVATE_KEY!;

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        const templateParams = {
            email_address: email,
        };

        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: templateParams,
                accessToken: privateKey
            })
        });

        if (!emailjsResponse.ok) {
            throw new Error('Failed to send subscription email.');
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully.' });

    } catch (error) {
        console.error('Error subscribing:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}