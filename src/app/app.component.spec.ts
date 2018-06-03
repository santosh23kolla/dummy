import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ServicecustomService } from './servicecustom/servicecustom.service';
import { EventEmitter } from '@angular/core/src/event_emitter';
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule,
      ],
      providers: [
        ServicecustomService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', inject([ServicecustomService], (serviceRef: ServicecustomService) => {
    serviceRef.login = jasmine.createSpy('login').and.returnValue(null);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    expect(serviceRef.login).toHaveBeenCalled();
  }));

  it('getData should call a response', async(inject([ServicecustomService], (serviceRef: ServicecustomService) => {
    spyOn(console, 'log');
    const data: any = [{
      'userId': 1,
      'id': 1,
      'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      // tslint:disable-next-line:max-line-length
      'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }];
    const promise: Observable<any> = Observable.create((observer) => { observer.next(data); observer.complete(); });
    serviceRef.getData = jasmine.createSpy('getData').and.returnValue(promise);
    spyOn(serviceRef.customEvent, 'emit');
    fixture.detectChanges();
    app.getData();
    expect(serviceRef.getData).toHaveBeenCalled();
    promise.subscribe(() => {
      expect(console.log).toHaveBeenCalledWith(data);
      expect(app.serviceData.userId).toBe(data.userId);
      expect(serviceRef.customEvent.emit).toHaveBeenCalled();
    });
  })));
  it('getData should call a response', async(inject([ServicecustomService], (serviceRef: ServicecustomService) => {
    spyOn(console, 'log');
    const data: any = [{
      'userId': 2,
      'id': 1,
      'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      // tslint:disable-next-line:max-line-length
      'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }];
    const promise: Observable<any> = Observable.create((observer) => { observer.next(data); observer.complete(); });
    serviceRef.getData = jasmine.createSpy('getData').and.returnValue(promise);
    app.getData();
    expect(serviceRef.getData).toHaveBeenCalled();
    promise.subscribe(() => {
      expect(console.log).toHaveBeenCalledWith(data);
      expect(app.serviceData.userId).toBe(data.userId);
    });
  })));
});
