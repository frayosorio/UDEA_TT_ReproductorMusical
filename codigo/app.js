angular.module("Reproductor", [])
    .controller("ControladorReproductor", function ($scope, $http, $interval) {

        $scope.artistas = [];
        $scope.canciones = [];
        $scope.artistaSeleccionado = "";
        $scope.cancionSeleccionada = "";
        $scope.rutaCancion = "";
        $scope.reproductor = new Audio();
        $scope.duracion = 0;
        $scope.tiempoActual = 0;

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
            $scope.reproductor.src = $scope.rutaCancion;
            $scope.duracion = $scope.reproductor.duration;
            $scope.tiempoActual = 0;
        }

        $scope.reproducir = function () {
            $scope.reproductor.play();
        }

        $scope.pausar = function () {
            $scope.reproductor.pause();
        }

        $scope.ubicarTiempoCancion = function () {
            $scope.reproductor.currentTime = $scope.tiempoActual;
        }

        $interval(function () {
            if (!$scope.reproductor.paused) {
                $scope.tiempoActual = $scope.reproductor.currentTime;
            }
        }, 500, 0, true);

    });