export async function onRequest(context) {
  const { env } = context;

  try {
    const keys = await env.ALERTS_KV.list();
    const alerts = await Promise.all(
      keys.keys.map(async (key) => {
        const alert = await env.ALERTS_KV.get(key.name);
        return { key: key.name, alert: JSON.parse(alert) };
      })
    );

    return new Response(JSON.stringify(alerts), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
