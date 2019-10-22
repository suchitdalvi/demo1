import { HeaderPage } from './header.po';
describe('header page', () => {
  let page: HeaderPage;

  beforeEach(() => {
    page = new HeaderPage();
    page.navigateTo();
  });

  it('inital state of header', () => {
    expect(page.getHeaderinfo().getText()).toContain('Guest');
  });
});
