/**
 * @license ng-notify v0.4.0
 * http://matowens.github.io/ng-notify
 * (c) 2014 MIT License, matowens.com
 */
(function() {
    'use strict';

    /**
     * @description
     *
     * This module provides any AngularJS application with a simple, lightweight
     * system for displaying notifications of varying degree to it's users.
     *
     */
     var module = angular.module('ngNotify', []);

     module.provider('ngNotify', function() {

        this.$get = ['$document', '$compile', '$rootScope', '$timeout', '$interval',

            function($document, $compile, $rootScope, $timeout, $interval) {

                var options = {
                    position: 'top',
                    duration: 3000,
                    type: 'info',
                    sticky: true
                };

                var userOpts = {};

                var types = {
                    infoClass: 'ngn-info',
                    errorClass: 'ngn-error',
                    successClass: 'ngn-success',
                    warnClass: 'ngn-warn',
                    grimaceClass: 'ngn-grimace',
                    neutralClass: 'ngn-neutral'
                };

                var positions = {
                    bottom: 'ngn-bottom',
                    top: 'ngn-top'
                };

                var notifyTimeout;
                var notifyInterval;
                var notifyDismiss;

                // Template and scope...

                var notifyScope = $rootScope.$new();
                var tpl = $compile(
                    '<div class="ngn" ng-class="ngNotify.notifyClass" ng-click="!ngNotify.isLoading && dismiss()">' +
                        // '<span class="ngn-dismiss">&times;</span>' +
                        '<span class="ngn-message" ng-if="!ngNotify.isLoading">{{ ngNotify.notifyMessage }}</span>' +
                        '<span class="ngn-spinner" ng-if="ngNotify.isLoading"></span>' +
                    '</div>'
                )(notifyScope);

                $document.find('body').append(tpl);

                var setType = function(providedType) {
                    var type = (providedType || options.type) + 'Class';
                    return types[type] || types.infoClass;
                };

                var setPosition = function(providedPosition) {
                    var position = providedPosition || options.position;
                    return positions[position] || positions.top;
                };

                var setDuration = function(providedDuration) {
                    var duration = providedDuration || options.duration;
                    return angular.isNumber(duration) ? duration : 3500;
                };

                var setSticky = function(providedSticky) {
                    var sticky = providedSticky || options.sticky;
                    return sticky ? true : false;
                };

                var notifyReset = function() {
                    notifyScope.ngNotify = {
                        notifyClass: '',
                        notifyMessage: '',
                        isLoading: false
                    };
                };

                notifyScope.dismiss = function() {
                    if ( notifyScope.ngNotify.isLoading ) {
                        notifyScope.ngNotify.notifyClass += ' ngn-unloading';
                    } else {
                        notifyScope.ngNotify.notifyClass += ' ngn-contract';
                    }

                    notifyDismiss = $timeout(function() {
                        notifyReset();
                    }, 500);
                };


                var el = tpl;

                /**
                 * Our primary object containing all public API methods and allows for all our functionality to be invoked.
                 */
                var notifyObject = {

                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    set: function(message, userOpt) {

                        if (!message) {
                            return;
                        }

                        $interval.cancel(notifyInterval);
                        $timeout.cancel(notifyTimeout);
                        $timeout.cancel(notifyDismiss);

                        if (typeof userOpt === 'object') {
                            userOpts = {
                                type: userOpt.type || undefined,
                                position: userOpt.position || undefined,
                                duration: userOpt.duration || undefined,
                                sticky: userOpt.sticky || undefined
                            };
                        } else {
                            userOpts.type = userOpt;
                        }


                        var sticky = setSticky(userOpts.sticky);
                        var duration = setDuration(userOpts.duration);
                        var notifyClass = setType(userOpts.type) + ' ';

                        notifyClass += setPosition(userOpts.position);
                        notifyClass += sticky ? ' ngn-sticky' : '';
                        notifyClass += ' ngn-animate';

                        notifyScope.ngNotify = notifyScope.ngNotify || {};

                        notifyScope.ngNotify.notifyClass = '';
                        notifyScope.ngNotify.notifyMessage = message;
                        notifyScope.ngNotify.isLoading = false;

                        if (!sticky) {
                            notifyTimeout = $timeout(function() {
                                notifyScope.dismiss();
                            }, duration);
                        }

                        $timeout(function() {
                            notifyScope.ngNotify.notifyClass = notifyClass;
                        }, 1);
                    },

                    dismiss: function() {
                        notifyScope.dismiss();
                    },

                    load: function() {
                        $interval.cancel(notifyInterval);
                        $timeout.cancel(notifyTimeout);
                        $timeout.cancel(notifyDismiss);

                        var notifyClass = setType('neutral') + ' ' +
                                          setPosition() + ' '+
                                          ' ngn-loading';

                        notifyScope.ngNotify = notifyScope.ngNotify || {};
                        notifyScope.ngNotify.isLoading = true;

                        notifyScope.ngNotify.notifyClass = '';
                        notifyScope.ngNotify.notifyMessage = '';

                        $timeout(function() {
                            notifyScope.ngNotify.notifyClass = notifyClass;
                        }, 1);
                    },


                    // User customizations...

                    /**
                     * Adds a new, user specified notification type that they
                     * can then use throoughout their application.
                     *
                     * @param {String} typeName  - the name for this new type that will be used when applying it via configuration.
                     * @param {String} typeClass - the class that this type will use when applying it's styles.
                     */
                    addType: function(typeName, typeClass) {
                        if (!typeName || !typeClass) { return; }
                        types[typeName + 'Class'] = typeClass;
                    }

                };

                return notifyObject;
            }
        ];
     });
})();
