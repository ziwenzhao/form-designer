/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormcanvasComponent } from './formcanvas.component';

describe('FormcanvasComponent', () => {
  let component: FormcanvasComponent;
  let fixture: ComponentFixture<FormcanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
