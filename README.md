@fabric/teleport
================
[Teleport][teleport] is a tool for creating [hyperlinks][hyperlinks] to entities
in the Fabric ecosystem.  Hyperlinks can be shared on the legacy web, making it
easy to reference content in the Fabric network.

## Private Links
Teleport preserves user privacy by not sharing any information about the links
being followed — the redirection is calculated entirely clientside using
JavaScript, and the link details is hidden behind a fragment to avoid web
clients leaking it to any intermediate server.

Teleport links are designed to be human-friendly, both for reading and
constructing, and are essentially a compatibility step in the journey towards a
ubiquitous `fabric://` URL scheme.

The proposed Fabric URL scheme is as follows:

| Entity type: | Prefix: | Hyperlink | Example Privacy-Protecting URL                           |
|--------------|---------|-----------|----------------------------------------------------------|
| Names:       | `@`     | fabric://@eric:fabric.pub | https://to.fabric.pub/#/@eric:fabric.pub |
| Topics:      | `#`     | fabric://#hub:fabric.pub  | https://to.fabric.pub/#/#hub:fabric.pub  |

The `#/` component is optional, and exists to avoid leaking the target URL to
the server hosting Teleport.  https://to.fabric.pub/@eric:fabric.pub works just
as well, and provides better legibility at the expense of privacy.

`@` may be used at any time to resolve any particular named state by trusting
the currently connected set of peers.

[teleport]: https://to.fabric.pub
[hyperlinks]: https://fabric.pub/hyperlinks
