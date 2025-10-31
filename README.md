# Slider de imágenes

Archivos incluidos:

- `index.html` - plantilla principal con el slider y el panel de texto.
- `styles.css` - estilos responsivos para reproducir el diseño adjunto (imagen a la izquierda, tipografía a la derecha).
- `slider.js` - lógica del slider (orden ascendente, autoplay, controles, teclado).

Cómo probar:

1. Abre `index.html` en tu navegador (doble clic o arrastrar al navegador). Para mejores resultados usa un servidor local (por ejemplo `python -m http.server 8000` desde la carpeta del proyecto) y abre `http://localhost:8000`.
2. El slider carga las imágenes listadas en `window.IMAGES` en `index.html`. Las rutas se asumen relativas a la raíz del proyecto (`images/1.jpg`, `images/2.jpg`, ...).

Notas:

- Si agregas o quitas imágenes, actualiza el array `window.IMAGES` dentro de `index.html` para que coincida con los nombres reales de archivo.
- El script intenta ordenar numéricamente los nombres (para que `1.jpg` vaya antes que `10.jpg`).

- Ahora `window.IMAGES` en `index.html` contiene objetos con { src, title, subtitle } para que cada imagen muestre su título y subtítulo. Edita esos valores si quieres textos personalizados por foto.

