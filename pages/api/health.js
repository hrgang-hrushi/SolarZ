// Health check endpoint
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok',
    message: 'Solarify API is running',
    timestamp: new Date().toISOString()
  })
}
