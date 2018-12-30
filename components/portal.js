import React from 'react';

import Header from './header';
import Footer from './footer';
import App from './app';

export default React.createClass({
  getInitialState () {
    return {
      page: <App />
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
