#angular-feedback changelog

##v0.9.2
- coveralls integration

##v0.9.1
- travis-ci integration

##v0.9.0
- add unit-tests

##v0.8.0
- change name of the package to: `angular-feedback`
- write the README.md file
- fill the CHANGELOG.md file
- register the module as a `bower` package

##v0.7.6
- just refactor & simplify code

##v0.7.5
- **new stuff**: added even more getters: isSticky(), getType(), getMessage()

##v0.7.4
- **new stuff**: added state getters: isActive(), isLoading()

##v0.7.3
- minor styling changes
- add a wrapper to the markup, to allow easier animations

##v0.7.2
- re-write the way animations are performed, to allow action sequencing and ditch the need for $timeout.

##v0.7.1
- Gruntfile updates

##v0.7.0
- change module name to `feedback`
- make notifications re-start animation, when a notification is triggered while other is displayed (using $timeout)

##v0.6.0
- forked the project from `matowens/ng-notify`
- **new feature**: added loader feature
- **new feature**: added CSS-based animations
- cleanup unused code

##v0.5.0
- **new feature**: added a dismiss method to give additional dev control over how notifications display

##v0.4.2
- update for version bumps
- same pathing fix for the package.json file

##v0.4.1
- pathing fix for bower, bower.json file

##v0.4.0
- **new feature**: sticky notifications, dismissable by the user
- standardized comments throughout module
- organized module structure

##v0.3.0
- **new feature**: configurable options for individual notifications
- renamed type option from *defaultType* to just *type* for consistency
- introduced changelog

##v0.2.1
- better organized for bower distribution

##v0.2.0
- initial bower release
