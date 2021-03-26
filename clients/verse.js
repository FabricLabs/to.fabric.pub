const VERSE = {
  name: 'Verse',
  logo: 'images/verse.png',
  author: 'Fabric Labs',
  homepage: 'https://chat.verse.im',
  room_url (alias) { return 'https://chat.verse.im/#/room/' + alias; },
  room_id_url (id) { return 'https://chat.verse.im/#/room/' + id; },
  user_url (userId) { return 'https://chat.verse.im/#/user/' + userId; },
  msg_url (msg) { return 'https://chat.verse.im/#/room/' + msg; },
  group_url (group) { return 'https://chat.verse.im/#/group/' + group; },
  maturity: 'Stable',
  comments: 'Virtual world simulator.'
};

export default VERSE;
