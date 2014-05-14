![Octostar](/octostar-title.png?raw=true "Octostar")

[![SemVer](http://b.repl.ca/v1/SemVer-1.0.0-blue.png)](http://semver.org)  [![Git Proper Branching Model](http://b.repl.ca/v1/Git-Proper%20Branching-lightgrey.png)](http://nvie.com/posts/a-successful-git-branching-model/)

A bookmark organizer for Github Stars. Built off the Hackathon starter kit, you can manage and tag your Github stars using this tool. Built with Node, Mongo, Bootstrap, Vue, and a smattering of other things.

This is the source code for the service located @ http://octostar.io which will be launching in a few weeks. Any updates pushed to there start here.

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

### Licensing and Attribution

MIT

[Adam Font](https://www.behance.net/gallery/ADAM-Free-Typeface/13756975)
