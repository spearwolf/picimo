/**
 * @internal
 */
export const postFixID = Math.round(Math.random() * (1 << 24)).toString(16);

/**
 * @internal
 */
export const globalStylesID = `picimo-${postFixID}`;

let sheet: CSSStyleSheet = null;

/**
 * Helper for installing simple css-class-based rules
 * @public
 */
export class Stylesheets {
  static getGlobalSheet() {
    if (sheet === null) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('id', globalStylesID);
      document.head.appendChild(styleEl);
      sheet = styleEl.sheet as CSSStyleSheet;
    }
    return sheet;
  }

  static installRule(name: string, css: string) {
    const className = `${name}-${postFixID}`;
    const selector = `.${className}`;

    Stylesheets.getGlobalSheet().addRule(selector, css);

    return className;
  }

  /**
   * Install a global className-based style ruleset and add the className to the html element
   * The class name gets a uniq-number as postfix added.
   * @param name - The base class name
   * @param css - The styles
   * @returns The postfixed class name
   */
  static addRule(element: HTMLElement, name: string, css: string) {
    const className = Stylesheets.installRule(name, css);
    element.classList.add(className);
    return className;
  }
}
