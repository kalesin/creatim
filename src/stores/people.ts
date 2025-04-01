import { defineStore } from 'pinia';
import type { PeopleApiResponse, Person, DisplayedIds } from './types.d.ts';
import { generateAdditionalPeopleData } from '@/utils/helpers.js';

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
      const cachedPeople = localStorage.getItem('people')
      const cachedDisplayedPeople = localStorage.getItem('displayed_people')

      if(cachedDisplayedPeople) {
        this.displayedIds = JSON.parse(cachedDisplayedPeople)
      }

      if(cachedPeople) {
        this.people = JSON.parse(cachedPeople)
        this.loading = false;

        return
      }

      let response = await this.fetchSinglePage(this.baseUrl);

      while (response.next) {
        response = await this.fetchSinglePage(response.next);
      }

      this.people = generateAdditionalPeopleData(this.people);
      this.loading = false;

      localStorage.setItem('people', JSON.stringify(this.people))

      console.log(this.people);
    },
    setDisplayedPerson(position: 'left' | 'middle' | 'right', person: Person) {
      this.displayedIds[position] = person.id;
      localStorage.setItem('displayed_people', JSON.stringify(this.displayedIds))
    },
    updatePerson(updatedPerson: Person) {
      const index = this.people.findIndex((person: Person) => person.id === updatedPerson.id);

      if (index !== -1) {
        this.people[index] = updatedPerson;
      }

      localStorage.setItem('people', JSON.stringify(this.people))
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
