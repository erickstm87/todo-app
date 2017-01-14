const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
     return console.log('unable to connect to server');
  };
  console.log('Connected to MongoDb server');

  // db.collection('Todos').find({
  //   //_id: new ObjectID("5879fea18f73066b396a0ec2")
  //   name: 'tomas'
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) => {
  //   console.log('unable to fetch todos', err);
  // });

  db.collection('Users').find({
    name: 'tomas'
  }).toArray().then((docs) => {
    console.log('here is the user');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('couldn\'t find user');
  });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  // },(err) => {
  //   console.log('unable to fetch todos', err);
  // });
  //db.close();
});
