const Generic = {
  name: 'Generic',
  logo: 'images/fabric.png',
  author: 'Fabric Labs',
  homepage: 'fabric:fabric.pub',
  maturity: 'Prototype',
  room_instructions (alias) { return <span>Type <code>/join <b>{ alias }</b></code></span>; },
  user_instructions (userId) { return <span>Type <code>/invite <b>{ userId }</b></code></span>; },
  comments: 'Built-in Fabric link handler'
};

// export { Generic as default };
export default Generic;
