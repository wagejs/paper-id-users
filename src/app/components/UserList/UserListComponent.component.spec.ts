import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListComponent } from './UserListComponent.component';
import { UserListRowComponent } from '../UserListRowComponent/UserListRowComponent.component';
import { User } from '../../shared/models/user.model';
import { userStub } from '../../shared/stubs/user';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  
  const mockUsers: User[] = [
    userStub,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent, 
        UserListRowComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    component.users = mockUsers;
    component.headers = ['ID', 'Name', 'Email', 'Website', 'Actions'];
    fixture.detectChanges();
  });

  it('should render the component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table headers correctly', () => {
    const headerElements = fixture.debugElement.queryAll(
      By.css('th')
    );
    
    expect(headerElements.length).toBe(5);
    expect(headerElements[0].nativeElement.textContent.trim()).toBe('ID');
    expect(headerElements[1].nativeElement.textContent.trim()).toBe('Name');
    expect(headerElements[2].nativeElement.textContent.trim()).toBe('Email');
    expect(headerElements[3].nativeElement.textContent.trim()).toBe('Website');
    expect(headerElements[4].nativeElement.textContent.trim()).toBe('Actions');
  });

  it('should render user rows for each user', () => {
    const userRows = fixture.debugElement.queryAll(
      By.css('[data-test-id^="user-list-row-"]')
    );
    
    expect(userRows.length).toBe(mockUsers.length);
  });

  it('should pass correct props to UserListRowComponent', () => {
    const firstUserRow = fixture.debugElement.query(
      By.directive(UserListRowComponent)
    );
    
    const rowComponent = firstUserRow.componentInstance;
    expect(rowComponent.id).toBe(mockUsers[0].id.toString());
    expect(rowComponent.name).toBe(mockUsers[0].name);
    expect(rowComponent.email).toBe(mockUsers[0].email);
    expect(rowComponent.website).toBe(mockUsers[0].website);
  });

  it('should not render tbody when users array is empty', () => {
    component.users = [];
    fixture.detectChanges();
    
    const tbody = fixture.debugElement.query(
      By.css('[data-test-id="user-list-body"]')
    );
    expect(tbody).toBeNull();
  });

  it('should render container and table with correct test ids', () => {
    const container = fixture.debugElement.query(
      By.css('[data-test-id="user-list-container"]')
    );
    const table = fixture.debugElement.query(
      By.css('[data-test-id="user-list-table"]')
    );
    
    expect(container).toBeTruthy();
    expect(table).toBeTruthy();
  });
});
