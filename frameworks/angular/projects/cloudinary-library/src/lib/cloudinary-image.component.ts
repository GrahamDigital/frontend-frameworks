import {Component, OnInit, Input, ElementRef, OnDestroy, OnChanges} from '@angular/core';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {
  HtmlLayer,
  plugins
} from '@cloudinary/html';

/**
 * @mixin AngularSDK
 * @description The Coudinday Angular SDK contains components like <advanced-image> to easily render your media assets from
 * Cloudinary. The SDK also comes with support for optional js plugins that make the components smart, with features
 * like lazy loading, placeholder, accessibility & responsiveness
 *
 * @example
 * <caption>
 *  Please note that the order of the plugins is important. See home for more details.
 * </caption>
 * // In your app.module.ts inject the library
 * import { CloudinaryModule} from '@cloudinary/angular';
 *
 * imports: [
 *   ...,
 *   CloudinaryModule,
 * ],
 *
 * // In your component.ts use `@cloudinary/base` to generate your transformations
 * // Import the plugins you wish to use
 *
 * import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
 * import {
 *  AdvancedImage,
 *  accessibility,
 *  responsive,
 *  lazyload,
 *  placeholder
 * } from '@cloudinary/angular';
 *
 * ngOnInit() {
 *   this.img = new CloudinaryImage().setConfig({
 *       cloud: {
 *         cloudName: 'demo'
 *       }
 *     })
 *     .setPublicID('sample');
 *
 *   this.plugins = [lazyload(), placeholder()]
 * }
 *
 * // In your view add the component with your transformation
 * <advanced-image [cldImg]="this.img" [plugins]="this.plugins"></cld-img>
 */

/**
 * @memberOf AngularSDK
 * @type {Component}
 * @description The Cloudinary image component
 * @prop {CloudinaryImage} transformation Generated by @cloudinary/base
 * @prop {plugins} plugins Advanced image component plugins accessibility(), responsive(), lazyload(), placeholder()
 */
@Component({
  selector: 'advanced-image',
  template: `
    <img />
  `,
  styleUrls: ['./cloudinary-image.component.css']
})
export class CloudinaryImageComponent implements OnInit, OnChanges, OnDestroy{
  @Input('cldImg') cldImg: CloudinaryImage;
  @Input('plugins') plugins: plugins;
  htmlLayerInstance: HtmlLayer;
  constructor(private el: ElementRef) { }

  /**
   * On init creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  ngOnInit() {
    this.htmlLayerInstance = new HtmlLayer(this.el.nativeElement.children[0], this.cldImg, this.plugins);
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * cloudinaryImage and the state of plugins
   */
  ngOnChanges() {
    if (this.htmlLayerInstance) {
      this.htmlLayerInstance.cancelCurrentlyRunningPlugins();
      this.htmlLayerInstance.update(this.cldImg, this.plugins);
    }
  }

  /**
   * On destroy we cancel the currently running plugins
   */
  ngOnDestroy() {
    // safely cancel running events on destroy
    this.htmlLayerInstance.cancelCurrentlyRunningPlugins();
  }
}
