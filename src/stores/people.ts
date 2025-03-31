import { defineStore } from 'pinia';
import type { PeopleApiResponse, Person } from './types.d.ts';

export type RootState = {
  baseUrl: string
  peopleArray: Person[]
  peopleToDisplay: Person[]
  loading: Boolean
};

export const usePeopleStore = defineStore('people', {
  state: (): RootState => {
    return {
      baseUrl: 'https://swapi.dev/api/people',
      peopleArray: [],
      peopleToDisplay: [],
      loading: true
    };
  },
  actions: {
    async fetchSinglePage(url: string) {
      const response = await fetch(url);
      const people: PeopleApiResponse = await response.json();

      this.peopleArray.push(...people.results);

      return people;
    },
    async fetchAllPages() {
      let response = await this.fetchSinglePage(this.baseUrl);

      while(response.next) {
        response = await this.fetchSinglePage(response.next)
      }

      this.loading = false
      console.log(this.peopleArray)
    },
  },
  getters: {
    displayedPeople() {
      return this.peopleArray.filter((el: Person) => ["Yoda", "Darth Vader", "Obi-Wan Kenobi"].includes(el.name))
    }
  }
});
