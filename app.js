let pagina = 1;

document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('btnSiguiente').addEventListener('click', () => {
		if (pagina < 3000) {
			pagina += 1;

			cargarPeliculas();
		}

	});

	document.getElementById('btnAnterior').addEventListener('click', () => {
		if (pagina > 1) {
			pagina -= 1;

			cargarPeliculas();
		}
	});



	cargarPeliculas();
});









const cargarPeliculas = async () => {
	const resultado = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=add146d6d41de6ba2725be4b62bb24a9&language=es-MX&page=${pagina}`);

	console.log(resultado);

	if (resultado.status === 200) {

		const data = await resultado.json();

		console.log(data.results)

		let contenido = '';

		data.results.forEach(movie => {

			contenido += `
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
					<h3 class="titulo">${movie.title}</h3>
				</div>
			`
		});

		document.getElementById('contenedor').innerHTML = contenido;

	} else if (resultado.status === 401) {
		console.log("La Api key es incorrecta!!");

	} else if (resultado.status == 404) {
		console.log("La conexiòn con el servidor a fallado!!");
	} else {
		console.log("Ha ocurrido un error!")
	}

}

cargarPeliculas();