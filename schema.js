const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require("graphql");

//  IEX Symbol Type

const IEXSymbolType = new GraphQLObjectType({
  name: "IEXSymbol",
  fields: () => ({
    symbol: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    isEnabled: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    iexId: { type: GraphQLString }
  })
});

//  IEX Company Type
const IEXCompanyType = new GraphQLObjectType({
  name: "IEXCompany",
  fields: () => ({
    symbol: { type: GraphQLString },
    companyName: { type: GraphQLString },
    exchange: { type: GraphQLString },
    industry: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    CEO: { type: GraphQLString },
    issueType: { type: GraphQLString },
    sector: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  })
});

//  IEX Logo Type
const IEXLogoType = new GraphQLObjectType({
  name: "IEXLogo",
  fields: () => ({
    url: { type: GraphQLString }
  })
});

//  IEX Quote Type
const IEXQuoteType = new GraphQLObjectType({
  name: "IEXQuote",
  fields: () => ({
    symbol: { type: GraphQLString },
    companyName: { type: GraphQLString },
    primaryExchange: { type: GraphQLString },
    sector: { type: GraphQLString },
    calculationPrice: { type: GraphQLString },
    open: { type: GraphQLFloat },
    openTime: { type: GraphQLFloat },
    close: { type: GraphQLFloat },
    closeTime: { type: GraphQLFloat },
    high: { type: GraphQLFloat },
    low: { type: GraphQLFloat },
    latestPrice: { type: GraphQLFloat },
    latestSource: { type: GraphQLString },
    latestTime: { type: GraphQLString },
    latestUpdate: { type: GraphQLFloat },
    latestVolume: { type: GraphQLFloat },
    iexRealtimePrice: { type: GraphQLFloat },
    iexRealtimeSize: { type: GraphQLFloat },
    iexLastUpdated: { type: GraphQLFloat },
    delayedPrice: { type: GraphQLFloat },
    delayedPriceTime: { type: GraphQLFloat },
    extendedPrice: { type: GraphQLFloat },
    extendedChange: { type: GraphQLFloat },
    extendedChangePercent: { type: GraphQLFloat },
    extendedPriceTime: { type: GraphQLFloat },
    previousClose: { type: GraphQLFloat },
    change: { type: GraphQLFloat },
    changePercent: { type: GraphQLFloat },
    iexMarketPercent: { type: GraphQLFloat },
    iexVolume: { type: GraphQLFloat },
    avgTotalVolume: { type: GraphQLFloat },
    iexBidPrice: { type: GraphQLFloat },
    iexBidSize: { type: GraphQLFloat },
    iexAskPrice: { type: GraphQLFloat },
    iexAskSize: { type: GraphQLFloat },
    marketCap: { type: GraphQLFloat },
    peRatio: { type: GraphQLFloat },
    week52High: { type: GraphQLFloat },
    week52Low: { type: GraphQLFloat },
    ytdChange: { type: GraphQLFloat }
  })
});

//  IEX Batch Type : This just gives an easy way to access all required data in one api call
const IEXBatchType = new GraphQLObjectType({
  name: "IEXBatch",
  fields: () => ({
    quote: { type: IEXQuoteType },
    company: { type: IEXCompanyType },
    logo: { type: IEXLogoType }
  })
});

//  Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    company: {
      type: IEXCompanyType,
      args: {
        symbol: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.iextrading.com/1.0/stock/${args.symbol}/company`)
          .then(res => res.data);
      }
    },
    symbols: {
      type: new GraphQLList(IEXSymbolType),
      resolve(parent, args) {
        return axios
          .get("https://api.iextrading.com/1.0/ref-data/symbols") //  substiture this api call with the one of your choice that would return list of symbols
          .then(res => res.data);
      }
    },
    quote: {
      type: IEXQuoteType,
      args: {
        symbol: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.iextrading.com/1.0/stock/${args.symbol}/quote`)
          .then(res => res.data);
      }
    },
    batch: {
      type: IEXBatchType,
      args: {
        symbol: { type: GraphQLString }
      },
      resolve(parent, args) {
        return (
          axios
            //  add more types to get other details for a symbol
            .get(
              `https://api.iextrading.com/1.0/stock/${
                args.symbol
              }/batch?types=quote,company,logo`
            )
            .then(res => res.data)
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
