import type { Locale } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import type { UserModule } from '../types';

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
});

/**
 * 將語系格式由 zhTW => zh-TW
 * @param {string | undefined} locale
 * @returns {string}
 */
function formatLocale(locale?: string): string {
  const reg = /([a-z]{2,})([A-Z]{2,})/;
  if (!locale) return 'unknown';
  return reg.test(locale)
    ? locale.replace(/([a-z]{2,})([A-Z]{2,})/, '$1-$2')
    : locale;
}

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.json')).map(
    ([path, loadLocale]) => {
      return [formatLocale(path.match(/([\w-]*)\.json$/)?.[1]), loadLocale];
    }
  )
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;

export const availableLocales = Object.keys(localesMap);

const loadedLanguages: string[] = [];

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any;
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', lang);
  }
  return lang;
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang) {
    return setI18nLanguage(lang);
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  // set current lang to localStorage
  window.localStorage.setItem('lang', lang);

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]();
  i18n.global.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);

  return setI18nLanguage(lang);
}

export const install: UserModule = ({ app }) => {
  app.use(i18n);
  loadLanguageAsync(window.localStorage.getItem('lang') || 'zh-TW');
};

export const $t = i18n.global.t;
