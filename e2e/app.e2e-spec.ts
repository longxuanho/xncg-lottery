import { XncgLotteryPage } from './app.po';

describe('xncg-lottery App', function() {
  let page: XncgLotteryPage;

  beforeEach(() => {
    page = new XncgLotteryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
