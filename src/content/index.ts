import type { Locale } from '../i18n/config';
import type { ContentByLocale, SiteContent } from './types';
import { cs } from './cs';
import { en } from './en';
import { de } from './de';
import { ja } from './ja';
import { fr } from './fr';
import { ru } from './ru';

const all: ContentByLocale = { cs, en, de, ja, fr, ru };

export function getContent(locale: Locale): SiteContent {
  return all[locale];
}

export type { SiteContent };
