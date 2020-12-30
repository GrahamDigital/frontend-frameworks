import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from "../lib/cloudinary-image.component";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {placeholder} from "../public_api";
import  {PLACEHOLDER_IMAGE_OPTIONS} from '../../../../../html/src/internalConstnats';

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('placeholder', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  it('should apply default', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));

  it('should apply vectorize', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder('vectorize')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));

  it('should apply pixelate', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder('pixelate')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample`)
  }));

  it('should apply blur', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder('blur')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample`)
  }));

  it('should apply predominant-color', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder('predominant-color')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS["predominant-color"]}/sample`)
  }));

  it('should default if supplied with incorrect mode', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [placeholder('ddd')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));
});
