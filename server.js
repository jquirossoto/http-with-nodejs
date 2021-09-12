const https = require('https');
// const http = require('http');
const url = require('url');
const fs = require('fs');
const jsonBody = require('body/json');

const services = require('./services');
const formidable = require('formidable');

const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});

// const server = http.createServer();

server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if(request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id);
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        const serializedJSON = JSON.stringify(metadata);
        response.write(serializedJSON);
        response.end();
    } else if (request.method === 'POST' && parsedUrl.pathname === '/users') {
        jsonBody(request, response, (err, body) => {
            if (err) {
                response.statusCode = 500;
                console.error('err', err);
            } else {
                services.createUser(body.username);
            }
            response.end();
        });
    } else if (request.method === 'POST' && parsedUrl.pathname === '/upload') {
        const form = new formidable.IncomingForm({
            uploadDir: __dirname,
            keepExtensions: true,
            multiples: true,
            maxFieldsSize: 5 * 1024 * 1024
        });
        form.parse(request)
            .on('fileBegin', (name, file) => {
                console.log('Upload started');
            })
            .on('file', (name, file) => {
                console.log('Field/file pair received');
            })
            .on('progress', (received, expected) => {
                console.log('received', received);
                console.log('expected', expected);
            })
            .on('error', (err) => {
                console.error('error', err);
            })
            .on('aborted', () => {
                console.log('aborted!')
            })
            .on('end', () => {
                console.log('done');
                response.end('Success!');
            })
    } else {
        fs.createReadStream("./index.html").pipe(response);
    }
});

server.listen(443);
// server.listen(4000);