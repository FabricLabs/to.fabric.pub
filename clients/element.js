const Element = {
  name: 'Element',
  logo: 'images/element.svg',
  author: 'New Vector',
  homepage: 'https://app.element.io',
  room_url (alias) { return 'https://app.element.io/#/room/' + alias; },
  room_id_url (id) { return 'https://app.element.io/#/room/' + id; },
  user_url (userId) { return 'https://app.element.io/#/user/' + userId; },
  msg_url (msg) { return 'https://app.element.io/#/room/' + msg; },
  group_url (group) { return 'https://app.element.io/#/group/' + group; },
  maturity: 'Stable',
  comments: 'Fallback client.  Does not support Fabric, RPG, or Soundtrack commands.'
};

// export { element as default };
export default Element;
