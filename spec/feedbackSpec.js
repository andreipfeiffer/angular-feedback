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
        }));

    });

})();
