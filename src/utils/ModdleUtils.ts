/**
 * Helper function to filter bpmn-moddle instances. For example, to check whether an element
 * is a gateway or an event:
 *
 * ```
 * is("bpmn:Gateway", "bpmn:Event")(element)
 * ```
 *
 * This format can be used in stream methods as well:
 *
 * ```
 * elements.filter(is("bpmn:Gateway", "bpmn:Event"))
 * ```
 *
 * @param types A list of BPMN types to check for
 */
export function is(...types: string[]) {
  return (element: any) => {
    element = (element && element.businessObject) || element;
    if (!element) {
      return false;
    }
    return types.some((type) => element.$instanceOf(type));
  };
}
