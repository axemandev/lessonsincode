import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRequestsComponent } from './web-requests.component';

describe('WebRequestsComponent', () => {
  let component: WebRequestsComponent;
  let fixture: ComponentFixture<WebRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
