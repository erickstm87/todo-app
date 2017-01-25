const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove({})
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5887a229d55d205288f7601c').then((todo) => {
  console.log(todo);
});
