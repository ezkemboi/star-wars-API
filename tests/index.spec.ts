import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import { 
  PeopleInterface, 
  PersonInterface, 
  HomeWorldInterface
} from './interface';

chai.use(chaiHttp);

describe("Main App", () => {

  let persistedUser: PersonInterface = {
    name: '',
    height: '',
    mass: '',
    gender: '',
    homeworld: ''
  };
  
  it('returns users in page 4', async () => {
    const result = await chai.request(app).post("/").send({
      query: `
        {
          getPeople(page: 4) {
            people {
              name,
              height,
              mass,
              gender,
              homeworld
            }
            count
          }
        }
      `
    });
    const { status, body } = result;
    const data: PeopleInterface = body.data.getPeople;
    const { people, count } = data;
    // persist 
    persistedUser = people[0];
    expect(status).to.be.equal(200);
    expect(data).all.keys('people', 'count');
    expect(people.length).to.be.equal(10);
    expect(count).to.be.a('number');
  })

  it('returns a single person details', async () => {
    console.log({ leta: persistedUser.name })
    const searchName = "Qui-Gon Jinn";
    const result = await chai.request(app).post("/").send({
      query: `
        {
          getPeopleByName(name:  "Qui-Gon Jinn") {
            name,
            height,
            mass,
            gender,
            homeworld
          }
        }
      `
    });
    const { status, body } = result;
    const data: Array<PersonInterface> = body.data.getPeopleByName;
    expect(status).to.be.equal(200);
    // expect(data).all.keys('people', 'count');
    expect(data).to.be.a('array');
    expect(data[0].name).to.be.equal(searchName);
  })

  it('returns homeworld details', async () => {
    const result = await chai.request(app).post("/").send({
      query: `
        {
          getUserHomeWorld(homeWorldUrl: "https://swapi.dev/api/planets/1/") {
            residents
            name
            diameter
            films
            rotation_period
            orbital_period
            climate
            gravity
            terrain
            surface_water
            population
          }
        }
      `
    });
    const { status, body } = result;
    const data: HomeWorldInterface = body.data.getUserHomeWorld;
    // console.log({ data })
    expect(status).to.be.equal(200);
    expect(data).to.be.a('object');
  })
})
