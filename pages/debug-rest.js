import { useState, useEffect } from 'react';

export default function DebugRestAPI() {
  const [restData, setRestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Test the WordPress REST API endpoint
        const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://altaisheadldev.wpenginepowered.com';
        const restUrl = `${wordpressUrl}/wp-json/fad/v1/physician/nayana-anne-md`;
        
        console.log('Fetching from:', restUrl);
        
        const response = await fetch(restUrl, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError({ status: response.status, data });
        } else {
          setRestData(data);
        }
        
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>REST API Debug</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>WordPress REST API Test</h2>
        <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://altaisheadldev.wpenginepowered.com'}/wp-json/fad/v1/physician/nayana-anne-md</p>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        
        {error && (
          <div style={{ background: '#ffebee', padding: '10px', color: '#c62828' }}>
            <h4>Error:</h4>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {restData && (
          <div style={{ background: '#e8f5e8', padding: '10px' }}>
            <h4>Success! Physician Found via REST:</h4>
            <pre>{JSON.stringify(restData, null, 2)}</pre>
          </div>
        )}
        
        {!loading && !restData && !error && (
          <div style={{ background: '#fff3e0', padding: '10px', color: '#f57c00' }}>
            <strong>No data returned</strong>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>Environment Variables</h2>
        <p><strong>NEXT_PUBLIC_WORDPRESS_URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'Not set'}</p>
        <p><strong>WORDPRESS_URL:</strong> {process.env.WORDPRESS_URL || 'Not set'}</p>
      </div>
    </div>
  );
}