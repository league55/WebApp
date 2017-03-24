import React from 'react';
import Helmet from 'react-helmet';

/**
 * Renders nothing directly, but updates the DOM with the specified data. Note that
 * we don't have script tags in here, because we want these to appear at the bottom
 * of our page, and we don't want Helmet re-inserting them at the top!
 */
const AppMeta = () => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    titleTemplate="Easy electronics - %s"
    defaultTitle="Easy electronics"
    meta={[
      { name: 'description', content: 'Easy electronics' },
      { property: 'og:type', content: 'article' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]}
    link={[
        { rel: 'canonical', href: 'http://example.com/example' },
        { rel: 'apple-touch-icon', href: 'http://example.com/img/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: 'http://example.com/img/apple-touch-icon-72x72.png' },
      { rel: 'stylesheet', href: '/app/bootstrap.css' },
      { rel: 'stylesheet', href: '/app/ArticleEditor.css' },
      { rel: 'stylesheet', href: '/app/bundle.css' }
    ]}
  />
);

export default AppMeta;
