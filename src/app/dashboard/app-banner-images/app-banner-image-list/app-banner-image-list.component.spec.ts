import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppBannerImageListComponent } from './app-banner-image-list.component';


describe('ProductImageListComponent', () => {
  let component: AppBannerImageListComponent;
  let fixture: ComponentFixture<AppBannerImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBannerImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBannerImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
