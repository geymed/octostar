module.exports = {
  db: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/octostar',
  // db: process.env.OPENSHIFT_MONGODB_DB_URL + 'octostar' || 'mongodb://127.0.0.1:27017/octostar',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  localAuth: false,

  githubAuth: true,
  github: {
    clientID: process.env.GITHUB_ID || 'c30888757d5c2424eef9',
    clientSecret: process.env.GITHUB_SECRET || '58b94111091b2c22338ef028fc9fb5be6bc8f001',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  }
};
