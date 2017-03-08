import React from 'react';
import components from './ComponentsUtil';
import Article from '../components/Article';


function buildArticle(componentConfig) {
  if (!componentConfig) return {};

  const properties = Object.assign({}, componentConfig);

  properties.content = componentConfig.content.map((c, index) => buildContent(c, index));


  return <Article {...properties}/>;
}

function buildContent(componentConfig, parentKey = '0') {
  const Component = components[componentConfig.type];

  const key = parentKey;
  const properties = Object.assign({}, { content: componentConfig.content });

  return <Component {...properties} key={key}/>;
}


export default buildArticle;
