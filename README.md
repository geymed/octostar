![Octostar](/octostar-title.png?raw=true "Octostar")
 
[![Git Proper Branching Model](http://b.repl.ca/v1/Git-Proper%20Branching-lightgrey.png)](http://nvie.com/posts/a-successful-git-branching-model/)

A bookmark organizer for Github Stars. Built off the Hackathon starter kit, you can manage and tag your Github stars using this tool. Built with Node, Mongo, Bootstrap, Vue, and a smattering of other things.

This is the source code for the service located @ http://octostar.io which will be launching in a few weeks. Any updates pushed to there start here.

This build is using **[Zenhub.io](https://www.zenhub.io/)** in connection with Github Issues for bug tracking. There are 4 sections in the Zenhub Board for this project:
- **Current**: *The issues I am working on for the next version release*
- **Backlog**: *The issues that will be worked on for the following*
- **Icebox**: *Issues that are for any following releases*
- **Up for Debate**: *Any issues that are presented, but not yet approved for implementation.*

You will still be able to create and see issues as normal, and I will be tagging issues with version milestones, of course, but if you want to see how I'm organizing those issues, feel free to [install the chrome plugin](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd) and take a look.

####Build Status

master: [![SemVer](http://b.repl.ca/v1/SemVer-0.3.1-blue.png)](http://semver.org)  [![Build Status](https://secure.travis-ci.org/therebelrobot/octostar.png?branch=master)](https://travis-ci.org/therebelrobot/octostar)

develop: [![SemVer](http://b.repl.ca/v1/SemVer-0.4.0--alpha-blue.png)](http://semver.org) [![Build Status](https://secure.travis-ci.org/therebelrobot/octostar.png?branch=develop)](https://travis-ci.org/therebelrobot/octostar)

### Application Layers
There are two layers of this application:
- The UI layer, built with Bootstrap and Passport
- The API layer, used to sync/update/retrieve your github stars

### Dependencies
Most of the dependencies are listed in the package.json file and are installed via
```
npm install
```
I personally use nodemon for development, and use supervisor for the deployment. 

### Routes
- `/` - Main entry point for UI. Leads first to authentication then to the main dashboard.
- `/logout` - Used to end current session in UI
- `/account` - Brings you to User account page
- `/account/profile` - POST ONLY - Updates the account
- `/account/delete` - POST ONLY - Deletes the account
- `/auth/github` - Used for github authentication
- `/auth/github/callback` - Used for github authentication. Supply this to your github app settings.
- `/api/account/sync` - JSON API - Used to sync Github Starred list with locally stored version
- `/api/account/stars` - JSON API - Retrieve both the original list stored locally, and any additions made available through Octostar

### Installation
TODO

### Contributing

Please review the [Contributing Guidelines](/CONTRIBUTING.md) document found in this repo.

### Licensing and Attribution

[MIT](/LICENSE)

[Adam Font](https://www.behance.net/gallery/ADAM-Free-Typeface/13756975)

[freevector/Vecteezy.com](http://www.vecteezy.com/vector-art/73377-happy-face-vector)