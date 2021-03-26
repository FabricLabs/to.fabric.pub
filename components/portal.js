import React from 'react';

import Header from './header';
import Footer from './footer';
import App from './app';

export default React.createClass({
  getInitialState () {
    return {
      page: <App genesis="000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f" />
    };
  },

  render () {
    return (
      <div className="ui center aligned segment">
        <Header />
        { this.state.page }
        <Footer />
      </div>
    );
  }
});
