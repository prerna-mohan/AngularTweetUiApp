//import { ActivatedRoute, Router} from "@angular/router";
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { RouterTestingModule } from '@angular/router/testing';
//import { ProfileComponent } from "./profile.component";
//import { LoginService } from "../services/login.service";


//describe('Component: Profile', () => {
//  let component: ProfileComponent;
//  let fixture: ComponentFixture<ProfileComponent>;

//  const activatedRouteMock = {
//    snapshot: {
//      data: {
//        importantData: {
//          content: 'Really Important String',
//        },
//      },
//      params: { id: 'R-800' }
//    },
//  };

//  let MockRouter = {
//    navigate: jasmine.createSpy('navigate')
//  }

//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      imports: [RouterTestingModule],
//      declarations: [ProfileComponent],
//      providers: [{ provide: Router, useValue: MockRouter }, { provide: ActivatedRoute, useValue: activatedRouteMock }, LoginService]
//    })
//      .compileComponents();
//  }));

//  beforeEach(() => {
//    fixture = TestBed.createComponent(ProfileComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });

//});

