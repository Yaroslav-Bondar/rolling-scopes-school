interface Attribute {
  name: string;
  value: string;
}

interface Data<ElementType> {
  tag?: ElementType;
  id?: string;
  classes?: string[];
  attrs?: Attribute[];
}

export function createElement<ElementType extends HTMLElement = HTMLDivElement>(
  data?: Data<ElementType>,
): ElementType;
export function createElement<ElementType extends keyof HTMLElementTagNameMap>(
  data: Data<ElementType>,
): HTMLElementTagNameMap[ElementType];
export function createElement<ElementType extends keyof SVGElementTagNameMap>(
  data: Data<ElementType>,
): SVGElementTagNameMap[ElementType];
export function createElement<ElementType extends string>(data: Data<ElementType>): HTMLElement;

export function createElement(data: Data<any> = {}): any {
  const { tag, id, classes, attrs } = data;
  const element = document.createElement(tag || 'div');
  if (id) element.id = id;
  if (classes) element.classList.add(...classes);
  if (attrs?.length) {
    const setAttrs = (attr: Attribute) => {
      const { name, value } = attr;
      element.setAttribute(name, value);
    };
    attrs.forEach(setAttrs);
  }
  return element;
}
