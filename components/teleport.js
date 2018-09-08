'use strict';

import React from 'react';
import SearchModal from './search-modal';

export default class Teleport extends React.Component {
  render () {
    return (
      <maki-application>
        {/* All elements to fill vertical space */}
        <style>{`
          body > #application,
          body > #application > maki-application {
            height: 100%;
          }
        `}</style>
        <SearchModal />
      </maki-application>
    );
  }
}

module.exports = Teleport;
