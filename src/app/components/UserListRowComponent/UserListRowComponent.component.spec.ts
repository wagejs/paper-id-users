import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserListRowComponent } from './UserListRowComponent.component';

describe('UserListRowComponent', () => {
  let component: UserListRowComponent;
  let fixture: ComponentFixture<UserListRowComponent>;
  let router: Router;

  // Mock router
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserListRowComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListRowComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Set up test data
    component.id = '1';
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.website = 'www.example.com';

    fixture.detectChanges();
  });

  it('should render the component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information correctly', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('[data-test-id="user-id-column"]').textContent)
      .toContain('#1');
    expect(compiled.querySelector('[data-test-id="user-name-column"]').textContent)
      .toContain('John Doe');
    expect(compiled.querySelector('[data-test-id="user-email-column"]').textContent)
      .toContain('john@example.com');
    expect(compiled.querySelector('[data-test-id="user-website-column"]').textContent)
      .toContain('www.example.com');
  });

  it('should navigate to user details when button is clicked', () => {
    const detailsButton = fixture.nativeElement.querySelector('[data-test-id="user-details-button"]');
    detailsButton.click();
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user', component.id]);
  });

  it('should display email as a link', () => {
    const emailElement = fixture.nativeElement.querySelector('[data-test-id="user-email-column"]');
    expect(emailElement.querySelector('a')).toBeTruthy();
  });
});
