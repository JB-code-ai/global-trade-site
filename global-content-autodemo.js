/* Automatic TikTok API prototype walkthrough. Runs only with ?demo=1. */
(() => {
  if (new URLSearchParams(location.search).get('demo') !== '1') return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const start = () => (async () => {
    const style = document.createElement('style');
    style.textContent = `
      #demo-caption{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:10000;
        width:min(88vw,720px);padding:12px 18px;border:1px solid #7187e5;border-radius:14px;
        background:rgba(10,15,32,.95);color:#fff;text-align:center;font:600 15px/1.4 Inter,Arial,sans-serif;
        box-shadow:0 10px 30px #0009;pointer-events:none}
      #demo-pointer{position:fixed;width:26px;height:26px;border:3px solid #ffe082;border-radius:50%;
        background:#ffe08255;z-index:10001;transform:translate(-50%,-50%);transition:left .55s,top .55s;
        pointer-events:none;opacity:0}
    `;
    document.head.appendChild(style);
    const caption = document.body.appendChild(document.createElement('div'));
    caption.id = 'demo-caption';
    const pointer = document.body.appendChild(document.createElement('div'));
    pointer.id = 'demo-pointer';
    const say = text => caption.textContent = text;
    const nav = id => {
      const item = [...document.querySelectorAll('.nav-item,.mobile-nav-item')].find(el =>
        (el.getAttribute('onclick') || '').includes(`'${id}'`));
      showPage(id, item);
      window.scrollTo({top: 0, behavior: 'instant'});
    };
    const button = text => [...document.querySelectorAll('button')].find(el =>
      el.offsetParent !== null && el.textContent.replace(/\s+/g,' ').trim().includes(text));
    const point = async el => {
      if (!el) return false;
      el.scrollIntoView({behavior:'smooth',block:'center'}); await sleep(650);
      const r = el.getBoundingClientRect();
      pointer.style.opacity = '1'; pointer.style.left = `${r.left+r.width/2}px`; pointer.style.top = `${r.top+r.height/2}px`;
      await sleep(850); return true;
    };
    const click = async el => { if (!await point(el)) return; el.click(); await sleep(900); };

    document.querySelectorAll('.modal-overlay').forEach(x => x.classList.remove('open'));
    say('Global Content Manager — démonstration officielle du prototype. Toutes les données sont fictives.');
    nav('dashboard'); await sleep(3200);
    say('1/4 — Connexion volontaire d’un compte créateur via OAuth 2.0 simulé.');
    nav('connect'); await sleep(1800);
    await click(button('Autoriser via OAuth 2.0')); await sleep(1400);
    await click(button("Autoriser l'accès")); await sleep(1800);
    say('2/4 — Import d’une vidéo. Aucun fichier réel n’est envoyé dans ce prototype.');
    nav('videos'); await sleep(1800);
    await click(button('Importer une vidéo')); await sleep(1200);
    await click(document.querySelector('#upload-modal .upload-area')); await sleep(1800);
    say('3/4 — Programmation d’une publication organique simulée.');
    const draft = [...document.querySelectorAll('#page-videos .tab')].find(x => x.textContent.includes('Brouillons'));
    await click(draft); await sleep(900); await click(button('Planifier')); await sleep(1800);
    nav('schedule'); await sleep(3500);
    say('4/4 — Consultation des statistiques autorisées, affichées ici avec des données fictives.');
    nav('analytics'); await sleep(4000);
    window.scrollTo({top:520,behavior:'smooth'}); await sleep(2500);
    window.scrollTo({top:0,behavior:'smooth'}); await sleep(1800);
    say('Fin de la démonstration — aucune connexion, publication ou donnée TikTok réelle utilisée.');
    await sleep(4000);
  })().catch(err => console.error('Autodemo:', err));
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start, {once:true}) : start();
})();
