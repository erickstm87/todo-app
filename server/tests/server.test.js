const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo.js');

const todos = [{
  _id : new ObjectID(),
  text: 'first set of todos',
  completed: false,
  completedAt: 123
},{
  _id: new ObjectID(),
  text: 'second set of todos'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Text todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a new todo', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
})

describe('GET /todos/:id', () => {

  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/stuff')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should return a 404 if the todo is not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return a 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/gobbledygook')
      .expect(404)
      .end(done)
  });

describe('PATCH functionality', () => {
  it('should update the object successfully', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'some new text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe('some new text');
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find({_id: hexId}).then((todos) => {
          expect(todos[0].completed).toBe(true);
          done();
        }).catch((e) => done(e));
      });
   });
  it('should update completed to true when object complete is not set', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: 'something else'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe('something else')
        expect(res.body.todo.completed).toBe(true);
        //expect(res.body.todo.completedAt).toNotExist();
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find({_id: hexId}).then((todos) => {
          expect(todos[0].completed).toBe(true);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if the object id is invalid', (done) => {
    request(app)
      .patch('/todos/utternonsense')
      .expect(404)
      .end(done)
  });
});

});
