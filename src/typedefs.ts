import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getPeople(page: Int!): People,
    getPeopleByName(name: String!): [Person!],
    getUserHomeWorld(homeWorldUrl: String!): HomeWorld!
  }
  type People {
    people: [Person!]
    count: Int!
  }
  type Person {
    name: String!
    height: String!
    mass: String!
    gender: String!
    homeworld: String!
  }
  type HomeWorld {
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: String
    residents: [String]
    films: [String]
  }
`
