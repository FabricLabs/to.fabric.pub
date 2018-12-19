import React from 'react';

import Header from './header';
import Footer from './footer';
import HomePage from './home';

export default React.createClass({
  getInitialState () {
    return {
      page: <HomePage />
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
})
