const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

let books = [
  {
    name: "Book1",
    genre: "fantasy",
    id: "1"
  },
  {
    name: "Book2",
    genre: "comedy",
    id: "2"
  },
  {
    name: "Book3",
    genre: "romCom",
    id: "3"
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
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
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
