export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { email, business, businessLabel } = req.body;
  
  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/972c363227/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: '9YnFs4SSY8cFEk7C6uIl3w',
        email: email,
        tags: ['bc-prompt-generator', 'biz-' + business],
        fields: { business_type: businessLabel, source: 'BC Prompt Generator' }
      })
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed' });
  }
}
