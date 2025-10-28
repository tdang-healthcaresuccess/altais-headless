export default function TestISR({ timestamp, randomNumber }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>ISR Test Page</h1>
      <p><strong>Build timestamp:</strong> {timestamp}</p>
      <p><strong>Random number:</strong> {randomNumber}</p>
      <p><strong>Current time:</strong> {new Date().toISOString()}</p>
      <hr />
      <p>If ISR is working, the build timestamp and random number should update when you revalidate this page.</p>
      <p>Test revalidation with:</p>
      <code>
        curl "http://localhost:3000/api/revalidate/?secret=a0cdfc4d4acbf19c352eb8ee760d9098461fc6ad01d84dcc05e9017dd3c2b53c&path=/test-isr/"
      </code>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
      randomNumber: Math.floor(Math.random() * 10000),
    },
    // Enable ISR with a 1 second revalidation (for testing)
    revalidate: 1,
  };
}