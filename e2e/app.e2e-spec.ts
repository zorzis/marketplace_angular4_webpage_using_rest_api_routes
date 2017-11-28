import { MarketPlaceAngular4Public } from './app.po';

describe('marketplace-angular4-public-webpage App', () => {
  let page: MarketPlaceAngular4Public ;

  beforeEach(() => {
    page = new MarketPlaceAngular4Public ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
