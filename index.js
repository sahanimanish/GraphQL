const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

//mongodb://<dbuser>:<dbpassword>@ds261626.mlab.com:61626/graphql
const app = express();

mongoose.connect(
  'mongodb://ManishSahani:Manish8601@ds261626.mlab.com:61626/graphql',
  { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
  console.log('connection established');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log('server runnnning on port no 4000');
});
