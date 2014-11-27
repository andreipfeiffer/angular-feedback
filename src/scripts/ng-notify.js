/**
 * @license
 * http://matowens.github.io/ng-notify
 * (c) 2014 MIT License, matowens.com
 */
(function() {

    'use strict';

     var module = angular.module('feedback', []);

     module.provider('feedback', function() {

        this.$get = ['$document', '$compile', '$rootScope', '$timeout',

            function($document, $compile, $rootScope, $timeout) {

                var options = {
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

                var timeoutAutoDismiss;
                var timeoutDismiss;

                var feedbackScope = $rootScope.$new();
                var tpl = $compile(
                    '<div class="ngn" ng-class="feedbackClass" ng-click="!isLoading && dismiss()">' +
                        '<span class="ngn-message" ng-if="!isLoading">{{ message }}</span>' +
                        '<span class="ngn-spinner" ng-if="isLoading"></span>' +
                    '</div>'
                )(feedbackScope);

                $document.find('body').append(tpl);

                var setType = function(providedType) {
                    var type = (providedType || options.type) + 'Class';
                    return types[type] || types.infoClass;
                };

                var setDuration = function(providedDuration) {
                    var duration = providedDuration || options.duration;
                    return angular.isNumber(duration) ? duration : 3500;
                };

                var setSticky = function(providedSticky) {
                    var sticky = providedSticky || options.sticky;
                    return sticky ? true : false;
                };

                var reset = function() {
                    feedbackScope.feedbackClass = '';
                    feedbackScope.message = '';
                    feedbackScope.isLoading = false;
                };

                feedbackScope.dismiss = function() {
                    if ( feedbackScope.isLoading ) {
                        feedbackScope.feedbackClass += ' ngn-unloading';
                    } else {
                        feedbackScope.feedbackClass += ' ngn-contract';
                    }

                    timeoutDismiss = $timeout(function() {
                        reset();
                    }, 500);
                };


                var el = tpl;

                /**
                 * Our primary object containing all public API methods and allows for all our functionality to be invoked.
                 */
                var feedbackObject = {

                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    notify: function(message, userOpt) {

                        if (!message) {
                            return;
                        }

                        $timeout.cancel(timeoutAutoDismiss);
                        $timeout.cancel(timeoutDismiss);

                        if (typeof userOpt === 'object') {
                            userOpts = {
                                type: userOpt.type || undefined,
                                duration: userOpt.duration || undefined,
                                sticky: userOpt.sticky || undefined
                            };
                        } else {
                            userOpts.type = userOpt;
                        }


                        var sticky = setSticky(userOpts.sticky);
                        var duration = setDuration(userOpts.duration);
                        var c = setType(userOpts.type) + ' ';
                        c += sticky ? ' ngn-sticky' : '';
                        c += ' ngn-animate';

                        feedbackScope.feedbackClass = '';
                        feedbackScope.isLoading = false;

                        if (!sticky) {
                            timeoutAutoDismiss = $timeout(function() {
                                feedbackScope.dismiss();
                            }, duration);
                        }

                        $timeout(function() {
                            feedbackScope.feedbackClass = c;
                            feedbackScope.message = message;
                        }, 50);
                    },

                    load: function() {
                        $timeout.cancel(timeoutAutoDismiss);
                        $timeout.cancel(timeoutDismiss);

                        var c = setType('neutral') + ' ' + ' ngn-loading';

                        feedbackScope.feedbackClass = '';
                        feedbackScope.message = '';

                        $timeout(function() {
                            feedbackScope.feedbackClass = c;
                            feedbackScope.isLoading = true;
                        }, 50);
                    },

                    dismiss: function() {
                        feedbackScope.dismiss();
                    },

                    addType: function(typeName, typeClass) {
                        if (!typeName || !typeClass) { return; }
                        types[typeName + 'Class'] = typeClass;
                    }

                };

                return feedbackObject;
            }
        ];
     });
})();
