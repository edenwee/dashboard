export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const alertData = await request.json();

    // Use a timestamp as the key for storing the alert
    const timestamp = new Date().toISOString();
    await env.ALERTS_KV.put(`alert:${timestamp}`, JSON.stringify(alertData));

    return new Response('Alert received and stored.', { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
