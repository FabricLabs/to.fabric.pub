const RPG = {
  name: 'RPG',
  logo: 'images/rpg.png',
  author: 'Quill, Inc.',
  homepage: 'https://chat.roleplaygateway.com',
  room_url (alias) { return 'https://chat.roleplaygateway.com/#/room/' + alias; },
  room_id_url (id) { return 'https://chat.roleplaygateway.com/#/room/' + id; },
  user_url (userId) { return 'https://chat.roleplaygateway.com/#/user/' + userId; },
  msg_url (msg) { return 'https://chat.roleplaygateway.com/#/room/' + msg; },
  group_url (group) { return 'https://chat.roleplaygateway.com/#/group/' + group; },
  maturity: 'Stable',
  comments: 'IC and OOC chat rooms, roleplaying system, and more.'
};

export default RPG;
