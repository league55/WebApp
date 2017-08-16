# Web-app based on modern technologies like Java enterprice stack on back and reactjs on front
## based on spring-react-boilerplate
Web site (a kind of studing portal about electronics)

 uses:

- [Yarn](https://yarnpkg.com/) for installing Node modules.
- [Webpack](https://github.com/webpack/webpack) to bundle all the
  JavaScript and dependencies, plus LESS + CSS handling.
- [Babel](https://babeljs.io/) for ES6 syntax, using Babel 6 with the "es2016" and "react" presets.
- [Hot module reloading
  (HMR)](https://github.com/gaearon/react-transform-hmr) of React components
- [Redux](https://github.com/rackt/redux) to manage state, both in the
  client and when rendering on the server.
- [react-router](https://github.com/rackt/react-router) for page routing,
  on client and server. Note that this is version 4, with a very different (and
  simpler) API to previous versions.
- [react-helmet](https://github.com/nfl/react-helmet) for managing
  meta-data in the HTML
- Linting integrated with Webpack via [eslint](https://github.com/MoOx/eslint-loader).
- Type checking with [Flow](https://flowtype.org/).

## Other Goodies
- [Project Lombok](https://projectlombok.org/) to cut down the Java
  boilerplate
- [Jackson](https://github.com/FasterXML/jackson) to serialize model data
  before rendering on the server. For more information, see
  [this OpenJDK thread on the subject](http://mail.openjdk.java.net/pipermail/nashorn-dev/2013-September/002006.html),
  but summary is Nashorn won't (and actually can't) string-ify POJOs via
  `JSON.stringify`, meaning it can't be used to serialise the Redux state.

## Running the code

Execute `mvn` if you have Maven already installed, or `./mvnw` if you don't. You'll need
[Java8 installed](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) either way at
a minimum version of `1.8.0_65`. Older versions have a bug that makes rendering
brutally slow.

Run Webpack in hot-module reloading mode with: `npm start`.
