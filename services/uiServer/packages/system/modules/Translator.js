import { User } from './User'

export class Translator {
    constructor(translateFile, lang = User.language) {
        this._translateFile = translateFile;
        this._lang = lang;
    }
    async get(context) {
        if(!this.translation) {
            this.translation = await import('@components/../localization/' + this._translateFile + '/' + this._lang + '.js')
        }
        return this.translation.default(context);
    }
}