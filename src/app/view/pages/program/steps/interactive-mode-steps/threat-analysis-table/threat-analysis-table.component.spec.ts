import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreatAnalysisTableComponent} from './threat-analysis-table.component';

describe('ThreatAnalysisTableComponent', () => {
  let component: ThreatAnalysisTableComponent;
  let fixture: ComponentFixture<ThreatAnalysisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreatAnalysisTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatAnalysisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
