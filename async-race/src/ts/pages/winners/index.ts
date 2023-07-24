import Page from '../../core/templates/page';

class Winners extends Page {
  private static text: { [key: string]: string } = {
    title: 'Winners',
  };

  constructor() {
    super();
    this.container.append(Winners.createTitle(Winners.text.title));
  }
}

export default Winners;
