# angular-feedback

A simple, lightweight module for displaying notifications and loaders in your AngularJS app.

[View Demo](http://andreipfeiffer.github.io/feedback/)

This is a personal edit of the __ng-notify__ service, by __matowens__.
For the original, please see: [https://github.com/matowens/ng-notify](https://github.com/matowens/ng-notify)

### Requirements

AngularJS is the only dependency.  All animations are CSS-based.

# Installation

You can install using Bower.

    bower install angular-feedback --save

Or, you can also download source files straight from this repo, they're located in the `dist` dir.
Just include the minified version of both `.js` and `.css` files.

# Usage

After including **feedback.min.js** and **feedback.min.css**, inject the `feedback` provider into your project.

    var app = angular.module('demo', ['feedback']);

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

You can override the default options for all notifications by using the `config` method. None of these options are required. (For available options, check the [config method](#config) below.)

    feedback.config({
        type: 'info',
        duration: 3000,
        sticky: false
    });

### Individual Configurations

You can also pass an object of options to individual notifications. You can pass through any combination of the available options here as well. For example:

    feedback.notify('Your first message.', {
        duration: 3000,
        sticky: false
    });

### Sticky Notifications

Sticky notifications allow you to set a persistant notification that doesn't fade away. To do this, simply set the `sticky` attribute to true:

    feedback.notify('This is sticky.', {
        sticky: true
    });

This will give the user the option of closing the notification themselves. If you need to dismiss a notification manually, you can do so with the `dismiss` method like this:
    
    feedback.dismiss();

**NOTE**
*Any time a notification is set to sticky, the duration attribute will be ignored since the notification will not be automatically fading out.*

# Methods

### notify( message, [type] );
Displays a notification message and sets the formatting/behavioral options for this one notification.
- **message**: *string* - *required* - the message to display in your notification.
- **type**: *string* - *optional* - the type of notification to display.
    - info *(default)*
    - error
    - success
    - warn
    - grimace

### load();
Displays a loader element.

### dismiss();
Fades away and removes any notification or loader.
