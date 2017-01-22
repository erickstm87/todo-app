const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

var id = '587b017d363da3c36306e371';

if(!ObjectID.isValid(id)){
  console.log('not valid');
}

// var id = '587eee6020a741c175028dcd1111';
//
// if(!ObjectID.isValid(id)){
//   console.log('that id ain\'t valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("todos", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("todos", todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
  if(!user){
    return console.log('cannot find that user');
  }

  console.log('Found user with id', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
