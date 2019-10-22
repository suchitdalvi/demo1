import { SigninPage } from './signin.po';
describe('Signin page', () => {
  let page: SigninPage;

  beforeEach(() => {
    page = new SigninPage();
    page.navigateTo();
  });

  it('Login form should be invalid and show errors when both field are blank', () => {
    page.getUsernameTextbox().sendKeys('');
    page.getPasswordTextbox().sendKeys('');
    page.getSubmitButton().click();

    let form = page.getForm().getAttribute('class');

    expect(form).toContain('ng-invalid');
    expect(page.getUsernameErrorMsg().getText()).toContain('Please enter username');
    expect(page.getPasswordErrorMsg().getText()).toContain('Please enter password');
  });

  it('Display Username Error when Username is blank', () => {
    page.getUsernameTextbox().sendKeys('');
    page.getPasswordTextbox().sendKeys('test');
    page.getSubmitButton().click();

    expect(page.getUsernameErrorMsg().getText()).toContain('Please enter username');
  });

  it('Display Password Error when Password is blank', () => {
    page.getUsernameTextbox().sendKeys('test');
    page.getPasswordTextbox().sendKeys('');
    page.getSubmitButton().click();

    expect(page.getPasswordErrorMsg().getText()).toContain('Please enter password');
  });

  it('When username is blank, username field should display red outline ', () => {
    page.getUsernameTextbox().sendKeys('');
    page.getPasswordTextbox().sendKeys('test');
    page.getSubmitButton().click();

    let matFormField = page.getMatFormField1().getAttribute('class');
    expect(matFormField).toContain('mat-form-field-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    page.getUsernameTextbox().sendKeys('test');
    page.getPasswordTextbox().sendKeys('');
    page.getSubmitButton().click();

    let matFormField = page.getMatFormField2().getAttribute('class');
    expect(matFormField).toContain('mat-form-field-invalid');
  });
});
