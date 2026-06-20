import type { Locale } from '../i18n/config';
import type { ContentByLocale, SiteContent } from './types';
import { cs } from './cs';
import { en } from './en';

const all: ContentByLocale = { cs, en };

export function getContent(locale: Locale): SiteContent {
  return all[locale];
}

export type { SiteContent };
