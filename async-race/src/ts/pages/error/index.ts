import Page from '../../core/templates/page';
import ErrorTypes from '../../constants/errorTypes';

class Error extends Page {
  private static text: { [key: string]: string } = {
    404: 'Error: Page not found.',
  };

  constructor(errorType: ErrorTypes) {
    super();
    const title: HTMLElement = Error.createTitle(Error.text[errorType]);
    this.container.append(title);
  }
}

export default Error;
