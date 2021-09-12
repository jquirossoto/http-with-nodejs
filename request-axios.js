const axios = require('axios');
const fs = require('fs');

const options = {
    method: 'GET',
    url: 'http://www.google.com',
    responseType: 'stream'
};

axios(options).then((response) => {
    response.data.pipe(fs.createWriteStream('google.html'));
    console.log(response.data);
}, function (err) {
    console.log(err);
});