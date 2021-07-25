import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { projectDetails } from './project-details';

describe('workspace-project App', () => {
  let page: AppPage;
  let project: projectDetails;

  beforeEach(() => {
    page = new AppPage();
    project = new projectDetails();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('taskboard app is running!');
  });

  it('should display backlog column title', () => {
    project.navigateTo();
    expect(project.getColumnTitlesText()).toEqual('Backlog');
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
