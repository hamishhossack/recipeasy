import Component from './component';

import testRenderTpl from '../__tests__/mocks/mock-test-render.hbs';
import testContextRenderTpl from '../__tests__/mocks/mock-context-render.hbs';

let component;

describe('Component', () => {

  beforeEach(() => {
    component = new Component();
  });

  describe('Sanity check', () => {

    it('should have an empty name', () => {
      expect(component.name).toBeNull();
    });

    it('should have an empty tpl', () => {
      expect(component.tpl).toBeNull();
    });

    it('should have an empty context', () => {
      expect(component.context).toBeNull();
    });

  });

  describe('Compilation', () => {

    it('should not compile without tpl', () => {
      expect(() => component.compile).toThrow(new Error(`No template defined`));
    });

    it('should not render without tpl', () => {
      expect(() => component.render()).toThrow(new Error(`No component found for component name "<${component.name}>"`));
    });

    it('should render and compile a template', () => {
      component.tpl = testRenderTpl;
      expect(component.compile).toEqual(testRenderTpl());
    });

    it('should render and compile a template with context', () => {
      component.tpl = testContextRenderTpl;
      component.context = { contextTest: 'testing' };

      expect(component.compile.indexOf('testing') > -1).toBeTruthy();
    });

  });

  describe('Element', () => {

    // TODO (hamish): Init karma and run element testing

  });

  describe('Destroy', () => {

    // TODO (hamish): Make sure events are clean, Make sure element is removed

  });

});