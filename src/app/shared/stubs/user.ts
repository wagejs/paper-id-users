import { User } from "../models/user.model";

export const userStub: User = {
  id: 1,
  name: 'Test User 1',
  email: 'test1@example.com',
  website: 'test1.com',
  phone: '123-456-7890',
  username: 'testuser1',
  address: {
    street: 'Test St',
    suite: '123',
    city: 'Test City',
    zipcode: '12345',
    geo: { lat: '0', lng: '0' }
  },
  company: {
    name: 'Test Company',
    catchPhrase: 'Test Phrase',
    bs: 'Test BS'
  }
};
