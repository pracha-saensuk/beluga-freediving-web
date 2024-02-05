import fs from 'fs';
import yaml from 'js-yaml';
import merge from 'lodash.merge';

import type { MetaData } from '~/types';

export const convertPriceObjToString = (priceObj:{[key:string]:number})=>{
  const price: Partial<{ key:string }> = {};
    Object.keys(priceObj).map((key:string) => {
      price[key] = priceObj[key].toLocaleString();
  });
  return price;
}

export interface SiteConfig {
  name: string;
  site?: string;
  shortName?: string;
  base?: string;
  price: {
    lap1:string,
    wave1:string;
    lap2:string;
    wave2:string;
    tryFreedive:string;
    privateTraining:string;
  };
  priceNumber: {
    lap1:number,
    wave1:number;
    lap2:number;
    wave2:number;
    tryFreedive:number;
    privateTraining:number;
  }
  contact: {
    line: string;
    tel: string;
    telURI: string;
  };
  applyForm: {
    actionUrl: string;
    redirectUrl: string;
  }
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}
export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
  };
}

const config = yaml.load(fs.readFileSync('src/config.yaml', 'utf8')) as {
  site?: SiteConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
  };
  ui?: unknown;
  analytics?: unknown;
};
if(!config || !config.site) throw 'Please set config file';
config.site.contact.telURI = config?.site.contact.tel.replace(/^(0|\+66)(\d+)$/, 'tel:+66$2');


const DEFAULT_SITE_NAME = 'Website';

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    shortName: '',
    site: undefined,
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  };
  if(!config.site?.priceNumber) throw Error('no course price data!');
  config.site.price = convertPriceObjToString(config.site.priceNumber) as SiteConfig['price'];
  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

const getI18N = () => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

const getAppBlog = () => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};

const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const UI = getUI();
export const ANALYTICS = getAnalytics();
