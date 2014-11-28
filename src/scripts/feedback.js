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

                var defaults = {
                    duration: 3000,
                    type: 'info',
                    sticky: false
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
                    var type = (providedType || defaults.type) + 'Class';
                    return types[type] || types.infoClass;
                };

                var reset = function() {
                    feedbackScope.isActive = false;
                    feedbackScope.feedbackClass = '';
                    feedbackScope.message = '';
                    feedbackScope.isLoading = false;
                    delete feedbackScope.type;
                    delete feedbackScope.sticky;
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
                        angular.extend(defaults, params);
                    },

                    notify: function(message, userOpt) {
                        var options = {};

                        if (!message) {
                            return;
                        }

                        $timeout.cancel(timeoutAutoDismiss);
                        $timeout.cancel(timeoutDismiss);

                        if (typeof userOpt === 'object') {
                            options = angular.extend( {}, defaults, userOpt );
                        } else {
                            options = angular.extend( {}, defaults );
                            options.type = userOpt;
                        }

                        var c = setType(options.type) + ' ';
                        c += options.sticky ? ' fdb-sticky' : '';
                        c += ' fdb-expand';

                        feedbackScope.isActive = true;
                        feedbackScope.feedbackClass = c;
                        feedbackScope.isLoading = false;
                        feedbackScope.message = message;
                        feedbackScope.type = options.type;
                        feedbackScope.sticky = options.sticky;

                        if ( !options.sticky ) {
                            timeoutAutoDismiss = $timeout(function() {
                                feedbackScope.dismiss();
                            }, options.duration);
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
                        delete feedbackScope.type;
                        delete feedbackScope.sticky;
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

                    isSticky: function() {
                        return !!feedbackScope.sticky;
                    },

                    getType: function() {
                        return feedbackScope.type;
                    },

                    getMessage: function() {
                        return feedbackScope.message;
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
