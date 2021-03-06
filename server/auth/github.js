var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var setCredentials = function(credentials) {
    var callbackURL = global.applicationHost.concat("/passport/auth/github/callback");
    passport.use(new GitHubStrategy({
            clientID: credentials.clientID,
            clientSecret: credentials.clientSecret,
            callbackURL: callbackURL,
            profileFields: ['id', 'name', 'displayName', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            var userProfile = {
                id: profile.id || "",
                name: profile.displayName || profile.username || "",
                username: profile.username || profile.id || "",
                email: profile.email || (profile.emails && profile.emails[0] && profile.emails[0].value) || "",
                givenName: profile.first_name || "",
                familyName: profile.last_name || "",
                provider: "github"
            };
            return done(null, userProfile);
        }
    ));
};

module.exports = {
    passport: passport,
    setCredentials: setCredentials
};
