const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
     return console.log('unable to connect to server');
  };
  console.log('Connected to MongoDb server');
  //deleteMany
  db.collection('Users').deleteMany({name: 'mike'}).then(result => {
    console.log(result);
  });
  // //deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'go to sweden',
  //   completed: false
  // }).then(result => {
  //   console.log(result);
  // });
  //findOneAndDelete
  db.collection('Users').findOneAndDelete({
    "_id" : new ObjectID("587ad35397e785e0bf9eebc1")
  }).then(result => {
    console.log(result);
  });
  //db.close();
});
