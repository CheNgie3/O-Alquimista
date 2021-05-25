import React from 'react';

import ReactDOM from 'react-dom';

import singleSpaReact from 'single-spa-react';

import Home from './root.component';


function domElementGetter () {
  return document.querySelector('#header');
}

const reactLifecycles = singleSpaReact({
  React, ReactDOM, rootComponent: Home, domElementGetter
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];