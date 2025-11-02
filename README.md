
# Slider de imágenes

## Archivos incluidos

- `index.html`: plantilla principal con el slider y el panel de texto.
- `styles.css`: estilos responsivos para el diseño y animaciones.
- `slider.js`: lógica del slider (autoplay, títulos, miniaturas, animaciones).

## Cómo probar

1. Abre `index.html` en tu navegador (doble clic o arrastrar al navegador). Para mejores resultados usa un servidor local (por ejemplo `python -m http.server 8000` desde la carpeta del proyecto) y abre `http://localhost:8000`.
2. El slider carga las imágenes listadas en el array `sliderData` dentro de `slider.js`. Las rutas se asumen relativas a la raíz del proyecto (`images/1.jpg`, `images/2.jpg`, ...).

## Configuraciones ajustables en `slider.js`

Puedes modificar fácilmente los siguientes parámetros para personalizar el slider:

- **Imágenes y textos**: Edita el array `sliderData` para agregar, quitar o cambiar imágenes, títulos y subtítulos.
	```js
	const sliderData = [
		{ src: "images/1.jpg", title: "Título 1", subtitle: "Subtítulo opcional" },
		// ...
	];
	```
- **Duración del autoplay**: Cambia el tiempo de transición automática (por defecto 8000 ms = 8 segundos):
	```js
	let timer = setInterval(() => { ... }, 8000); // Cambia 8000 por el valor deseado
	```
- **Duración del efecto de zoom**: Ajusta el tiempo de animación del zoom en la imagen principal (por defecto 3.5 segundos):
	```js
	mainImg.style.animation = 'sliderZoomIn 3.5s cubic-bezier(.4,1.4,.6,1) 1';
	```
- **Cantidad de miniaturas**: Modifica el bucle en `renderThumbs` para mostrar más o menos miniaturas:
	```js
	for(let i=1; i<=3; i++) { ... } // Cambia el 3 por la cantidad deseada
	```
- **Animaciones y estilos**: Puedes personalizar los keyframes y transiciones en `styles.css` para cambiar el tipo de efecto visual.

## Notas

- Si agregas o quitas imágenes, actualiza el array `sliderData` en `slider.js` para que coincida con los nombres reales de archivo.
- Las imágenes se adaptan automáticamente al tamaño del contenedor principal (`.slider-main`), que tiene proporción 16:9 y máximo 1200px de ancho.
- Para mejor calidad visual, usa imágenes de al menos 1200x675 px o proporción 16:9.

