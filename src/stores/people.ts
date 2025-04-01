import { defineStore } from 'pinia';
import type { PeopleApiResponse, Person, DisplayedPeople, DisplayedIds } from './types.d.ts';
import { generateAdditionalPeopleData } from '@/utils/helpers.js';
import { cachedFetch } from '@/utils/apiCache';

export type RootState = {
  baseUrl: string;
  people: Person[];
  displayedIds: DisplayedIds;
  loading: Boolean;
};

export const usePeopleStore = defineStore('people', {
  state: (): RootState => {
    return {
      baseUrl: 'https://swapi.dev/api/people',
      people: [],
      displayedIds: {
        left: '1',
        middle: '2',
        right: '3',
      },
      loading: true,
    };
  },
  actions: {
    async fetchSinglePage(url: string) {
      const response = await fetch(url);
      const people: PeopleApiResponse = await response.json();

      this.people.push(...people.results);

      return people;
    },
    async fetchAllPages() {
      let response = await this.fetchSinglePage(this.baseUrl);

      while (response.next) {
        response = await this.fetchSinglePage(response.next);
      }

      this.people = generateAdditionalPeopleData(this.people);

      this.loading = false;
      console.log(this.people);
    },
    setDisplayedPerson(position: 'left' | 'middle' | 'right', person: Person) {
      this.displayedPeople[position] = person;
    },
    updatePerson(updatedPerson: Person) {
      const index = this.people.findIndex((person: Person) => person.id === updatedPerson.id);

      console.log(this.people[index])
      if (index !== -1) {
        this.people[index] = updatedPerson;
      }
      console.log(this.people[index])
    },
  },
  getters: {
    isLoading() {
      return this.loading;
    },
    displayedPeople() {
      return {
        left: this.people.find((person: Person) => person.id===this.displayedIds.left),
        middle: this.people.find((person: Person) => person.id===this.displayedIds.middle),
        right: this.people.find((person: Person) => person.id===this.displayedIds.right),
      }
    }
  },
});
