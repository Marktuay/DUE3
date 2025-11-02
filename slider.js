// Slider JS: imagen principal y miniaturas superpuestas tipo stack
document.addEventListener('DOMContentLoaded', function() {
	// Lista de imágenes (puedes ampliar o cargar dinámicamente)
	const sliderData = [
		{ "src": "images/1.jpg", "title": "RAÍCES DEL COMPROMISO EUROPEO CON NICARAGUA", "subtitle": "" },
		{ "src": "images/2.jpg", "title": "CORAZÓN REGIONAL DEL DIÁLOGO Y LA INTEGRACIÓN REGIONAL", "subtitle": "" },
		{ "src": "images/3.jpg", "title": "SOLIDARIDAD EUROPEA TRAS EL HURACÁN MITCH", "subtitle": "" },
		{ "src": "images/4.jpg", "title": "IMPULSANDO ESPERANZA EN LAS COMUNIDADES RURALES", "subtitle": "" },
		{ "src": "images/5.jpg", "title": "CUENCA DEL RÍO COCO: POBLACIONES PREPARADAS FRENTE AL CAMBIO CLIMÁTICO", "subtitle": "" },
		{ "src": "images/6.jpg", "title": "RUTA COLONIAL Y DE LOS VOLCANES: TURISMO SOSTENIBLE PARA  EL DESARROLLO LOCAL", "subtitle": "" },
		{ "src": "images/7.jpg", "title": "AGUA Y SANEAMIENTO PARA LA VIDA", "subtitle": "" },
		{ "src": "images/8.jpg", "title": "EDUCACIÓN: MOTOR DE DESARROLLO", "subtitle": "" },
		{ "src": "images/9.jpg", "title": "ENERGÍA LIMPIA PARA UN FUTURO SOSTENIBLE", "subtitle": "" },
		{ "src": "images/10.jpg", "title": "UNA PUERTA AL MERCADO EUROPEO", "subtitle": "" },
		{ "src": "images/11.jpg", "title": "CACAO CON ENFOQUEDE GÉNERO", "subtitle": "" },
		{ "src": "images/12.jpg", "title": "MIPYMES AGROPECUARIAS Y PESQUERAS CON VALOR AGREGADO", "subtitle": "" },
		{ "src": "images/13.jpg", "title": "ACCESIBILIDAD URBANA CON ENFOQUE INCLUSIVO", "subtitle": "" },
		{ "src": "images/14.jpg", "title": "TRAZABILIDAD SANITARIA CON ESTÁNDARES INTERNACIONALES", "subtitle": "" },
		{ "src": "images/15.jpg", "title": "INTEGRACIÓN FRONTERIZA: ACERCANDO A LOS PAÍSES DE LA REGIÓN", "subtitle": "" },
		{ "src": "images/16.jpg", "title": "MERIENDA ESCOLAR: NUTRICIÓN Y EDUCACIÓN", "subtitle": "" },
		{ "src": "images/17.jpg", "title": "EQUIPO EUROPA FRENTE AL COVID-19", "subtitle": "" },
		{ "src": "images/18.jpg", "title": "FERIA DE BECAS DE EUROPA: ABRIENDO MENTES, CAMBIANDO VIDAS", "subtitle": "" },
		{ "src": "images/19.jpg", "title": "ACUERDO DE ASOCIACIÓN UE-CA: UN PUENTE BIRREGIONAL DE DIÁLOGO, VALORES Y FUTURO COMPARTIDO", "subtitle": "" },
		{ "src": "images/20.jpg", "title": "JORNADAS EUROPEAS PARA EL DESARROLLO (EDD): UN LLAMADO DESDE LOS OCÉANOS", "subtitle": "" },
		{ "src": "images/21.jpg", "title": "MUESTRA DE CINE EUROPEO: HISTORIAS Y LENTES QUE NOS UNEN", "subtitle": "" },
		{ "src": "images/22.jpg", "title": "ÓPERA CARMEN: UN CLÁSICO UNIVERSAL EN EL CORAZÓN DE NICARAGUA", "subtitle": "" },
		{ "src": "images/23.jpg", "title": "CUÉNTAME EUROPA: SEMBRANDO SUEÑOS EN CADA PÁGINA", "subtitle": "" },
		{ "src": "images/24.jpg", "title": "PLATIQUEMOS CON EUROPA: VOCES JÓVENES, INTERCAMBIOS QUE ENRIQUECEN", "subtitle": "" },
		{ "src": "images/25.jpg", "title": "RESPUESTA A EPIDEMIAS: PROTEGER VIDAS, FORTALECER COMUNIDADES", "subtitle": "" },
		{ "src": "images/26.jpg", "title": "COMUNIDADES MÁS FUERTES FRENTE A DESASTRES NATURALES", "subtitle": "" },
		{ "src": "images/27.jpg", "title": "SEGURIDAD ALIMENTARIA EN EL CORREDOR SECO: FORTALECIENDO VIDAS Y RESILIENCIA", "subtitle": "" },
		{ "src": "images/28.jpg", "title": "HURACANES ETA E IOTA: RESPUESTA HUMANITARIA Y RESILIENCIA", "subtitle": "" }
	];

	let current = 0;
	const mainImg = document.getElementById('slider-main-img');
	const thumbsContainer = document.getElementById('slider-thumbs');

	function renderMain(idx, fromThumbIdx = null) {
		const titleDiv = document.getElementById('slider-title');
		titleDiv.textContent = sliderData[idx].title;
		// Siempre cargar la imagen principal con el efecto de zoom
		mainImg.src = sliderData[idx].src;
		mainImg.style.animation = 'none';
		void mainImg.offsetWidth;
		mainImg.style.animation = 'sliderZoomIn 3.5s cubic-bezier(.4,1.4,.6,1) 1';
	}

	function renderThumbs(idx) {
		const prevThumbs = Array.from(thumbsContainer.children);
		if (prevThumbs.length === 3) {
			prevThumbs[0].style.transform = 'translateX(-180px)';
			prevThumbs[0].style.opacity = '0';
			const thumbIdx = (idx + 3) % sliderData.length;
			const thumb = document.createElement('img');
			thumb.className = 'slider-thumb grow';
			thumb.src = sliderData[thumbIdx].src;
			thumb.alt = 'Miniatura ' + (thumbIdx+1);
			thumb.style.transform = 'translateX(180px) scale(0.7)';
			thumb.style.opacity = '0.7';
			thumb.addEventListener('click', () => {
				current = thumbIdx;
				renderMain(current, 2); // 2 = última miniatura
				renderThumbs(current);
			});
			thumbsContainer.appendChild(thumb);
			setTimeout(() => {
				thumb.classList.remove('grow');
				thumb.style.transform = 'translateX(0) scale(1)';
				thumb.style.opacity = '1';
				setTimeout(() => {
					if (thumbsContainer.firstChild) {
						thumbsContainer.removeChild(thumbsContainer.firstChild);
					}
				}, 400);
			}, 1600);
		} else {
			thumbsContainer.innerHTML = '';
			for(let i=1; i<=3; i++) {
				const thumbIdx = (idx + i) % sliderData.length;
				const thumb = document.createElement('img');
				thumb.className = 'slider-thumb';
				thumb.src = sliderData[thumbIdx].src;
				thumb.alt = 'Miniatura ' + (thumbIdx+1);
				thumb.style.transform = 'translateX(0) scale(1)';
				thumb.style.opacity = '1';
				thumb.addEventListener('click', () => {
					current = thumbIdx;
					renderMain(current, i-1);
					renderThumbs(current);
				});
				thumbsContainer.appendChild(thumb);
			}
		}
	}

	// Inicializar slider
	renderMain(current);
	renderThumbs(current);

	// Autoplay cada 8s, solo carga la imagen principal que corresponde
	let timer = setInterval(() => {
		current = (current + 1) % sliderData.length;
		renderMain(current);
		renderThumbs(current);
	}, 8000);

	// Pausar autoplay al interactuar
	thumbsContainer.addEventListener('mouseenter', () => clearInterval(timer));
	thumbsContainer.addEventListener('mouseleave', () => {
		timer = setInterval(() => {
			current = (current + 1) % sliderData.length;
			renderMain(current);
			renderThumbs(current);
		}, 8000);
	});
});

// Nuevo proyecto: agrega aquí tu JS desde cero
