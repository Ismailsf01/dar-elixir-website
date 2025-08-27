import { NextResponse } from 'next/server';

// This is a mock function, in a real app you'd get this from an env var
// We do this to avoid exposing private keys to the browser
const serviceId = process.env.EMAILJS_SERVICE_ID!;
const templateId = process.env.EMAILJS_TEMPLATE_ID!;
const publicKey = process.env.EMAILJS_PUBLIC_KEY!;
const privateKey = process.env.EMAILJS_PRIVATE_KEY!; // For backend use

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, city, address, cartItems, total } = body;

        // Basic validation
        if (!name || !phone || !city || !address || !cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        // Format the cart items into a readable string for the email
        const message = cartItems.map((item: any) =>
            `${item.quantity} x ${item.name} (${item.size}) - ${item.price.toFixed(2)} MAD`
        ).join('\n');

        const templateParams = {
            from_name: name,
            phone,
            city,
            address,
            message,
            total_amount: total.toFixed(2),
        };

        // Use the EmailJS REST API for server-side execution
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: templateParams,
                accessToken: privateKey
            })
        });

        if (!emailjsResponse.ok) {
            const errorText = await emailjsResponse.text();
            throw new Error(`Failed to send email: ${errorText}`);
        }

        return NextResponse.json({ success: true, message: 'Order submitted successfully.' });

    } catch (error) {
        console.error('Error submitting order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}