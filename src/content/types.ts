// Typy obsahu webu. Texty žijí v cs.ts / en.ts (per locale), stránky je jen skládají.
import type { Locale } from '../i18n/config';

export interface LinkItem {
  label: string;
  href: string;
}

export interface QA {
  q: string;
  a: string[];
}

export interface Exhibition {
  title: string;
  dates: string;
  venue: string;
  body: string[];
  invite: string;
  signature: string;
}

export interface SiteContent {
  /** sdílené popisky / CTA */
  ui: {
    moreAboutAuthor: string;
    furtherInterviews: string;
  };
  home: {
    eyebrow: string;
    subtitle: string;
  };
  bio: {
    lead: string;
    paragraphs: string[];
    signature: string;
  };
  reference: {
    essay: {
      title: string;
      paragraphs: string[];
      author: string;
      authorRole: string;
    };
    interview: {
      source: string;
      headline: string;
      intro: string;
      qa: QA[];
      by: string;
      links: LinkItem[];
    };
  };
  glass: {
    heading: string;
    paragraphs: string[];
  };
  ooc: {
    paragraphs: string[];
  };
  news: {
    heading: string;
    exhibitions: Exhibition[];
  };
  contact: {
    email: string;
    phone: string;
    instagram: LinkItem;
    facebook: LinkItem;
  };
}

export type ContentByLocale = Record<Locale, SiteContent>;
