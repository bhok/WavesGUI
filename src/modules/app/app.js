(function () {
    'use strict';

    const app = angular.module('app', [
        'ngMaterial',
        'ngMessages',
        'ui.router',
        'ui.router.state.events',

        'app.ui',
        'app.welcome',
        'app.utils'
    ]);

    const AppConfig = function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        i18next.init({
            debug: true,
            lng: 'en',
            ns: 'i18n',
            fallbackLng: 'dev', // Default is dev
            useCookie: false,
            useLocalStorage: false
        }, function (err, t) {
            // initialized and ready to go!
            console.error(err, t);
        });

        $stateProvider
            .state('welcome', {
                url: '/',
                views: {
                    main: {
                        controller: 'WelcomeCtrl as $ctrl',
                        templateUrl: 'modules/welcome/templates/welcome.html'
                    }
                }
            });
    };

    AppConfig.$inject = [
        '$urlRouterProvider', '$stateProvider', '$locationProvider'
    ];

    const AppRun = function ($rootScope) {

        setTimeout(() => {
            const loader = $(document.querySelector('.app-loader'));
            loader.fadeOut(500, () => {
                loader.remove();
            });
        }, 300);

        const activeClasses = [];

        /**
         *
         * @param {Event} event
         * @param {Object} toState
         * @param {string} toState.name
         */
        const onChangeStateSuccess = (event, toState) => {
            activeClasses.forEach((className) => {
                document.body.classList.remove(className);
            });
            activeClasses.splice(0, 1, activeClasses.length);
            toState.name.split('.').filter(Boolean).forEach((className) => {
                const name = className.replace(/_/g, '-');
                document.body.classList.add(name);
                activeClasses.push(name);
            });
        };

        $rootScope.$on('$stateChangeSuccess', onChangeStateSuccess);

    };

    AppRun.$inject = ['$rootScope'];

    app.config(AppConfig);
    app.run(AppRun);
})();