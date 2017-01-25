const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
     return console.log('unable to connect to server');
  };
  console.log('Connected to MongoDb server');
  db.collection('todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection('todos').insertOne({
    text: 'buy a dog',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('unable to insert todo:', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection('todos').insertOne({
    text: 'go to sweden',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('unable to insert todo:', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // db.collection('Users').insertOne({
  //   name: 'tomas',
  //   age: 29,
  //   location: 'boulder'
  // }, (err, res) => {
  //   if(err){
  //     return console.log('couldn\'t insert');
  //   };
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });


  db.close();
});
