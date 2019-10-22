import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { ProfileComponent } from './profile.component';
import { UserService } from '../shared/user.service';
import { validUser } from 'src/mock';

const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserObj']);


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [ 
        ProfileComponent 
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.userInfo).toBeUndefined();
  });

  it('should display user profile', () => {
    component.userInfo = validUser;
    expect(component.userInfo.picture).toBeDefined();
    expect(component.userInfo.name).toBeDefined();
    expect(component.userInfo.gender).toBeDefined();
    expect(component.userInfo.dob).toBeDefined();
    expect(component.userInfo.email).toBeDefined();
    expect(component.userInfo.phone).toBeDefined();
    expect(component.userInfo.location).toBeDefined();
  });
});
