import axios from 'axios';

interface Context {
  url: string
}

interface Args {
  page: string
}

const resolvers = {
  Query: {
    getPeople: async (
      root: string, 
      args: Args, 
      context: Context, 
      info: any
    ) => {
      const people = await axios.get(`${context.url}/people/?page=${args.page}`);
      return people.data && people.data.results ? people.data.results : [];
    },
    getPerson: async (
      root: string, 
      args: {
        name: string
      }, 
      context: Context, 
      info: any
    ) => {
      const person = await axios.get(`${context.url}/people/?search=${args.name}`);
      return person.data && person.data.results ? person.data.results[0] : {};
    }
  }
}

export default resolvers