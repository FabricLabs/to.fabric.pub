'use strict';

import React from 'react';
import SearchModal from './search-modal';

const Search = () => (
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

export default Search;
