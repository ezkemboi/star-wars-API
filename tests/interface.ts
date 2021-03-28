/**
 * Interfaces used by tests
 */
export interface HomeWorldInterface {
  residents: Array<string>,
  name: string,
  diameter: string,
  films: Array<string>,
  rotation_period: string,
  orbital_period: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
}

export interface PersonInterface {
  name: string
  height: string
  mass: string
  gender: string
  homeworld: string
}

export interface PeopleInterface {
  people: Array<PersonInterface>,
  count: number
}