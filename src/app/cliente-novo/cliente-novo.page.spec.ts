import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteNovoPage } from './cliente-novo.page';

describe('ClienteNovoPage', () => {
  let component: ClienteNovoPage;
  let fixture: ComponentFixture<ClienteNovoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteNovoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteNovoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
