angular.module("Reproductor", [])
    .controller("ControladorReproductor", function ($scope, $http) {

        $scope.artistas = [];
        $scope.canciones = [];
        $scope.artistaSeleccionado = "";
        $scope.cancionSeleccionada = "";
        $scope.rutaCancion = "";
        $scope.reproductor = new Audio();

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
            $scope.rutaCancion = "canciones/" + $scope.artistaSeleccionado + " - " + cancion.Titulo + ".mp3";
        }


        $scope.reproducir = function () {
            $scope.reproductor.src = $scope.rutaCancion;
            $scope.reproductor.play();
        }
    });