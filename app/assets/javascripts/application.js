//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require ember-auth
//= require bootstrap
//= require_self
//= require_tree ./templates

App = Ember.Application.create();

App.Adapter = Auth.RESTAdapter.extend();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'App.Adapter'
});

App.User = DS.Model.extend({
  email: DS.attr('string')
});

Auth.Config.reopen({
  tokenCreateUrl: '/accounts/sign_in',
  tokenDestroyUrl: '/accounts/sign_out',
  tokenKey: 'auth_token',
  idKey: 'user_id',
  signInRoute: 'sign_in',
  authRedirect: true,
  signInRedirectFallbackRoute: 'user',
  signOutRedirectFallbackRoute: 'index'
});

App.Router.map(function() {
  this.route("sign_in");
  this.route("user");
});

App.SignInController = Auth.SignInController.extend({
  email: "guest@localdomain.local",
  password: "12345678",

  signIn: function () {
    this.registerRedirect();
    Auth.signIn({
      email: this.get('email'),
      password: this.get('password')
    });
  }
});

App.UserRoute = Auth.Route.extend();

App.UserController = Auth.SignOutController.extend({
  user: function() {
    if (Auth.currentUserId) {
      return App.User.find(Auth.currentUserId);
    }
    return {};
  }.property('Auth.currentUserId'),

  signOut: function () {
    this.registerRedirect();
    Auth.signOut();
  }
});
