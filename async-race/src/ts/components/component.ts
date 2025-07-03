type TypeElement = HTMLElementTagNameMap & SVGElementTagNameMap;
type ElementType<
  T extends keyof TypeElement | Element,
  S extends keyof TypeElement | string,
> = S extends keyof TypeElement
  ? T extends keyof TypeElement
    ? TypeElement[S] extends TypeElement[T]
      ? TypeElement[S]
      : never
    : TypeElement[S]
  : T extends keyof TypeElement
    ? TypeElement[T]
    : T;

class Component extends HTMLElement {
  constructor(shadowRootMode: 'closed' | 'open' = 'open') {
    super();
    this.attachShadow({ mode: shadowRootMode });
  }

  protected get shadowDom() {
    if (!this.shadowRoot) throw new Error('The shadow root is not attached');
    return this.shadowRoot;
  }

  /**
   * We use currying here to infer the right type of the returned element.
   * See this topic to get more information.
   * https://stackoverflow.com/questions/79512738/to-get-a-string-literal-type-of-a-function-parameter
   * Some test cases to better understand:
   * const elem = this.getElement<'a'>()('.some__selector');
   * const elem1 = this.getElement()('.some__selector');
   * const elem3 = this.getElement()('a');
   * const elem4 = this.getElement<'button'>()('a');
   * const elem5 = this.getElement<'a'>()('button');
   * const elem6 = this.getElement<'a'>()('a');
   * const elem7 = this.getElement<'div'>()('adfd');
   * const elem8 = this.getElement<Element>()('button');
   * const elem9 = this.getElement<'svg'>()('svg');
   * const elem10 = this.getElement<'div'>()('svgdf');
   * const elem11 = this.getElement()('x-user');
   * const elem12 = this.getElement()('template');
   * const elem13 = this.getElement()('style');
   */

  protected getElement<T extends keyof TypeElement | Element = Element>(
    source: Document | DocumentFragment | Element = this.shadowDom,
  ) {
    return <S extends keyof TypeElement | string>(selector: S) => {
      const element = source?.querySelector(`${selector}`);
      if (!element) throw new Error('Element not found.');
      return element as ElementType<T, S>;
    };
  }
}

export { Component };
