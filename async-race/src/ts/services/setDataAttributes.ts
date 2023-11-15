declare type AttributesData = Record<string, string>;

interface SetDataAttributesOptions {
  mode: SetAttributesMode;
  exceptions?: Set<string>;
}

/**
 * Set data- attributes and their values.
 * 'Write' mode writes the new value to the attribute,
 * it doesn't delete existing attributes. 'Overwrite' mode does the same thing,
 * but removes existing attributes if they aren't defined in exceptions.
 */
export default function setDataAttributes(
  this: HTMLElement,
  attributes: AttributesData,
  options: SetDataAttributesOptions = {
    mode: SetAttributesMode.Write,
  },
): void {
  const { mode, exceptions } = options;
  // TODO: Define the identification of data- attributes with greater precision.
  const isDataAttr = (attr: string): boolean => /^data-/.test(attr);
  const setAttr = (attr: string) => this.setAttribute(attr, attributes[attr]);
  const settableAttrNames: Set<string> = new Set(Object.keys(attributes).filter(isDataAttr));
  settableAttrNames.forEach(setAttr);
  if (mode === SetAttributesMode.Overwrite) {
    const dataAttrNames = Object.values(this.attributes)
      .filter(({ name }) => isDataAttr(name))
      .map(({ name }) => name);
    const removeDataAttr = (name: string) => {
      if (!settableAttrNames.has(name) && !exceptions?.has(name)) {
        this.removeAttribute(name);
      }
    };
    dataAttrNames.forEach(removeDataAttr);
  }
}
