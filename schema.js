const graphql = require('graphql');
const _ = require('lodash');
const Author = require('./models/author');
const Book = require('./models/book');
//

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} = graphql;

//Dummy Data
// var Books = [
//   {
//     id: '1',
//     name: 'War and Peace',
//     genere: 'Drama',
//     authorID: '1'
//   },

//   {
//     id: '2',
//     name: 'sky-scrapper',
//     genere: 'Sci-Fi',
//     authorID: '3'
//   },

//   {
//     id: '3',
//     name: 'The Last World',
//     genere: 'Tragedy',
//     authorID: '2'
//   },
//   {
//     id: '4',
//     name: 'Half Girlfriend',
//     genere: 'Love-story',
//     authorID: '2'
//   },
//   {
//     id: '5',
//     name: 'Black Suits you',
//     genere: 'Fantasy',
//     authorID: '3'
//   },
//   {
//     id: '6',
//     name: 'Insidious',
//     genere: 'Fantasy',
//     authorID: '2'
//   }
// ];

// var author = [
//   {
//     id: '1',
//     name: 'chetan Bhagat',
//     age: 37
//   },
//   {
//     id: '2',
//     name: 'Kamal narayan',
//     age: 32
//   },
//   {
//     id: '3',
//     name: 'Jyoti Bhargava',
//     age: 30
//   },
//   {
//     id: '4',
//     name: 'Novonil Chakraborty',
//     age: 47
//   }
// ];

//Schema Definiton

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(author, { id: parent.authorID });
        return Author.findById(parent.auhterId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(Books, { authorID: parent.id });
        return Book.find({ auhterId: parent.id });
      }
    }
  })
});
//End of Schema Definiton

// start Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
        // return _.find(Books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.find(author, { id: args.id });
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return author;
        return Author.find({});
      }
    }
  }
});
//End of Query

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
