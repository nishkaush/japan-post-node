const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require("graphql");

graphql.G;
const { mongoose, ratesModel } = require("./db/mongoose");
const _ = require("lodash");

const Country = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    countryName: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    regionCode: { type: GraphQLInt },
    maxLength: { type: GraphQLInt },
    maxLWH: { type: GraphQLInt },
    method: { type: GraphQLString },
    minWeight: { type: GraphQLInt },
    maxWeight: { type: GraphQLInt },
    rate: { type: GraphQLInt }
  })
});

const Countries = new GraphQLObjectType({
  name: "countries",
  fields: () => ({
    countryName: { type: GraphQLString }
  })
});

const ratesSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      rates: {
        type: new GraphQLList(Country),
        args: {
          country: { type: GraphQLString },
          weight: { type: GraphQLInt }
          // length: { type: GraphQLInt },
          // width: { type: GraphQLInt },
          // height: { type: GraphQLInt }
        },
        resolve(parentValue, args) {
          return ratesModel
            .find({
              countryName: args.country,
              minWeight: { $lte: args.weight },
              maxWeight: { $gt: args.weight }
            })
            .then(res => {
              return res;
            });
        }
      },
      countries: {
        type: new GraphQLList(Countries),
        resolve() {
          return ratesModel.find().then(res => {
            let nationArr = res.map(e => {
              let country = {};
              country.countryName = e.countryName;
              return country;
            });
            return _.uniqWith(nationArr, _.isEqual);
          });
        }
      }
    }
  })
});

module.exports = ratesSchema;
