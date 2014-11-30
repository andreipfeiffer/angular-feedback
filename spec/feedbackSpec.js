(function() {

    'use strict';

    describe('angular-feedback', function() {

        beforeEach(module('angular-feedback'));

        /*
        var feedbackProvider;

        beforeEach(function() {
            // Here we create a fake module just to intercept and store the provider
            // when it's injected, i.e. during the config phase.
            angular
                .module('fakeModule', function() {})
                .config(['feedbackProvider', function(provider) {
                    feedbackProvider = provider;
                }]);

            module('angular-feedback', 'fakeModule');

            // This actually triggers the injection into fakeModule
            inject(function(){});
        });
        */

        it('should be inactive by default', inject(function(feedback) {
            expect( feedback.isActive() ).toBeFalsy();
            expect( feedback.isLoading() ).toBeFalsy();
            expect( feedback.isSticky() ).toBeFalsy();
            expect( feedback.getType() ).toBeUndefined();
        }));

        it('should set loader', inject(function(feedback) {
            feedback.load();
            expect( feedback.isActive() ).toBeTruthy();
            expect( feedback.isLoading() ).toBeTruthy();
        }));

        it('should dismiss loader', inject(function(feedback, $timeout) {
            feedback.load();
            feedback.dismiss();

            $timeout.flush();

            expect( feedback.isActive() ).toBeFalsy();
            expect( feedback.isLoading() ).toBeFalsy();
        }));

        it('should not set a notification with empty message', inject(function(feedback) {
            feedback.notify('');
            expect( feedback.isActive() ).toBeFalsy();
        }));

        it('should be active when notification displayed', inject(function(feedback) {
            var message = 'Notification message';
            feedback.notify( message );
            expect( feedback.isActive() ).toBeTruthy();
            expect( feedback.isLoading() ).toBeFalsy();
        }));

        it('should dismiss notification', inject(function(feedback, $timeout) {
            feedback.notify('Notification');
            feedback.dismiss();

            $timeout.flush();

            expect( feedback.isActive() ).toBeFalsy();
            expect( feedback.isLoading() ).toBeFalsy();
        }));

        it('should set default notification to "info"', inject(function(feedback) {
            var message = 'Notification message';
            feedback.notify( message );
            expect( feedback.getType() ).toBe('info');
            expect( feedback.getMessage() ).toBe( message);
        }));

        it('should set passed notification type', inject(function(feedback) {
            var message = 'Notification message';
            feedback.notify( message, 'error' );
            expect( feedback.getType() ).toBe('error');
        }));

        it('should set passed notification object', inject(function(feedback) {
            var message = 'Notification message';
            feedback.notify( message, { type: 'success', sticky: true });
            expect( feedback.getType() ).toBe('success');
            expect( feedback.isSticky() ).toBeTruthy();
        }));

        it('should set default config', inject(function(feedback) {
            var message = 'Notification message';
            feedback.config({
                sticky: true,
                type: 'warn'
            });
            feedback.notify( message );
            expect( feedback.getType() ).toBe('warn');
            expect( feedback.isSticky() ).toBeTruthy();
        }));

    });

})();
