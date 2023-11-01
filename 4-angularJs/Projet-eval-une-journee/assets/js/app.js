// filename: @@__SOURCE_FILENAME__ 
var app = angular.module('SpirApp', ['angularUtils.directives.dirPagination']);

app.factory('SpirFactory', function() {
    var factory = {
        servicesArboList: bouchon.dataServiceArbo.servicesArboList,
        getUsersByService: function(serviceId) {
            var result = [];
            //  filter by userId
            angular.forEach(bouchon.dataUser.userList, function(value, key) {
                if (value.service_key == serviceId) {
                    result.push(value);
                }
            });
            //sort array by name after return
            result.sort(function(a, b) {
                if (a.nom > b.nom)
                    return 1;
                if (a.nom < b.nom)
                    return -1;
                // a doit etre egale a b
                return 0;
            });
            return result;
        }
    };
    return factory;
});

app.controller("SearchServiceCrtl", function($scope, $timeout, $http) {
    // variables DOM
    var searchForm = document.getElementById('searchForm'),
        loaderElement = document.getElementById('loader');

    // lance la recherche de service au submit du formulaire
    $scope.rechercherServices = function() {
        //variables censees etre postees...
        var ajaxParams = {
            service: searchForm.elements.txtService.value,
            fonction: searchForm.elements.txtFonction.value,
            poste: searchForm.elements.txtPoste.value,
        };
        //le loader est affiche
        loaderElement.classList.remove('hidden');
        //simulation d'une requete ajax async de 2 secondes
        $timeout(function() {

            // simulation le post devient get...
            $http.get('assets/js/data/json.bouchon.ajax.js', ajaxParams).
            success(function(data, status, headers, config) {
                // simulation la tableau json (reponse) change de longueur de maniere aleatoire pour simuler des resultats differents
                var random = Math.floor((Math.random() * 10) + 1),
                    temp = [];

                if (data instanceof Array) {
                    temp = data.slice(1, random);
                }
                $scope.serviceList = temp;
            }).
            error(function(data, status, headers, config) {
                if (window.console && window.console.error) {
                    console.error(new Error('Requete ajax failed'));
                }
            });
            // le loader est masque
            loaderElement.classList.add("hidden");
        }, 1000);
    };
});

// controller de la liste des utilisateurs ainsi que la liste complete des services en arbo.
app.controller("SearchPersonCrtl", function($scope, $location, SpirFactory) {

    // liste complete des services en arbo
    $scope.servicesArboList = SpirFactory.servicesArboList;

    // declaration d'un variable attachee au scope pouvant etre ecoutee.
    $scope.location = $location;

    // ecoute de l'id passe en parametre dans l'url
    $scope.$watch('location.search()', function() {
        var param = $scope.location.search();

        if (param.hasOwnProperty('idservice')) {
            $scope.serviceSelected = param.idservice;
            // liste des utlisateurs filtree par le factory avec le user id
            $scope.userList = SpirFactory.getUsersByService($scope.serviceSelected);
        } else {
            $scope.serviceSelected = '';
        }
    });
    // permet de mettre a jour la class du service selectionne
    $scope.selectedItem = function(id) {
        if ($scope.serviceSelected == id) {
            return true;
        }
        return false;
    };
});
