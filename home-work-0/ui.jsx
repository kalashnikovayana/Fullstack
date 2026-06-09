/* Harmony — UI components. Loaded as Babel; exports to window. */
const { useState } = React;

const SLOT_SRC = {
  'hero-main':      'images/m-olha.png',
  'svc-hair-color': 'images/svc-hair-color.png',
  'svc-haircut':    'images/svc-haircut.png',
  'svc-care':       'images/svc-care.png',
  'svc-manicure':   'images/svc-manicure.png',
  'svc-pedicure':   'images/svc-pedicure.png',
  'svc-face':       'images/svc-face.png',
  'svc-brows':      'images/m-sofia.png',
  'svc-makeup':     'images/m-sofia.png',
  'svc-spa':        'images/svc-face.png',
  'm-olha':         'images/m-olha.png',
  'm-iryna':        'images/m-iryna.png',
  'm-daria':        'images/m-daria.png',
  'm-sofia':        'images/m-sofia.png',
  'g1': 'images/m-olha.png',
  'g2': 'images/svc-hair-color.png',
  'g3': 'images/svc-haircut.png',
  'g4': 'images/svc-manicure.png',
  'g5': 'images/svc-pedicure.png',
  'g6': 'images/svc-face.png',
  'g7': 'images/svc-care.png',
  'r-1': 'images/m-olha.png',
  'r-2': 'images/m-iryna.png',
  'r-3': 'images/m-daria.png',
  'b-1': 'images/svc-hair-color.png',
  'b-2': 'images/svc-manicure.png',
  'b-3': 'images/svc-face.png',
};

