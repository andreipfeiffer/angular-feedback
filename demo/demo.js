var app = angular.module('demo', ['feedback']);

app.controller('MainCtrl', ['$scope', 'feedback',
    function($scope, feedback) {
        'use strict';

        // Custom additons...
        /*
        feedback.addType('notice', 'my-notice-type');
        feedback.set('This is my notice type!', 'notice');
        */
        // Demo notifications...

        $scope.notify = function(type) {
            switch(type) {
                case 'success':
                    feedback.notify('You have successfully logged in!', {
                        type: 'success'
                    });
                    break;
                case 'info':
                    feedback.notify('You have a new message in your inbox.', 'info');
                    break;
                case 'warn':
                    feedback.notify('Please login before accessing that part of the site.', 'warn');
                    break;
                case 'error':
                    feedback.notify('The action you are trying to take does not exist.', 'error');
                    break;
                case 'grimace':
                    feedback.notify('An additional notification type to use.', 'grimace');
                    break;
                default:
                    feedback.notify('This is the current default message type. \nIt can be displayed on multiple lines.');
                    break;
            }
        };

        $scope.duration = 4000;
        $scope.durationOptions = [
            { id: 500, value: '500 ms' },
            { id: 1000, value: '1000 ms' },
            { id: 2000, value: '2000 ms' },
            { id: 4000, value: '4000 ms' },
            { id: 8000 , value: '8000 ms'}
        ];

        $scope.defaultType = 'info';
        $scope.defaultOptions = ['info', 'success', 'warn', 'error', 'grimace'];

        $scope.sticky = true;
        $scope.stickyOptions = [true, false];

        $scope.setDefaultType = function() {
            feedback.config({
                type: $scope.defaultType
            });
        };

        $scope.setDefaultDuration = function() {
            feedback.config({
                duration: $scope.duration
            });
        };

        $scope.setDefaultSticky = function() {
            feedback.config({
                sticky: $scope.sticky
            });
        };

        $scope.dismiss = function() {
            feedback.dismiss();
        };

        $scope.loadAndDismiss = function() {
            feedback.load();
            feedback.dismiss();
        };

        $scope.loadAndNotify = function() {
            feedback.load();
            feedback.notify('You have a new message in your inbox.');
        };

        $scope.setLoader = function() {
            feedback.load();
        };
    }
]);
