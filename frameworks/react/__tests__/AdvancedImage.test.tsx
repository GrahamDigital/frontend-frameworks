import { AdvancedImage } from '../src'
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import { mount } from 'enzyme';
import React from 'react';
import { ACCESSIBILITY_MODES } from '../../html/src/utils/internalConstnats';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo' });

describe('AdvancedImage', () => {
  it('is truthy', () => {
    expect(AdvancedImage).toBeTruthy()
  });

  it('renders AdvancedImage', async () => {
    const component = await mount(<AdvancedImage cldImg={cloudinaryImage} />);
    expect(component).toMatchSnapshot();
  });

  it('should create an img tag', async function() {
    const component = await mount(<AdvancedImage cldImg={cloudinaryImage} />);
    expect(component.html()).toBe('<img src="https://res.cloudinary.com/demo/image/upload/sample">');
  });

  it('should add style to img component', async function() {
    const component = await mount(<AdvancedImage style={{ opacity: '0.5' }} cldImg={cloudinaryImage} />);
    expect(component.find('img').prop('style')).toStrictEqual({ opacity: '0.5' });
  });

  it('should resolve with a cancel on unmount', function() {
    const component = mount(
      <AdvancedImage
        cldImg={cloudinaryImage}
        plugins={[(_element: HTMLImageElement, _cldImage: CloudinaryImage, htmlPluginState: any) => {
          return new Promise((resolve) => {
            htmlPluginState.cleanupCallbacks.push(() => {
              resolve('canceled');
            });
          }).then((res) => {
            expect(res).toBe('canceled')
          });
        }]}
      />);

    component.unmount();
  });

  it('componentDidUpdate should trigger plugin rerun', function() {
    const mock = jest.fn();
    const component = mount(<AdvancedImage cldImg={cloudinaryImage} plugins={[mock]} />);

    // trigger componentDidUpdate
    component.setProps('');

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
