const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
     return console.log('unable to connect to server');
  };
  console.log('Connected to MongoDb server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5877c0071a6ec368f341a664")
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID("5877c14fc1643369d85bb7e3")
  }, {
    $set: {
      name: 'someoneElse'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  //db.close();
});
