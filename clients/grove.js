const Grove = {
  name: 'Grove',
  logo: 'images/grove.jpg',
  author: 'Fabric Labs',
  homepage: 'https://chat.fabric.pub',
  room_url (alias) { return 'https://chat.fabric.pub/#/room/' + alias; },
  room_id_url (id) { return 'https://chat.fabric.pub/#/room/' + id; },
  user_url (userId) { return 'https://chat.fabric.pub/#/user/' + userId; },
  msg_url (msg) { return 'https://chat.fabric.pub/#/room/' + msg; },
  group_url (group) { return 'https://chat.fabric.pub/#/group/' + group; },
  maturity: 'Stable',
  comments: 'Cross-platform chat client for Fabric.'
};

// export { Grove as default };
export default Grove;
