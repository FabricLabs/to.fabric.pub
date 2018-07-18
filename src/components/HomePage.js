/*
Copyright 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react'

var linkable_clients = [
    {
        name: "Grove",
        logo: "img/grove-48px.png",
        author: "Fabric Labs",
        homepage: "https://chat.fabric.pub",
        room_url(alias)  { return "https://chat.fabric.pub/#/room/" + alias },
        room_id_url(id)  { return "https://chat.fabric.pub/#/room/" + id },
        user_url(userId) { return "https://chat.fabric.pub/#/user/" + userId },
        msg_url(msg)     { return "https://chat.fabric.pub/#/room/" + msg },
        group_url(group)     { return "https://chat.fabric.pub/#/group/" + group },
        maturity: "Stable",
        comments: "Cross-platform chat client for Fabric.",
    }
];

var unlinkable_clients = [
    {
        name: "Generic",
        logo: "img/riot-48px.png",
        author: "Fabric Labs",
        homepage: "https://fabric.pub",
        maturity: "Prototype",
        room_instructions(alias)  { return <span>Type <code>/join <b>{ alias }</b></code></span> },
        user_instructions(userId) { return <span>Type <code>/invite <b>{ userId }</b></code></span> },
        comments: "Built-in Fabric link handler",
    }
];

export default React.createClass({

    getInitialState() {
        return {
            error: null,
            entity: null,
            showLink: false,
        }
    },

    onHashChange() {
        var entity = unescape(window.location.hash.substr(2)); // strip off #/ prefix
        if (!entity) {
            this.setState({
                entity: null,
                showLink: false,
                error: null,
            });
            return;
        }

        if (!this.isAliasValid(entity) && !this.isUserIdValid(entity) && !this.isMsglinkValid(entity) && !this.isRoomIdValid(entity) && !this.isGroupValid(entity)) {
            this.setState({
                entity: entity,
                error: "Invalid room alias, user ID, message permalink or group '" + entity + "'",
            });
            return;
        }
        this.setState({
            entity: entity,
            showLink: true,
            error: null,
        });
    },

    componentWillMount() {
        if (window.location.hash) {
            this.onHashChange();
        }
    },

    componentDidMount() {
        window.addEventListener("hashchange", this.onHashChange);
    },

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onHashChange);
    },

    onSubmit(ev) {
        ev.preventDefault();

        var entity = this.refs.prompt.value.trim();
        if (!this.isAliasValid(entity) && !this.isUserIdValid(entity) && !this.isGroupValid(entity)) {
            this.setState({ error: "Invalid room alias, user ID or group" });
            return;
        }
        var loc = window.location;
        loc.hash = "#/" + entity;
        window.location.assign(loc.href);
        this.setState({
            showLink: true,
            entity: entity,
            error: null,
        });
    },

    // XXX: cargo-culted from matrix-react-sdk
    isAliasValid(alias) {
        // XXX: FIXME SPEC-1
        return (alias.match(/^#([^\/:]+?):(.+)$/) && encodeURI(alias) === alias);
    },

    isRoomIdValid(id) {
        // XXX: FIXME SPEC-1
        return (id.match(/^!([^\/:]+?):(.+)$/) && encodeURI(id) === id);
    },

    isUserIdValid(userId) {
        // XXX: FIXME SPEC-1
        return (userId.match(/^@([^\/:]+?):(.+)$/) && encodeURI(userId) === userId);
    },

    isMsglinkValid(msglink) {
        // XXX: FIXME SPEC-1
        console.log(msglink);
        console.log(encodeURI(msglink));
        return (msglink.match(/^[\!#]([^\/:]+?):(.+?)\/\$([^\/:]+?):(.+?)$/) && encodeURI(msglink) === msglink);
    },

    isGroupValid(group) {
        console.log(group);
        console.log(encodeURI(group));
        return (group.match(/^\+([^\/:]+?):(.+)$/) && encodeURI(group) === group);
    },

    render() {
        var error;
        if (this.state.error) {
            error = <div className="mxt_HomePage_error">{ this.state.error }</div>
        }

        var prompt;
        if (this.state.showLink) {
            var link = "https://to.fabric.pub/#/" + this.state.entity;

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
            }
            else if (isUser) {
                description = <span>the user <b>{ this.state.entity }</b></span>;
            }
            else if (isMsg) {
                description = <span><b>this message</b></span>;
            }
            else if (isGroup) {
                description = <span>the <b>{ this.state.entity }</b> group</span>;
            }

            links = (
                <div key="links" className="mxt_HomePage_links">
                    <div className="mxt_HomePage_links_intro">
                        <p>
                            <a href="https://matrix.org">Matrix</a> is an ecosystem for open and interoperable communication.
                        </p>
                        <p>
                            To connect to { description }, please select an app:
                        </p>
                    </div>

                    <div className="mxt_HomePage_link mxt_HomePage_link_title">
                        <div className="mxt_HomePage_link_logo">
                        </div>
                        <div className="mxt_HomePage_link_name">
                            Name
                        </div>
                        <div className="mxt_HomePage_link_comments">
                            Description
                        </div>
                        <div className="mxt_HomePage_link_author">
                            Author
                        </div>
                        <div className="mxt_HomePage_link_maturity">
                            Maturity
                        </div>
                        <div className="mxt_HomePage_link_link">
                            Access { isMsg ? "message" : <b>{ this.state.entity }</b> }
                        </div>
                    </div>

                    { linkable_clients.map((client) => {
                        var link;
                        if (isRoom && client.room_url) {
                            link = client.room_url(this.state.entity);
                        }
                        else if (isRoomId && client.room_id_url) {
                            link = client.room_id_url(this.state.entity);
                        }
                        else if (isUser && client.user_url) {
                            link = client.user_url(this.state.entity);
                        }
                        else if (isMsg && client.msg_url) {
                            link = client.msg_url(this.state.entity);
                        }
                        else if (isGroup && client.group_url) {
                            link = client.group_url(this.state.entity);
                        }
                        if (!link) return null;

                        return (
                            <div key={ client.name } className="mxt_HomePage_link">
                                <div className="mxt_HomePage_link_logo">
                                    <a href={ link }><img src={ client.logo }/></a>
                                </div>
                                <div className="mxt_HomePage_link_name">
                                    <a href={ link }>{ client.name }</a>
                                    <div className="mxt_HomePage_link_homepage">
                                        <a href={ client.homepage }>{ client.homepage }</a>
                                    </div>
                                </div>
                                <div className="mxt_HomePage_link_comments">
                                    { client.comments }
                                </div>
                                <div className="mxt_HomePage_link_author">
                                    { client.author }
                                </div>
                                <div className="mxt_HomePage_link_maturity">
                                    { client.maturity }
                                </div>
                                <div className="mxt_HomePage_link_link">
                                    <a href={ link }>{ link }</a>
                                </div>
                            </div>
                        );
                    })}
                    { unlinkable_clients.map((client) => {
                        var instructions;
                        if (isRoom && client.room_instructions) {
                            instructions = client.room_instructions(this.state.entity);
                        }
                        else if (isUser && client.user_instructions) {
                            instructions = client.user_instructions(this.state.entity);
                        }
                        else if (isMsg && client.msg_instructions) {
                            instructions = client.msg_instructions(this.state.entity);
                        }
                        else if (isGroup && client.group_instructions) {
                            instructions = client.group_instructions(this.state.entity);
                        }
                        if (!instructions) return null;

                        return (
                            <div key={ client.name } className="mxt_HomePage_link">
                                <div className="mxt_HomePage_link_logo">
                                    <a href={ client.homepage }><img src={ client.logo }/></a>
                                </div>
                                <div className="mxt_HomePage_link_name">
                                    <a href={ client.homepage }>{ client.name }</a>
                                    <div className="mxt_HomePage_link_homepage">
                                        <a href={ client.homepage }>{ client.homepage }</a>
                                    </div>
                                </div>
                                <div className="mxt_HomePage_link_comments">
                                    { client.comments }
                                </div>
                                <div className="mxt_HomePage_link_author">
                                    { client.author }
                                </div>
                                <div className="mxt_HomePage_link_maturity">
                                    { client.maturity }
                                </div>
                                <div className="mxt_HomePage_link_instructions">
                                    { instructions }
                                </div>
                            </div>
                        );
                    })}

                    <p>
                        To add clients to this list, <a href="https://to.fabric.pub/#/#matrix-dev:matrix.org">please contact us</a> or
                        simply send us a pull request <a href="https://github.com/matrix-org/to.fabric.pub">on github</a>!
                    </p>
                </div>
            );

            prompt = [
                <div key="inputbox" className="mxt_HomePage_inputBox">
                    <a href={ link } className="mxt_HomePage_inputBox_link">{ link }</a>
                    { error }
                </div>,
                links
            ];
        }
        else {
            prompt = [
                <div key="inputBox" className="mxt_HomePage_inputBox">
                    <form onSubmit={ this.onSubmit }>
                        <input autoFocus className="mxt_HomePage_inputBox_prompt" value={ this.state.entity } ref="prompt" size="36" type="text" placeholder="#room:example.com, @user:example.com or +group:example.com" />
                        <input className="mxt_HomePage_inputBox_button" type="submit" value="Get link!" />
                    </form>
                    { error }
                </div>,
                <div key="cta" className="mxt_HomePage_cta">
                    Create shareable links to Matrix rooms, users or messages<br/>
                    without being tied to a specific app.
                </div>
            ];
        }

        return (
            <div className="mxt_HomePage">
                <a href="#">
                    <img className="mxt_HomePage_logo" src="img/matrix-logo.svg" width="352" height="150" alt="[matrix]"/>
                </a>

                { prompt }

                <div className="mxt_HomePage_info">
                    <h3>About</h3>
                    <p>
                        This is a simple stateless URL redirecting service
                        which lets users share links to entities in the <a href="https://fabric.pub">Fabric
                        </a> ecosystem without being tied to any specific app.  This lets users choose their own favorite
                        client to participate in conversations rather than being forced to use the same app as
                        whoever sent the link.
                    </p>
                    <p>
                        The service preserves user privacy by not
                        sharing any information about the links being followed with the server - the
                        redirection is calculated entirely clientside using JavaScript.
                    </p>
                    <p>
                        Links are designed to be human-friendly, both for reading and constructing, and are
                        essentially a compatibility step in the journey towards
                        <a href="https://dev.fabric.pub/snippets/specification.html">a <code>fabric://</code> protocol specification</a>.
                    </p>
                    <p>
                        This service is released as open source under the terms of
                        the <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License v2.0</a> &mdash; get the source
                        from <a href="https://github.com/FabricLabs/to.fabric.pub">GitHub</a>.
                    </p>
                </div>
            </div>
        );
    }
})
