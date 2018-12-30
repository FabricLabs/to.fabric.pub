import React from 'react';

const clients = {
  linkable: [
    {
      name: 'Grove',
      logo: 'img/grove.jpg',
      author: 'Fabric Labs',
      homepage: 'https://chat.fabric.pub',
      room_url (alias) { return 'https://chat.fabric.pub/#/room/' + alias; },
      room_id_url (id) { return 'https://chat.fabric.pub/#/room/' + id; },
      user_url (userId) { return 'https://chat.fabric.pub/#/user/' + userId; },
      msg_url (msg) { return 'https://chat.fabric.pub/#/room/' + msg; },
      group_url (group) { return 'https://chat.fabric.pub/#/group/' + group; },
      maturity: 'Stable',
      comments: 'Cross-platform chat client for Fabric.'
    },
    {
      name: 'Verse',
      logo: 'img/verse.png',
      author: 'Fabric Labs',
      homepage: 'https://chat.verse.im',
      room_url (alias) { return 'https://chat.verse.im/#/room/' + alias; },
      room_id_url (id) { return 'https://chat.verse.im/#/room/' + id; },
      user_url (userId) { return 'https://chat.verse.im/#/user/' + userId; },
      msg_url (msg) { return 'https://chat.verse.im/#/room/' + msg; },
      group_url (group) { return 'https://chat.verse.im/#/group/' + group; },
      maturity: 'Stable',
      comments: 'Virtual world simulator.'
    },
    {
      name: 'RPG',
      logo: 'img/rpg.png',
      author: 'Quill, Inc.',
      homepage: 'https://chat.roleplaygateway.com',
      room_url (alias) { return 'https://chat.roleplaygateway.com/#/room/' + alias; },
      room_id_url (id) { return 'https://chat.roleplaygateway.com/#/room/' + id; },
      user_url (userId) { return 'https://chat.roleplaygateway.com/#/user/' + userId; },
      msg_url (msg) { return 'https://chat.roleplaygateway.com/#/room/' + msg; },
      group_url (group) { return 'https://chat.roleplaygateway.com/#/group/' + group; },
      maturity: 'Stable',
      comments: 'Founding community of Verse.'
    }
  ],
  unlinkable: [
    {
      name: 'Generic',
      logo: 'img/fabric.png',
      author: 'Fabric Labs',
      homepage: 'fabric://fabric.pub',
      maturity: 'Prototype',
      room_instructions(alias)  { return <span>Type <code>/join <b>{ alias }</b></code></span> },
      user_instructions(userId) { return <span>Type <code>/invite <b>{ userId }</b></code></span> },
      comments: 'Built-in Fabric link handler',
    }
  ]
}

