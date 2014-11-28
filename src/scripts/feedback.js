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
                    infoClass: 'fdb-info',
                    errorClass: 'fdb-error',
                    successClass: 'fdb-success',
                    warnClass: 'fdb-warn',
                    grimaceClass: 'fdb-grimace',
                    neutralClass: 'fdb-neutral'
                };

                var timeoutAutoDismiss;
                var timeoutDismiss;

                var feedbackScope = $rootScope.$new();

                feedbackScope.isActive = false;

                var tpl = $compile(
                    '<div class="fdb" ng-show="isActive">' +
                        '<div class="fdb-inner" ng-class="feedbackClass" ng-click="!isLoading && dismiss()">' +
                            '<span class="fdb-message" ng-if="!isLoading">{{ message }}</span>' +
                            '<span class="fdb-spinner" ng-if="isLoading"></span>' +
                        '</div>' +
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
                    feedbackScope.isActive = false;
                    feedbackScope.feedbackClass = '';
                    feedbackScope.message = '';
                    feedbackScope.isLoading = false;
                };

                feedbackScope.dismiss = function() {
                    if ( feedbackScope.isLoading ) {
                        feedbackScope.feedbackClass += ' fdb-unloading';
                    } else {
                        feedbackScope.feedbackClass += ' fdb-contract';
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
                        c += sticky ? ' fdb-sticky' : '';
                        c += ' fdb-expand';

                        feedbackScope.isActive = true;
                        feedbackScope.feedbackClass = c;
                        feedbackScope.isLoading = false;
                        feedbackScope.message = message;

                        if (!sticky) {
                            timeoutAutoDismiss = $timeout(function() {
                                feedbackScope.dismiss();
                            }, duration);
                        }
                    },

                    load: function() {
                        $timeout.cancel(timeoutAutoDismiss);
                        $timeout.cancel(timeoutDismiss);

                        var c = setType('neutral') + ' ' + ' fdb-loading';

                        feedbackScope.isActive = true;
                        feedbackScope.feedbackClass = c;
                        feedbackScope.message = '';
                        feedbackScope.isLoading = true;
                    },

                    dismiss: function() {
                        feedbackScope.dismiss();
                    },

                    isActive: function() {
                        return !!feedbackScope.isActive;
                    },

                    isLoading: function() {
                        return !!feedbackScope.isLoading;
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
