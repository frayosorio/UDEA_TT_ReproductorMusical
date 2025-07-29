angular.module("Reproductor", [])
    .controller("ControladorReproductor", function ($scope, $http) {

        $scope.artistas = [];
        $scope.canciones = [];
        $scope.artistaSeleccionado = "";
        $scope.cancionSeleccionada = "";

        //cargue de los datos (solo posible mediante servicio)
        $http.get("datos/Musiteca.json")
            .then(function (datos) {
                $scope.artistas = datos.data.Artistas;
            });

        $scope.seleccionarArtista = function (artista) {
            $scope.canciones = artista.Canciones;
            $scope.artistaSeleccionado = artista.Nombre;
        }

        $scope.seleccionarCancion = function (cancion) {
            $scope.cancionSeleccionada = cancion.Titulo + " - " + $scope.artistaSeleccionado;
        }
    });