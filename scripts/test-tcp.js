const net = require('net');
const client = new net.Socket();

client.connect(27017, 'ac-f1aojbt-shard-00-00.s0ebokd.mongodb.net', function() {
    console.log('TCP Connection established');
    client.destroy(); 
});

client.on('error', function(err) {
    console.error('TCP Connection failed:', err);
});
