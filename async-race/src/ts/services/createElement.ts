interface Attribute {
  name: string,
  value: string,
}

interface Data {
  tag: string;
  id?: string;
  classes?: string[];
  attrs?: Attribute[];
}

export default ({
  tag, id, classes, attrs,
}: Data): HTMLElement => {
  const element: HTMLElement = document.createElement(tag);
  if (id?.length) {
    element.id = id;
  }
  function addClass(className: string): void {
    if (className.length) {
      element.classList.add(className);
    }
  }
  if (classes?.length) {
    classes.forEach(addClass);
  }
  if (attrs?.length) {
    const setAttrs = (attr: Attribute): void => {
      const { name, value } = attr;
      element.setAttribute(name, value);
    };
    attrs.forEach(setAttrs);
  }
  return element;
};
