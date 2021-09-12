const https = require('https');

const data = JSON.stringify({
    username: 'jquirossoto'
});

const options = {
    hostname: 'localhost',
    port: 443,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': Buffer.from('username' + ':' + 'password').toString('base64')
    }
};

const request = http.request(
    options,
    (response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(`headers: ${response.headers}`);
        response.on('data', (chunk) => {
            console.log('chunk', chunk.toString());
        });
    }
);

request.on('error', (err) => {
    console.error('error', err);
});

request.write(data);

request.end();