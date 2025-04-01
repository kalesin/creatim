import { Person } from '@/stores/types';

export function generateAdditionalPeopleData(people: Person[]): Person[] {
  return people.map((person) => {
    const id = extractIdFromUrl(person.url);

    return {
      ...person,
      id: id,
      image: `src/assets/people/${id}.jpg`,
    };
  });
}

export function extractIdFromUrl(url: string): string {
  // Remove trailing slashes, then split
  const trimmedUrl = url.replace(/\/+$/, '');
  const parts = trimmedUrl.split('/');
  return parts.pop() || ''; // Safely get the last part
}

export function deepClone<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    console.warn('Deep clone failed, falling back to shallow copy');
    return { ...obj };
  }
};
