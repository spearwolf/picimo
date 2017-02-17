import * as jab from '@spearwolf/jab';
import Env from './env';

class App extends jab.App {

    constructor ({ provider } = {}) {
        super({
            provider: Object.assign({
                env: Env
            }, provider)
        });
    }

}

App.Component = jab.App.Component;
App.Service = jab.App.Service;

export default App;