/* ---------- icon set (Lucide-style inline) ---------- */
const ICON_PATHS = {
  phone:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  chevron:'M9 18l6-6-6-6',
  arrow:'M5 12h14M13 5l7 7-7 7',
  x:'M18 6 6 18M6 6l12 12',
  check:'M20 6 9 17l-5-5',
  pin:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  calendar:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  mail:'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
  sparkle:'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z',
  scissors:'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  instagram:'M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01',
  facebook:'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  star:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
};
function Icon({ name, fill, style }){
  const filled = fill === true;
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/* ---------- nav ---------- */
function Nav({ openBooking }){
  const links = ["Послуги","Майстри","Галерея","Відгуки","Журнал","Контакти"];
  const ids = ["services","masters","gallery","reviews","blog","contacts"];
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#top">Harmony<span className="dot"></span></a>
        <nav className="nav-links">
          {links.map((l,i)=><a key={l} href={"#"+ids[i]}>{l}</a>)}
        </nav>
        <div className="nav-right">
          <span className="nav-phone"><Icon name="phone"/>+38 097 123 45 67</span>
          <button className="btn btn-primary btn-sm" onClick={()=>openBooking(0)}>Записатися</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero + booking widget ---------- */
function BookingWidget({ selection, openBooking }){
  const svc = selection.service;
  const mst = selection.master;
  return (
    <div className="booking-widget">
      <div className="bw-head">
        <span className="t">Запис онлайн</span>
        <span className="tag"><Icon name="clock" style={{width:13,height:13}}/> 1 хвилина</span>
      </div>
      <div className="bw-steps">
        <span className="s on"></span><span className="s"></span><span className="s"></span><span className="s"></span>
      </div>
      <div className="bw-field" onClick={()=>openBooking(0)}>
        <div><div className="k">Послуга</div><div className={"v"+(svc?"":" ph")}>{svc?svc.name:"Оберіть послугу"}</div></div>
        <Icon name="chevron"/>
      </div>
      <div className="bw-field" onClick={()=>openBooking(1)}>
        <div><div className="k">Майстер</div><div className={"v"+(mst?"":" ph")}>{mst?mst.name:"Будь-який вільний"}</div></div>
        <Icon name="chevron"/>
      </div>
      <div className="bw-field" onClick={()=>openBooking(2)}>
        <div><div className="k">Дата і час</div><div className={"v"+((selection.date&&selection.time)?"":" ph")}>{(selection.date&&selection.time)?`${selection.date.label}, ${selection.time}`:"Оберіть зручний час"}</div></div>
        <Icon name="calendar"/>
      </div>
      <button className="btn btn-primary btn-block" style={{marginTop:6}} onClick={()=>openBooking(0)}>
        Записатися онлайн <Icon name="arrow"/>
      </button>
    </div>
  );
}

function Hero({ layout, selection, openBooking }){
  return (
    <section className={"hero"+(layout==="stacked"?" layout-stacked":"")} id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">салон краси · Київ, Поділ</span>
          <h1 className="display">Краса, що звучить у <em>гармонії</em> з вами</h1>
          <p className="lead">Стрижка, колір, нігті та догляд від майстрів, яким довіряють. Оберіть послугу й час — решту зробимо ми.</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={()=>openBooking(0)}>Записатися онлайн <Icon name="arrow"/></button>
            <a className="btn btn-outline" href="#services">Переглянути послуги</a>
          </div>
          <div className="hero-meta">
            <div><div className="num display">12</div><div className="lbl">років досвіду</div></div>
            <div><div className="num display">4.9★</div><div className="lbl">середній рейтинг</div></div>
            <div><div className="num display">20k+</div><div className="lbl">щасливих клієнтів</div></div>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-blob"></div>
          <image-slot id="hero-main" shape="rounded" radius="22" src={SLOT_SRC['hero-main']} placeholder="Фото салону / образ клієнтки"></image-slot>
          <div className="hero-badge">
            <div><div className="stars">★★★★★</div><div style={{fontSize:13,fontWeight:700,marginTop:2}}>4.9 з 5 · 2 300 відгуків</div></div>
          </div>
        </div>
        {layout==="stacked" && <div style={{gridColumn:"1 / -1"}}><BookingWidget selection={selection} openBooking={openBooking}/></div>}
      </div>
      {layout!=="stacked" &&
        <div className="wrap" style={{marginTop:0,display:"none"}}></div>}
    </section>
  );
}

/* ---------- services ---------- */
function Services({ openBooking, setSelection }){
  const D = window.HARMONY_DATA;
  const [cat, setCat] = useState("Всі");
  const list = cat==="Всі" ? D.services : D.services.filter(s=>s.cat===cat);
  const tints = ["rose","gold","teal"];
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">що ми робимо</span>
          <h2 className="display">Послуги та ціни</h2>
          <p>Повний спектр б'юті-послуг під одним дахом. Оберіть категорію — і одразу записуйтеся до майстра.</p>
        </div>
        <div className="filter-row">
          {D.cats.map(c=>(
            <button key={c} className={"chip"+(cat===c?" active":"")} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="services-grid">
          {list.map((s,i)=>(
            <article key={s.id} className="service-card">
              <image-slot id={s.img} shape="rect" src={SLOT_SRC[s.img]||''} placeholder={s.name}></image-slot>
              <div className="sc-body">
                <span className={"tag "+tints[i%3]}>{s.cat} · {s.dur}</span>
                <h3 className="display">{s.name}</h3>
                <p>{s.desc}</p>
                <div className="sc-foot">
                  <span className="price display">{s.price} ₴ <small>{s.unit}</small></span>
                  <button className="btn btn-dark btn-sm" onClick={()=>{ setSelection(p=>({...p,service:s})); openBooking(1,{service:s}); }}>Записатись</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- masters ---------- */
function Masters({ openBooking, setSelection }){
  const D = window.HARMONY_DATA;
  return (
    <section className="section tight" id="masters" style={{background:"var(--gold-tint)"}}>
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">наша команда</span>
          <h2 className="display">Майстри, яким довіряють</h2>
          <p>Кожен — сертифікований професіонал зі своїм почерком. Оберіть улюбленого або довіртесь нашій рекомендації.</p>
        </div>
        <div className="masters-grid">
          {D.masters.map(m=>(
            <div key={m.id} className="master-card">
              <image-slot id={m.img} shape="rounded" radius="20" src={SLOT_SRC[m.img]||''} placeholder={m.name}></image-slot>
              <div className="m-name display">{m.name}</div>
              <div className="m-role">{m.role}</div>
              <div className="m-stars">★★★★★</div>
              <button className="btn btn-outline btn-sm" style={{marginTop:14}} onClick={()=>{ setSelection(p=>({...p,master:m})); openBooking(0,{master:m}); }}>Записатись до майстра</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */
function Gallery(){
  const cells = [
    {id:"g1",cls:"g-tall"},{id:"g2"},{id:"g3"},
    {id:"g4"},{id:"g5",cls:"g-wide"},
    {id:"g6"},{id:"g7"}
  ];
  return (
    <section className="section gallery-band" id="gallery">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">портфоліо</span>
          <h2 className="display">Галерея робіт</h2>
          <p>Реальні «до / після» наших майстрів. Перетягніть свої фото у будь-яку клітинку.</p>
        </div>
        <div className="gallery-grid">
          {cells.map(c=>(
            <image-slot key={c.id} id={c.id} className={c.cls||""} shape="rounded" radius="16" src={SLOT_SRC[c.id]||''} placeholder="Фото роботи"></image-slot>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews ---------- */
function Reviews(){
  const D = window.HARMONY_DATA;
  return (
    <section className="section reviews-band" id="reviews">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">відгуки</span>
          <h2 className="display">Що кажуть клієнти</h2>
        </div>
        <div className="reviews-grid">
          {D.reviews.map((r,i)=>(
            <div key={i} className="review-card">
              <div className="stars">★★★★★</div>
              <div className="quote display">«{r.quote}»</div>
              <div className="who">
                <image-slot id={r.img} shape="circle" src={SLOT_SRC[r.img]||''} placeholder=""></image-slot>
                <div><div className="n">{r.name}</div><div className="s">{r.since}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- blog ---------- */
function Blog(){
  const D = window.HARMONY_DATA;
  const tints=["rose","gold","teal"];
  return (
    <section className="section" id="blog">
      <div className="wrap">
        <div className="sec-head">
          <div className="row-between">
            <div>
              <span className="eyebrow">журнал</span>
              <h2 className="display">Поради та натхнення</h2>
            </div>
            <a className="btn btn-ghost" href="#blog">Усі статті <Icon name="arrow"/></a>
          </div>
        </div>
        <div className="blog-grid">
          {D.posts.map((p,i)=>(
            <article key={i} className="blog-card">
              <image-slot id={p.img} shape="rounded" radius="16" src={SLOT_SRC[p.img]||''} placeholder={p.title}></image-slot>
              <span className={"tag "+tints[i%3]} style={{alignSelf:"flex-start"}}>{p.tag}</span>
              <h3 className="display">{p.title}</h3>
              <div className="meta">{p.read} читання</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contacts ---------- */
function Contacts({ openBooking }){
  return (
    <section className="section" id="contacts" style={{background:"var(--teal-tint)"}}>
      <div className="wrap">
        <div className="contacts-grid">
          <div className="contact-info">
            <div className="sec-head" style={{marginBottom:6}}>
              <span className="eyebrow">завітайте</span>
              <h2 className="display">Контакти</h2>
            </div>
            <div className="contact-row"><div className="ic"><Icon name="pin"/></div><div><div className="k">Адреса</div><div className="v">вул. Сагайдачного 18, Київ</div></div></div>
            <div className="contact-row"><div className="ic"><Icon name="clock"/></div><div><div className="k">Графік</div><div className="v">Пн–Нд · 09:00 – 21:00</div></div></div>
            <div className="contact-row"><div className="ic"><Icon name="phone"/></div><div><div className="k">Телефон</div><div className="v">+38 097 123 45 67</div></div></div>
            <div className="contact-row"><div className="ic"><Icon name="mail"/></div><div><div className="k">Пошта</div><div className="v">hello@harmony.salon</div></div></div>
            <button className="btn btn-primary" style={{alignSelf:"flex-start",marginTop:6}} onClick={()=>openBooking(0)}>Записатися онлайн <Icon name="arrow"/></button>
          </div>
          <div className="map">
            <div className="route"></div>
            <div className="pin"><Icon name="pin"/> Harmony</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer(){
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo">Harmony<span className="dot"></span></div>
            <p style={{marginTop:14}}>Салон краси на Подолі. Робимо красу простою та приємною — від запису до результату.</p>
          </div>
          <div>
            <h4>Послуги</h4>
            <div className="footer-links"><a href="#services">Волосся</a><a href="#services">Манікюр</a><a href="#services">Обличчя</a><a href="#services">SPA</a></div>
          </div>
          <div>
            <h4>Салон</h4>
            <div className="footer-links"><a href="#masters">Майстри</a><a href="#gallery">Галерея</a><a href="#reviews">Відгуки</a><a href="#blog">Журнал</a></div>
          </div>
          <div>
            <h4>Контакти</h4>
            <div className="footer-links"><a href="#contacts">вул. Сагайдачного 18</a><a href="#contacts">+38 097 123 45 67</a><a href="#contacts">hello@harmony.salon</a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Harmony. Усі права захищено.</p>
          <div className="social">
            <a href="#top"><Icon name="instagram"/></a>
            <a href="#top"><Icon name="facebook"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SLOT_SRC, Icon, Nav, Hero, BookingWidget, Services, Masters, Gallery, Reviews, Blog, Contacts, Footer });
