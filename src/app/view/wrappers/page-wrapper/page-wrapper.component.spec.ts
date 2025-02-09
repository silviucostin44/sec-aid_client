import {TestBed} from '@angular/core/testing';

import {PageWrapperComponent} from './page-wrapper.component';

describe('PageWrapperComponent', () => {
  let component: PageWrapperComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        PageWrapperComponent,
      ]
    });
    component = TestBed.inject(PageWrapperComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('primary action', () => {
    component.primaryAction.subscribe(() => expect().nothing());
    component.triggerPrimaryAction();
  });

  it('secondary action', () => {
    component.secondaryAction.subscribe(() => expect().nothing());
    component.triggerSecondaryAction();
  });
});
