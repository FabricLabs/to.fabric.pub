import React from 'react';

export default React.createClass({
  render () {
    return (
      <div className="ui header">
        <h1 className="title"><code><a href="/" className="subtle"><small className="subtle prefix">@</small>to.fabric.pub</a></code></h1>
        <img className="ui centered massive image" src="img/fabric.png" alt="Fabric, the decentralized operating system" />
        <h2 className="subtle subtitle"><small><strong>threads</strong> in the fabric</small></h2>
      </div>
    );
  }
})
