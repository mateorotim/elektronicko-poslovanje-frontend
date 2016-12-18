import { EpAngularPage } from './app.po';

describe('ep-angular App', function() {
  let page: EpAngularPage;

  beforeEach(() => {
    page = new EpAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
