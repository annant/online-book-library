import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RangeType } from './app.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set the default value for filter criteria if previous state is not saved', () => {
    spyOn(app, 'setFilterCriteria').and.callThrough();
    app.ngOnInit();
    expect(app.setFilterCriteria).toHaveBeenCalled();
    expect(app.filterCriteria).toEqual({
      authors: [],
      books: [],
      pageCount: null,
      publishDate: null,
      pageCountRangeType: RangeType.equal
    })
  });

  it('should set the value for filter criteria with previous saved filter state', () => {
    spyOn(app, 'resetFilterCriteria').and.callThrough();
    const previousFilterState = {
      authors: ['author1', 'author3'],
      books: [],
      pageCount: 50,
      publishDate: null,
      pageCountRangeType: RangeType.equal
    }
    sessionStorage.setItem('filterCriteria', JSON.stringify({...previousFilterState, searchText: 'book2'}));
    app.setFilterCriteria();
    expect(app.filterCriteria).toEqual(previousFilterState);
    expect(app.searchText).toEqual('book2');
    expect(app.resetFilterCriteria).not.toHaveBeenCalled();
  });
});
