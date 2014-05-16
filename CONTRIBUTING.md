# Contributing Guidelines
So you're interested in giving us a hand? That's awesome! We've put together some brief guidelines that should help
you get started quickly and easily.

There are lots and lots of ways to get involved, this document covers:

* [raising issues](#raising-issues)
    * [bug reports](#bugs)
    * [feature requests](#features)
    * [change requests](#changes)
    * [submitting pull requests](#pull-requests)
* [final thoughts](#finalthoughts)
* [license](#license)


<a name="raising-issues"></a>
## Reporting An Issue

If you're about to raise an issue because think you've found a problem with Octostar, or you'd like to make a request
for a new feature in the codebase, or any other reason… please read this first.

The GitHub issue tracker is the preferred channel for [bug reports](#bugs),
[feature requests](#features), [change requests](#changes) and [submitting pull
requests](#pull-requests), but please respect the following restrictions:

* Please **search for existing issues**. Help us keep duplicate issues to a minimum by checking to see if someone
has already reported your problem or requested your idea.

* Please **do not** use the issue tracker for personal support requests.

* Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

<a name="bugs"></a>
### Bug Reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or look for [closed issues in the current milestone](https://github.com/therebelrobot/octostar/issues?labels=&milestone=3&page=1&state=closed).

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.

4. **Include a screencast if relevant** - Is your issue about a design or front end feature or bug? The most
helpful thing in the world is if we can *see* what you're talking about.
Use [LICEcap](http://www.cockos.com/licecap/) to quickly and easily record a short screencast (24fps) and save it as an animated gif! Embed it directly into your GitHub issue. Kapow.

5. Use the Bug Report template below. A good bug report shouldn't leave others needing to chase you up for more information. Be sure to include the
details of your environment.

Template Example
```
Short and descriptive example bug report title

### Issue Summary

A summary of the issue and the browser/OS environment in which it occurs. If
suitable, include the steps required to reproduce the bug.

### Steps to Reproduce

1. This is the first step
2. This is the second step
3. Further steps, etc.

Any other information you want to share that is relevant to the issue being
reported. Especially, why do you consider this to be a bug? What do you expect to happen instead?

### Technical details:

* Octostar Version: master (latest commit: [hash])
* Client OS: Mac OS X 10.8.4
* Server OS: CentOS 6.4
* Node Version: 0.10.16
* Browser: Chrome 29.0.1547.57
* MongoDB Version: x.x.x
```

<a name="features"></a>
### Feature Requests

Feature requests are welcome. Before you submit one be sure to have:

1. Read the main README file to see if it is already being worked on.
2. Take a moment to think about whether your idea fits with the scope and aims of the project, or if it might
better fit being an app/plugin.
3. Remember, it's up to *you* to make a strong case to convince the project's leaders of the merits of this
feature. Please provide as much detail and context as possible, this means explaining the use case and why it is
likely to be common.


<a name="changes"></a>
### Change Requests

Change requests cover both architectural and functional changes to how Octostar works. If you have an idea for a
new or different dependency, a refactor, or an improvement to a feature, etc  - please be sure to:

1. **Use the GitHub search** and check someone else didn't get there first
2. Take a moment to think about the best way to make a case for, and explain what you're thinking. Are you sure
this shouldn't really be a [bug report](#bug-reports) or a [feature request](#feature-requests)? Is it really one
idea or is it many? What's the context? What problem are you solving? Why is what you are suggesting better than
what's already there? Does it fit with the Roadmap?

<a name="pull-requests"></a>
### Submitting Pull Requests

Pull requests are awesome. If you're looking to raise a PR for something which doesn't have an open issue, please think carefully about [raising an issue](#raising-issues) which your PR can close, especially if you're fixing a bug. This makes it more likely that there will be enough information available for your PR to be properly tested and merged. To make sure your PR is accepted as quickly as possible, you should be sure to have read
all the guidelines on:

* [code standards](https://github.com/therebelrobot/octostar/wiki/Code-standards)
* [commit messages](https://github.com/therebelrobot/octostar/wiki/Git-workflow#commit-messages)
* [cleaning-up history](https://github.com/therebelrobot/octostar/wiki/Git-workflow#wiki-clean-up-history)
* [not breaking the build](https://github.com/therebelrobot/octostar/wiki/Git-workflow#check-it-passes-the-tests)

<a name="finalthoughts"></a>
### Final Thoughts
I guess in general, I like to not be a dick about things. I ask the same in return. I am one man, working in my spare time for this project. If it takes a while to review your code, please understand.

<a name="license"></a>
## Contributor License Agreement

By contributing your code to this repository you grant this repository's owner(s) a non-exclusive, irrevocable, worldwide, royalty-free, sublicenseable, transferable license under all of Your relevant intellectual property rights (including copyright, patent, and any other rights), to use, copy, prepare derivative works of, distribute and publicly perform and display the Contributions on any licensing terms, including without limitation: (a) open source licenses like the MIT license; and (b) binary, proprietary, or commercial licenses. Except for the licenses granted herein, You reserve all right, title, and interest in and to the Contribution.

You confirm that you are able to grant us these rights. You represent that You are legally entitled to grant the above license. If Your employer has rights to intellectual property that You create, You represent that You have received permission to make the Contributions on behalf of that employer, or that Your employer has waived such rights for the Contributions.

You represent that the Contributions are Your original works of authorship, and to Your knowledge, no other person claims, or has the right to claim, any right in any invention or patent related to the Contributions. You also represent that You are not legally obligated, whether by entering into an agreement or otherwise, in any way that conflicts with the terms of this license.

This repository's owner(s) acknowledges that, except as explicitly described in this Agreement, any Contribution which you provide is on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.