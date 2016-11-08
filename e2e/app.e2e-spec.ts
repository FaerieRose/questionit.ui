import { QuestionitUiPage } from './app.po';

describe('questionit-ui App', function() {
  let page: QuestionitUiPage;

  beforeEach(() => {
    page = new QuestionitUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
