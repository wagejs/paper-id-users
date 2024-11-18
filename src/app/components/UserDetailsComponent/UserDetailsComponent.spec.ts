import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserDetailsComponent } from './UserDetailsComponent.component';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from '../../shared/models/user.model';
import { userStub } from '../../shared/stubs/user';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should render the component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner initially', () => {
    userService.getUserById.and.returnValue(of(userStub));
    fixture.detectChanges();
    
    component.isLoading = true;
    fixture.detectChanges();

    const loadingSpinner = fixture.debugElement.query(By.css('[data-testid="loading-spinner"]'));
    expect(loadingSpinner).toBeTruthy();
  });

  it('should load and display user details', fakeAsync(() => {
    userService.getUserById.and.returnValue(of(userStub));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userName = fixture.debugElement.query(By.css('[data-testid="user-name"]'));
    const userUsername = fixture.debugElement.query(By.css('[data-testid="user-username"]'));
    
    expect(userName.nativeElement.textContent).toContain(userStub.name);
    expect(userUsername.nativeElement.textContent).toContain(userStub.username);
  }));

  it('should navigate back when back button is clicked', () => {
    userService.getUserById.and.returnValue(of(userStub));
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('[data-testid="back-button"]'));
    backButton.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display all sections of user information', fakeAsync(() => {
    userService.getUserById.and.returnValue(of(userStub));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const personalInfoSection = fixture.debugElement.query(By.css('[data-testid="personal-info-section"]'));
    const addressSection = fixture.debugElement.query(By.css('[data-testid="address-section"]'));
    const companySection = fixture.debugElement.query(By.css('[data-testid="company-section"]'));

    expect(personalInfoSection).toBeTruthy();
    expect(addressSection).toBeTruthy();
    expect(companySection).toBeTruthy();
  }));
  it('should handle null user data gracefully', fakeAsync(() => {
    userService.getUserById.and.returnValue(of({} as User));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userDetailsContent = fixture.debugElement.query(By.css('[data-testid="user-details-content"]'));
    expect(userDetailsContent).toBeTruthy(); // Component should still render without errors
  }));

  // Add more test cases as needed for error handling, edge cases, etc.
});
