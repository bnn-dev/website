export const BASE_URL = 'https://bnn.dev';
export const SITE_NAME = 'bnn.dev';
export const AUTHOR = 'Bogdan Nikolov';
export const DEFAULT_DESCRIPTION =
  'Personal website and blog of Bogdan Nikolov. Writing on software, security, faith, and the examined life.';

export const DEFAULT_OG_IMAGE = '/og.jpg';
export const TWITTER_HANDLE = '@0xr3ngar'; // update if you have a different one for the site

export interface SEOProps {
  title: string;
  description?: string;
  url: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
  image?: string;
  noIndex?: boolean;
}