export default React.createClass({
  getInitialState () {
    return {
      error: null,
      entity: null,
      showLink: false
    };
  },

  onHashChange () {
    var entity = null;
    switch (window.location.hash.charAt(1)) {
      default:
        entity = unescape(window.location.hash);
        break;
      case '/':
        entity = unescape(window.location.hash.substr(2));
        break;
      // handles
      case '@':
        entity = unescape(window.location.hash.substr(1));
        break;
      // groups
      case '+':
        entity = unescape(window.location.hash.substr(1));
        break;
    }
    if (!entity) {
      this.setState({
        entity: null,
        showLink: false,
        error: null
      });
      return;
    }

    if (!this.isAliasValid(entity) && !this.isUserIdValid(entity) && !this.isMsglinkValid(entity) && !this.isRoomIdValid(entity) && !this.isGroupValid(entity)) {
      this.setState({
        entity: entity,
        error: 'Invalid room alias, user ID, message permalink or group "' + entity + '"'
      });
      return;
    }

    this.setState({
      entity: entity,
      showLink: true,
      error: null
    });
  },

  componentWillMount () {
    if (window.location.hash) {
      this.onHashChange();
    }
  },

  componentDidMount () {
    window.addEventListener('hashchange', this.onHashChange);
  },

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.onHashChange);
  },

  onSubmit (ev) {
    ev.preventDefault();

    var entity = this.refs.prompt.value.trim();
    if (!this.isAliasValid(entity) && !this.isUserIdValid(entity) && !this.isGroupValid(entity)) {
      this.setState({ error: 'Invalid room alias, user ID or group' });
      return;
    }
    var loc = window.location;
    loc.hash = '#/' + entity;
    window.location.assign(loc.href);
    this.setState({
      showLink: true,
      entity: entity,
      error: null
    });
  },

  // XXX: cargo-culted from matrix-react-sdk
  isAliasValid (alias) {
    // XXX: FIXME SPEC-1
    return (alias.match(/^#([^\/:]+?):(.+)$/) && encodeURI(alias) === alias);
  },

  isRoomIdValid (id) {
    // XXX: FIXME SPEC-1
    return (id.match(/^!([^\/:]+?):(.+)$/) && encodeURI(id) === id);
  },

  isUserIdValid (userId) {
    // XXX: FIXME SPEC-1
    return (userId.match(/^@([^\/:]+?):(.+)$/) && encodeURI(userId) === userId);
  },

  isMsglinkValid (msglink) {
    // XXX: FIXME SPEC-1
    console.log(msglink);
    console.log(encodeURI(msglink));
    return (msglink.match(/^[\!#]([^\/:]+?):(.+?)\/\$([^\/:]+?):(.+?)$/) && encodeURI(msglink) === msglink);
  },

  isGroupValid (group) {
    console.log(group);
    console.log(encodeURI(group));
    return (group.match(/^\+([^\/:]+?):(.+)$/) && encodeURI(group) === group);
  },

  render () {
    var error;
    if (this.state.error) {
      error = (
        <div className="ui message">
          <p>{ this.state.error }</p>
        </div>
      )
    }

    var prompt;
    if (this.state.showLink) {
      var link = 'https://to.fabric.pub/#' + this.state.entity.substr(1);

      var isRoom = this.isAliasValid(this.state.entity);
      var isRoomId = this.isRoomIdValid(this.state.entity);
      var isUser = this.isUserIdValid(this.state.entity);
      var isMsg = this.isMsglinkValid(this.state.entity);
      var isGroup = this.isGroupValid(this.state.entity);

      var links;

      // name: "Vector",
      // logo: "",
      // author: "Vector.im",
      // link: "https://vector.im",
      // room_url: "https://vector.im/beta/#/room/",
      // user_url: "https://vector.im/beta/#/user/",
      // maturity: "Late beta",
      // comments: "Fully-featured Matrix client for Web, iOS & Android",

      var description;

      if (isRoom) {
        description = <span>the <b>{ this.state.entity }</b> room</span>;
      } else if (isUser) {
        description = <span>the user <b>{ this.state.entity }</b></span>;
      } else if (isMsg) {
        description = <span><b>this message</b></span>;
      } else if (isGroup) {
        description = <span>the <b>{ this.state.entity }</b> group</span>;
      }

      links = (
        <div key="links" className="ui basic vertical segment">
          <div className="ui message">
            <p>To connect to { description }, please select an app:</p>
          </div>

          <table className="ui table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Access { isMsg ? "message" : <b>{ this.state.entity }</b> }</th>
              </tr>
            </thead>
            <tbody>
              { clients.linkable.map((client) => {
                var link;
                if (isRoom && client.room_url) {
                  link = client.room_url(this.state.entity);
                } else if (isRoomId && client.room_id_url) {
                  link = client.room_id_url(this.state.entity);
                } else if (isUser && client.user_url) {
                  link = client.user_url(this.state.entity);
                } else if (isMsg && client.msg_url) {
                  link = client.msg_url(this.state.entity);
                } else if (isGroup && client.group_url) {
                  link = client.group_url(this.state.entity);
                }
                if (!link) return null;

                return (
                  <tr key={ client.name }>
                    <td>
                      <a href={ link }><img className="ui tiny image" src={ client.logo }/></a>
                    </td>
                    <td>
                      <a href={ link }>{ client.name }</a>
                      <div>
                        <a href={ client.homepage }>{ client.homepage }</a>
                      </div>
                    </td>
                    <td>
                      { client.comments }
                    </td>
                    <td>
                      <a href={ link } className="ui icon right labeled primary button">Open in {client.name}<i className="right chevron icon"></i></a>
                    </td>
                  </tr>
                );
              })}

              { clients.unlinkable.map((client) => {
                var instructions;

                if (isRoom && client.room_instructions) {
                  instructions = client.room_instructions(this.state.entity);
                } else if (isUser && client.user_instructions) {
                    instructions = client.user_instructions(this.state.entity);
                } else if (isMsg && client.msg_instructions) {
                    instructions = client.msg_instructions(this.state.entity);
                } else if (isGroup && client.group_instructions) {
                    instructions = client.group_instructions(this.state.entity);
                }

                if (!instructions) return null;

                return (
                  <tr key={ client.name }>
                    <td>
                      <a href={ client.homepage }><img className="ui tiny image" src={ client.logo }/></a>
                    </td>
                      <td>
                        <a href={ client.homepage }>{ client.name }</a>
                        <div>
                          <a href={ client.homepage }>{ client.homepage }</a>
                        </div>
                      </td>
                      <td>
                        { client.comments }
                      </td>
                      <td>
                        { instructions }
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

      prompt = [
        <div key="inputbox" className="ui basic vertical segment">
          <a href={ link } className="ui huge secondary button"><i className="linkify icon"></i> { link }</a>
          { error }
        </div>,
        links
      ];
    } else {
      prompt = [
        <div key="inputBox" className="ui form">
          <form onSubmit={ this.onSubmit }>
            <div className="inline fields">
              <div className="twelve wide field">
                <input autoFocus value={ this.state.entity } ref="prompt" type="text" placeholder="#room:example.com, @user:example.com, or +group:example.com" />
              </div>
              <div className="four wide field">
                <input className="ui primary button" type="submit" value="Get link!" />
              </div>
            </div>
          </form>
          { error }
        </div>,
        <div key="cta" id="cta">
          <h3>Shareable links for <a href="https://fabric.pub">the Fabric Network</a>.</h3>
          <p>Links are designed to be human-friendly, both for reading and constructing.</p>
        </div>
      ];
    }

    return (
      <div className="ui container">
        { prompt }
        <div classNames="ui basic vertical segment">
          <table className="ui table">
            <thead>
              <tr>
                <th>prefix</th>
                <th>purpose</th>
                <th>example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>@</td>
                <td>name</td>
                <td><a href="https://maki.io/people/chrisinajar"><small className="subtle">@</small>chrisinajar</a></td>
              </tr>
              <tr>
                <td>#</td>
                <td>topic</td>
                <td><a href="https://maki.io/topics/learning"><small className="subtle">#</small>learning</a></td>
              </tr>
              <tr>
                <td>$</td>
                <td>symbol</td>
                <td><a href="https://www.roleplaygateway.com/assets/ink"><small className="subtle">$</small>INK</a></td>
              </tr>
              <tr>
                <td>+</td>
                <td>group</td>
                <td><a href="https://chat.fabric.pub/#/group/+labs:fabric.pub"><small className="subtle">+</small>labs</a></td>
              </tr>
              <tr>
                <td>!</td>
                <td>trigger</td>
                <td>oh my god <small className="subtle">!</small>erm</td>
              </tr>
              <tr>
                <td>/</td>
                <td>command</td>
                <td><a href="/#/#idlerpg:verse.im"><small className="subtle">/</small>join <code>#idlerpg</code></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
