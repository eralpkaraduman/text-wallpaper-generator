// @flow
// Language dictionaries for the app UI, selected via the ?lang= query
// parameter. The whitelist of accepted codes is exactly the set of keys of
// this object — adding a language is: create src/i18n/<code>.js, import it,
// add it below. Values are build-shipped constants written by us — never
// user input — which is why the apply-loop in index.js may use innerHTML.
//
// 'en' is special: it only contains the strings JS code consumes (and per-key
// fallbacks); the English DOM is never written to — English UI text is baked
// into the HTML markup itself.
import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import id from './id';
import it from './it';
import ja from './ja';
import ko from './ko';
import pt from './pt';
import tr from './tr';
import zh from './zh';

export default { de, en, es, fr, id, it, ja, ko, pt, tr, zh };
