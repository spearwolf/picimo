
export const postFixID = Math.round(Math.random() * (1<<24)).toString(16);
export const globalStylesID = `picimo-${postFixID}`;

let sheet: StyleSheet = null;

export class Stylesheets {

  static getGlobalSheet() {
    if (sheet === null) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('id', globalStylesID);
      document.head.appendChild(styleEl);
      sheet = styleEl.sheet;
    }
    return sheet as CSSStyleSheet;
  }

  static install(name: string, css: string) {
    const className = `${name}-${postFixID}`;
    const selector = `.${className}`;

    Stylesheets.getGlobalSheet().addRule(selector, css);

    return className;
  }

}
