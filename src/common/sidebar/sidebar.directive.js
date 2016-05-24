(function(){
    'use strict';

    angular.module('motech-common')
        .directive('motechSidebar', motechSidebar);

    motechSidebar.$inject = ['$rootScope'];
    function motechSidebar ($rootScope) {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: '/common/sidebar/sidebar.html',
            replace: true,
            scope: {
                title: "@?"
            },
            link: function(scope, element, attrs) {
                element.appendTo('.app');
                jQuery('body').on('click','.motech-sidebar-button', function(event){
                    event.preventDefault();
                    if(jQuery('.app').hasClass('has-sidebar')){
                        hide();
                    } else {
                        show();
                    }
                });
                element.on('click', 'header .close', function(event){
                    event.preventDefault();
                    hide();
                });
                $rootScope.$on('$stateChangeStart', function(){
                    hide();
                    element.remove();
                });

                scope.$on('$destroy', function(){
                    jQuery('body').off('click','.motech-sidebar-button');
                });

                function show(){
                    jQuery('.app').addClass('has-sidebar');
                }
                function hide(){
                    jQuery('.app').removeClass('has-sidebar');
                }
            }
        };
    }

})();