const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Task{
  id:String!
  title:String!
  done:Boolean!
  date:String!
}

type Query{
  getTasks:[Task!]!
}

type Mutation{
  addTask(title:String!):Task!
  finishTask(id:String!, done:Boolean!):String
  removeTask(id:String!):String
}
`);
