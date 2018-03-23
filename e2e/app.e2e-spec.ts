import { AngularFormDesignerPage } from './app.po';

describe('angular-form-designer App', function() {
  let page: AngularFormDesignerPage;

  beforeEach(() => {
    page = new AngularFormDesignerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
