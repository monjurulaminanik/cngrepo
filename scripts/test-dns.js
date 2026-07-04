const dns = require('dns');
dns.resolveSrv('_mongodb._tcp.d360crm.s0ebokd.mongodb.net', (err, addresses) => {
  if (err) console.error("SRV Error:", err);
  else console.log("SRV Addresses:", addresses);
});
