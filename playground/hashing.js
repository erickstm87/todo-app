const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err,salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

var hashedPassword = '$2a$10$brC3dGVy/pfxWr4TLoFUzufnypRDcatXFswWB0ZyvcpJXTMMTe3/m';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(`token is ${token}`);
// var decoded = jwt.verify(token, '123abc');
// console.log('docoded', decoded);
// // var message = 'tom\'s the bomb';
//
// var hash = SHA256(message).toString();
//
// console.log(`message is ${message}`);
// console.log(`encyrypted is ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('data was not changed');
// }
// else {
//   console.log('data was changed don\'t trust');
// }
