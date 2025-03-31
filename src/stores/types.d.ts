export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: 'male' | 'female' | 'n/a' | 'hermaphrodite' | string; // SWAPI's known values
  homeworld: string; // URL
  films: string[]; // Array of URLs
  species: string[]; // Array of URLs
  vehicles: string[]; // Array of URLs
  starships: string[]; // Array of URLs
  created: string; // ISO 8601 date format
  edited: string; // ISO 8601 date format
  url: string; // Unique resource URL
}

export interface PeopleApiResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Person[];
}
