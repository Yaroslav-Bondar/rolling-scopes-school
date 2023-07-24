import Page from '../../core/templates/page';

class Garage extends Page {
  private static text: { [key: string]: string } = {
    title: 'Garage',
  };

  constructor() {
    super();
    this.container.append(Garage.createTitle(Garage.text.title));
  }
}

export default Garage;
