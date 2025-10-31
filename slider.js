(() => {
  const images = Array.isArray(window.IMAGES) ? window.IMAGES.slice() : [];
  // try to sort numerically by filename segment (handles 1.jpg, 10.jpg, etc.)
  images.sort((a,b)=>{
    const sa = (typeof a === 'string') ? a : (a && a.src) || '';
    const sb = (typeof b === 'string') ? b : (b && b.src) || '';
    const na = parseInt((sa.match(/(\d+)/)||[])[0],10);
    const nb = parseInt((sb.match(/(\d+)/)||[])[0],10);
    if(!isNaN(na) && !isNaN(nb)) return na-nb;
    return sa.localeCompare(sb);
  });

  const slideContainer = document.querySelector('.slide');
  const titleEl = document.querySelector('.content .title');
  const subtitleEl = document.querySelector('.content .subtitle');
  const prevBtns = document.querySelectorAll('.nav.prev');
  const nextBtns = document.querySelectorAll('.nav.next');

  let current = 0;
  const total = images.length;
  const INTERVAL = 8000; // 8 seconds as requested

  // dots navigation removed per user request

  function preloadAll(){
    images.forEach(item=>{
      if(!item) return;
      if(!item.type || item.type !== 'video'){
        const i=new Image(); i.src=(typeof item==='string')?item:item.src;
      }
    });
  }

  function createImage(src, alt){
    const img = document.createElement('img');
    img.src = src; img.alt = alt || '';
    img.style.maxWidth = '100%'; img.style.maxHeight = '100%'; img.style.objectFit = 'contain';
    img.id = 'slider-image';
    return img;
  }

  function createVideo(item){
    const v = document.createElement('video');
    v.src = item.src;
    v.autoplay = true;
    v.muted = true;
    v.playsInline = true;
    v.controls = false;
    v.style.maxWidth='100%'; v.style.maxHeight='100%'; v.style.objectFit='contain';
    return v;
  }

  let timer = null; // image timer
  let videoTimer = null; // video timeout

  function clearTimers(){ if(timer){ clearTimeout(timer); timer=null; } if(videoTimer){ clearTimeout(videoTimer); videoTimer=null; } }

  function show(index){
    const item = images[index];
    if(!item) return;

    clearTimers();
    slideContainer.innerHTML = '';

    // update titles
    if(titleEl) titleEl.textContent = (item && item.title) ? item.title : '';
    if(subtitleEl) subtitleEl.textContent = (item && item.subtitle) ? item.subtitle : '';

    if(item.type === 'video' || (typeof item.src === 'string' && item.src.match(/\.mp4$/i))){
      const v = createVideo(item);
      slideContainer.appendChild(v);

      const scheduleNext = (ms) => { videoTimer = setTimeout(()=>{ next(); }, ms); };

      v.addEventListener('loadedmetadata', ()=>{
        const ms = (item.duration && Number(item.duration)) ? Number(item.duration) : Math.round(v.duration*1000) || INTERVAL;
        scheduleNext(ms);
      }, { once:true });

      // fallback: if metadata doesn't fire, use provided duration after short delay
      setTimeout(()=>{
        if(!videoTimer){ const ms = (item.duration && Number(item.duration)) ? Number(item.duration) : INTERVAL; scheduleNext(ms); }
      }, 500);

      v.addEventListener('ended', ()=>{ clearTimers(); next(); });
      v.play().catch(()=>{});

    } else {
      const img = createImage(item.src, item.title || '');
      slideContainer.appendChild(img);
      // schedule next for image
      timer = setTimeout(()=>{ next(); }, INTERVAL);
    }
  }

  function goTo(i){
    current = (i + total) % total;
    show(current);
  }

  function next(){ goTo(current+1); }
  function prev(){ goTo(current-1); }

  function restartTimer(){
    clearTimers();
    const item = images[current];
    if(!item) return;
    if(item.type === 'video' || (typeof item.src === 'string' && item.src.match(/\.mp4$/i))){
      // show() already scheduled videoTimer
      return;
    }
    timer = setTimeout(()=>{ next(); }, INTERVAL);
  }

  // Wire buttons (there are duplicates: desktop + mobile controls)
  prevBtns.forEach(b=>b.addEventListener('click', ()=>{ prev(); restartTimer(); }));
  nextBtns.forEach(b=>b.addEventListener('click', ()=>{ next(); restartTimer(); }));

  // keyboard
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') { prev(); restartTimer(); }
    if(e.key === 'ArrowRight') { next(); restartTimer(); }
  });

  // Pause on hover
  const sliderRoot = document.querySelector('.slider');
  sliderRoot.addEventListener('mouseenter', ()=>{
    if(timer) { clearTimeout(timer); timer=null; }
    if(videoTimer) { clearTimeout(videoTimer); videoTimer=null; }
    const v = slideContainer.querySelector('video'); if(v && !v.paused) try{ v.pause(); }catch(e){}
  });
  sliderRoot.addEventListener('mouseleave', ()=>{
    const v = slideContainer.querySelector('video'); if(v){ try{ v.play().catch(()=>{}); }catch(e){} }
    restartTimer();
  });

  // initialization
  function initSlider(){
    if(total === 0){ return; }
    preloadAll(); show(0); // restartTimer is called inside show for images
  }

  initSlider();
})();
