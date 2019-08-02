const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

let books = [
  {
    name: "Book1",
    genre: "fantasy",
    id: "1",
    authorIds: "2"
  },
  {
    name: "Book2",
    genre: "comedy",
    id: "2",
    authorId: "1"
  },
  {
    name: "Book3",
    genre: "romCom",
    id: "3",
    authorId: "5"
  },
  {
    name: "Book4",
    genre: "fantasy",
    id: "1",
    authorId: "4"
  },
  {
    name: "Book5",
    genre: "comedy",
    id: "2",
    authorId: "3"
  },
  {
    name: "Book6",
    genre: "romCom",
    id: "3",
    authorId: "2"
  }
];

let authors = [
  {
    name: "Patrick Rothfuss",
    age: 44,
    id: "1"
  },
  {
    name: "Brandon Sanderson",
    age: 42,
    id: "2"
  },
  {
    name: "Terry Pratchett",
    age: 66,
    id: "3"
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        let data;
        for (let author of authors) {
          if (parent.authorId === author.id) {
            data = author;
          }
        }
        return data;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        let data = [];
        for (let book of books) {
          if (parent.id === book.id) {
            data.push(book);
          }
        }
        return data;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other sources
        let data;
        for (let book of books) {
          if (args.id === book.id) {
            data = book;
          }
        }
        return data;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        let data;
        for (let author of authors) {
          if (args.id === author.id) {
            data = author;
          }
        }
        return data;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  })
});

const Mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        authors.push(args);
        console.log(authors);
        return authors.slice(-1)[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
