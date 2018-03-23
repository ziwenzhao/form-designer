/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsettingComponent } from './formsetting.component';

describe('FormsettingComponent', () => {
  let component: FormsettingComponent;
  let fixture: ComponentFixture<FormsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
