const http = require('http');
const server = require('./server');

server.on('listening', () => {
  const options = {
    hostname: 'localhost',
    port: process.env.PORT || 8080,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (data !== 'Hello world\n') {
        console.error('Unexpected response:', data);
        process.exit(1);
      }
      server.close();
    });
  });

  req.on('error', err => {
    console.error(err);
    server.close();
    process.exit(1);
  });

  req.end();
});
