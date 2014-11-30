# angular-feedback

[![Build Status](https://travis-ci.org/andreipfeiffer/angular-feedback.svg?branch=master)](https://travis-ci.org/andreipfeiffer/angular-feedback)
[![Coverage Status](https://coveralls.io/repos/andreipfeiffer/angular-feedback/badge.png?branch=master)](https://coveralls.io/r/andreipfeiffer/angular-feedback?branch=master)

A simple, lightweight module for displaying notifications and loaders in your AngularJS app.

[View Demo](http://andreipfeiffer.github.io/angular-feedback/)

This is a personal edit of the __ng-notify__ module, by __matowens__. For a list of changes, please see the [changes](#changes-to-ng-notify) section at the bottom.

For the original module, please see: [https://github.com/matowens/ng-notify](https://github.com/matowens/ng-notify)

### Requirements

AngularJS is the only dependency.  All animations are CSS-based.

# Installation

You can install using Bower.

    bower install angular-feedback --save

Or, you can download source files straight from this repo, they're located in the `dist` folder.
Just include the minified version of both `.js` and `.css` files.

# Usage

After including **feedback.min.js** and **feedback.min.css**, inject the `feedback` provider into your project.

    // inject it in your application module
    var app = angular.module('myApp', ['feedback']);

    // then inject and use it in your controllers
    app.controller('MainCtrl', ['feedback', function(feedback) {
        feedback.load();
    }]);

Now you can trigger notifications and loaders from anywhere in your app.

### 1. Notifications

To display a notification, just use the `notify` method.

    feedback.notify('Your notification message goes here!');

To specify the **type** of notification to display, provide the optional **type** param. (For available types, check the [methods](#methods) below.)

    feedback.notify('Your error message goes here!', 'error');

### 2. Loaders

To display a loader, just use the `load` method.

    feedback.load();

To dismiss a loader, or a notification, just use the `dismiss` method.

    feedback.dismiss();

# Advanced Usage

### Set Default Configuration

You can override the default options for all notifications by using the `config` method. None of these options are required. (For available options, check the [config method](#config-options-) below.)

    feedback.config({
        type: 'success',
        duration: 3000,
        sticky: false
    });

### Individual Configurations

You can also pass an object of options to individual notifications. You can pass through any combination of the available options here as well. For example:

    feedback.notify('Your first message.', {
        type: 'warn',
        duration: 1000
    });

### Sticky Notifications

Sticky notifications allow you to set a persistant notification that doesn't fade away. To do this, simply set the `sticky` attribute to true:

    feedback.notify('This is sticky.', {
        sticky: true
    });

This will give the user the option of closing the notification themselves. If you need to dismiss a notification manually, you can do so with the `dismiss` method like this:

    feedback.dismiss();

**NOTE:**
*Any time a notification is set to sticky, the duration attribute will be ignored since the notification will not be automatically fading out.*

# Methods

#### config( options )
Sets default settings for all notifications to take into account when displaying.
- **options** - *object* - an object of options that overrides the default settings.
    - **type**: *string* - *optional* - sets the default notification type when a type isn't explicitly set.
        - info *(default)*
        - error
        - success
        - warn
        - grimace
    - **duration**: *integer* - *optional* - the duration the notification stays visible to the user, in milliseconds.
    - **sticky**: *boolean* - *optional* - determines whether or not the message will fade at the end of the duration or if the message will persist until the user dismisses it themselves. When true, duration will not be set, even if it has a value. *(false by default)*.

#### notify( message, [type] )
Displays a notification message and sets the formatting/behavioral options for this one notification.
- **message**: *string* - *required* - the message to display in your notification.
- **type**: *string* - *optional* - the type of notification to display.
    - info *(default)*
    - error
    - success
    - warn
    - grimace

#### load()
Displays a loader element.

#### dismiss()
Manually removes any notification or loader, by fading them away. The animation is different, depending weather it's a loader or a notification.

# Getter helpers

#### isActive()
Returns `true` if there is any type of feedback displayed (notification of loader). Otherwise, returns `false`.

#### isLoading()
Returns `true` if there is loader displayed. Otherwise, returns `false`.

#### isSticky()
Returns the value of the *sticky* option. Defaults to `undefined` if a loader is active, or no feedback active.

#### getType()
Returns the value of the *type* option. Defaults to `undefined` if a loader is active, or no feedback active.

#### getMessage()
Returns the text message. Defaults to `''`.

# Changes to ng-notify

Here is a list of the additions and removals from the original module:

* **Removed the `position` option**. I felt it was something I didn't need anymore, since I have changed the position of the elements. Anyone can override the CSS, to adjust the placement and the styles to their needs.
* **Removed the `theme` option**. Theming the module should be out of scope, from my point of view. The module should not bundle multiple themes. Theming is a presentational concept, so it should be controlled from CSS.
* **Removed dismiss trigger**. I prefer to click the whole notification to dismiss.
* **Move all animations to CSS**. Its easier and more convenient to control animations from CSS.
* **Add "loader" feature**. Usually you display notifications on a callback of a request. And requests often need a loader. So, I felt that these to feature should go together.
* **Add getter methods**. A bunch of public methods were added, to allow devs to query the state and options. Also, very useful for testing.
* **Add unit-tests**. 100% code coverage.
