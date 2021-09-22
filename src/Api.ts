import axios, { AxiosResponse } from 'axios';

// interfaces
import { SignParamsInterface } from "./interfaces/signParams.interface";
import { Journal } from "./interfaces/journal.interface";
import { Entry } from "./interfaces/entry.interface";

interface ApiPattern {
  readonly baseUrl: string;
  registerUser: (userValues: SignParamsInterface) => {},
  login: (userValues: SignParamsInterface) => {},
  createJournal: (journalValues: Journal) => {},
  getJournals: (userId: string) => {},
  createNote: (entryValues: Entry) => {},
  getNotes: (journalId: string) => {},
  updateNote: (entryValues: Entry) => {},
}

class MainApi implements ApiPattern {
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://fakeapi.test';
  }

  async registerUser(userValues: SignParamsInterface) {
    const url = this.baseUrl + '/auth/signup';
    const response: AxiosResponse = await axios.post(url, userValues);

    return response.data;
  }

  async login(userValues: SignParamsInterface) {
    const url = this.baseUrl + '/auth/login';
    const response = await axios.post(url, userValues);

    return response.data;
  }

  async createJournal(journalValues: Journal) {
    const url = this.baseUrl + '/journals/';
    const response = await axios.post(url, journalValues);

    return response.data;
  }

  async getJournals(userId: string) {
    const url = this.baseUrl + '/journals/' + userId;
    const response = await axios.get(url);

    return response.data;
  }

  async createNote(entryValues: Entry) {
    const url = this.baseUrl + '/journals/entry/' + entryValues.journalId;
    const response = await axios.post(url, entryValues);

    return response.data;
  }

  async getNotes(journalId: string) {
    const url = this.baseUrl + '/journals/entries/' + journalId;
    const response = await axios.get(url);

    return response.data;
  }

  async updateNote(entryValues: Entry) {
    const url = this.baseUrl + '/journals/entry/' + entryValues.id;
    const response = await axios.put(url, entryValues);

    return response.data;
  }
}

const Api = new MainApi();

export { Api };