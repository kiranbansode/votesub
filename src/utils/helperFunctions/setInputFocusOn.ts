/**
 * `setInputFocusOn` will programmatically focus input field
 * whose id(fieldName) is passed as argument
 *
 * @param {string} inputId  - input id(fieldName)
 */
const setInputFocusOn = (inputId: string) => document.getElementById(inputId)?.focus();

export default setInputFocusOn;
