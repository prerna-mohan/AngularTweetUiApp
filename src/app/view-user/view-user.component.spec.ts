//import { ActivatedRoute, Router } from "@angular/router";
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { RouterTestingModule } from '@angular/router/testing';
//import { ViewUserComponent } from "./view-user.component";
//import { LoginService } from "../services/login.service";


//describe('Component: ViewUser', () => {
//  let component: ViewUserComponent;
//  let fixture: ComponentFixture<ViewUserComponent>;

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
//      declarations: [ViewUserComponent],
//      providers: [{ provide: Router, useValue: MockRouter }, { provide: ActivatedRoute, useValue: activatedRouteMock }, LoginService]
//    })
//      .compileComponents();
//  }));

//  beforeEach(() => {
//    fixture = TestBed.createComponent(ViewUserComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });

//});

