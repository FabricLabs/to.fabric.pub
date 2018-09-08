'use strict';

import React from 'react';
import { Grid, Search } from 'semantic-ui-react';

const documents = [
  {
    title: '#hub:fabric.pub',
    description: 'Main room for announcements.'
  }
];

export default class SearchModal extends React.Component {
  constructor (props) {
    super(props);

    // TODO: determine how much Fabric's state clashes with React
    this.state = {};

    return this;
  }

  onSearchChange (event, data) {
    console.log('search changed:', event, data);
  }

  onResultSelect (event, data) {
    console.log('result selected:', event, data);
  }

  onSelectionChange (event, data) {
    console.log('selection changed:', event, data);
  }

  render () {
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column>
          <Search
            fluid
            autoFocus
            options={this.state.options}
            onSelectionChange={this.onSelectionChange}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.onSearchChange}
            results={documents}
            size='huge'
            placeholder='#room:example.com, @user:example.com, or +group:example.com'
            {...this.props} />
        </Grid.Column>
      </Grid>
    );
  }
}

module.exports = SearchModal;
