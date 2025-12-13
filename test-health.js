const http = require('http');

console.log('🧪 Testing backend health endpoint...\n');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', JSON.stringify(JSON.parse(data), null, 2));
    
    if (res.statusCode === 200) {
      console.log('\n✅ Backend is running successfully!');
      console.log('🌐 Visit http://localhost:3000 for API info');
    } else {
      console.log('\n⚠️  Backend responded but with an error');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
  console.log('\nMake sure the backend is running:');
  console.log('  cd backend && npm run dev');
});

req.end();
