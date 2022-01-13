import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from "micro-cors";

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_parent: any, _arg: any, _context: any) => {
      return 'Hello word!'
    }
  }
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"]
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  return await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});


export const config = {
  api: {
    bodyParser: false,
  },
};