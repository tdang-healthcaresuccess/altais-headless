import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const logFile = path.join(process.cwd(), 'revalidation.log');
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - ${JSON.stringify(req.query)}\n`;
  
  try {
    fs.appendFileSync(logFile, logEntry);
  } catch (err) {
    console.log('Could not write to log file:', err.message);
  }

  console.log('🔄 Revalidation request received:', {
    query: req.query,
    method: req.method,
    timestamp: new Date().toISOString(),
    headers: {
      'user-agent': req.headers['user-agent'],
      'x-forwarded-for': req.headers['x-forwarded-for'],
    }
  });

  // Check for a secret token to authenticate the request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    console.log('❌ Invalid secret token provided');
    return res.status(401).json({ message: 'Invalid token' });
  }

  const path = req.query.path;

  // Ensure the path parameter is provided
  if (!path) {
    console.log('❌ No path parameter provided');
    return res.status(400).json({ message: 'Path query parameter is required' });
  }

  try {
    console.log(`🔄 Attempting to revalidate path: ${path}`);
    // Revalidate the specified path
    await res.revalidate(path);
    console.log(`✅ Successfully revalidated path: ${path}`);
    return res.json({ 
      revalidated: true, 
      path, 
      timestamp: new Date().toISOString(),
      loggedToFile: true 
    });
  } catch (err) {
    console.log(`❌ Error revalidating path ${path}:`, err.message);
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}