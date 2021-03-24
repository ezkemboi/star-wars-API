import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getPeople(page: Int!): [Person!],
    getPerson(name: String!): Person!
  }
  type Person {
    name: String!
    height: String!
    mass: String!
    gender: String!
    homeworld: String!
  }
`