type Value = number | string;
type Enum = Record<string, Value>;

/**
 * Check if a value exists in the enumeration. This excludes the values
 * that come from the reverse mapping.
 */
export default (value: Value, enumeration: Enum): boolean => {
  // Filter values from reverse mapping.
  const filterReverseMapping = (key: string): boolean => Number.isNaN(Number(key));
  const keys: string[] = Object.keys(enumeration).filter(filterReverseMapping);
  let result: boolean = false;
  for (let i = 0; i < keys.length; i += 1) {
    const key: string = keys[i];
    if (enumeration[key] === value) {
      result = true;
      break;
    }
  }
  return result;
};
