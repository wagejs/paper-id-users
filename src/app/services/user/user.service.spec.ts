import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../shared/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = "https://jsonplaceholder.typicode.com";

  // Mock user data for testing
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'John',
    username: 'johndoe',
    address: {
      street: '123 Main St',
      suite: 'Apt 456',
      city: 'Anytown',
      zipcode: '12345',
      geo: {
        lat: '123',
        lng: '456'
      }
    },
    phone: '1234567890',
    website: 'https://example.com',
    company: {
      name: 'Example Inc.',
      catchPhrase: 'Example catch phrase',
      bs: 'Example bs'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should retrieve a user by id', () => {
      service.getUserById(1).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${apiUrl}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should handle errors when user is not found', () => {
      service.getUserById(999).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/users/999`);
      req.flush('User not found', {
        status: 404,
        statusText: 'Not Found'
      });
    });
  });

  describe('getUsers', () => {
    it('should retrieve all users', () => {
      const mockUsers = [mockUser, { ...mockUser, id: 2, email: 'jane@example.com' }];

      service.getUsers().subscribe(users => {
        expect(users).toEqual([mockUser, { ...mockUser, id: 2, email: 'jane@example.com' }]);
        expect(users.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });
});
