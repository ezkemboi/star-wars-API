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
      const result = await axios.get(`${context.url}/people/?page=${args.page}`);
      let response = {
        people:  [Object],
        count: Number
      }
      if(result.data && result.data.results) {
        response.people = result.data.results;
        response.count = result.data.count
      }
      return response;
    },
    getPeopleByName: async (
      root: string, 
      args: {
        name: string
      }, 
      context: Context, 
      info: any
    ) => {
      const result = await axios.get(`${context.url}/people/?search=${args.name}`);
      return result.data && result.data.results ? result.data.results : [];
    },
    getUserHomeWorld: async (
      root: string, 
      args: {
        homeWorldUrl: string
      }, 
      context: Context, 
      info: any
    ) => {
      // need validation
      const result = await axios.get(args.homeWorldUrl);
      return result.data;
    }
  }
}

export default resolvers