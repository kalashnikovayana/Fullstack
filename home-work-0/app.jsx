/* Harmony — main app: state, tweaks, scroll, render. */
const { useState: useStateA, useEffect, useRef } = React;
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": "Сміливі",
  "base": "Крем",
  "hero": "Поруч",
  "font": "Open Sans",
  "sticky": true
}/*EDITMODE-END*/;

function usePageAnimations(ready){
  useEffect(()=>{
    if(!ready) return;
    const sections = Array.from(document.querySelectorAll(".hero, .section"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const itemSelector = ".hero-copy, .hero-art, .booking-widget, .sec-head, .filter-row, .service-card, .master-card, .gallery-grid image-slot, .review-card, .blog-card, .contact-info, .map";

    sections.forEach(section=>{
      const items = Array.from(section.querySelectorAll(itemSelector));
      items.forEach((item,index)=>{
        item.classList.add("reveal-item");
        item.style.setProperty("--reveal-delay", `${index * 120}ms`);
        if(reduced) item.classList.add("is-visible");
      });
    });
    if(reduced) return;

    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.querySelectorAll(".reveal-item").forEach(item=>item.classList.add("is-visible"));
        observer.unobserve(entry.target);
      });
    },{threshold:.15});
    sections.forEach(section=>observer.observe(section));
    return ()=>observer.disconnect();
  },[ready]);
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selection, setSelection] = useStateA({ service:null, master:null, date:null, time:null, name:"", phone:"", note:"" });
  const [open, setOpen] = useStateA(false);
  const [step, setStep] = useStateA(0);
  const [scrolled, setScrolled] = useStateA(false);
  usePageAnimations(true);

  const openBooking = (s=0, p=null) => {
    if(p) setSelection(prev=>({...prev,...p}));
    setStep(s);
    setOpen(true);
  };
  const close = () => setOpen(false);

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  useEffect(()=>{
    document.body.style.overflow = open ? "hidden" : "";
  },[open]);

  const soft  = t.intensity === "М'які";
  const white = t.base === "Білий";
  const layout = t.hero === "Під текстом" ? "stacked" : "split";
  const fontVal = `"${t.font}", Georgia, serif`;

  const rootClass = "app" + (soft?" theme-soft":"") + (white?" base-white":"");

  return (
    <div className={rootClass} style={{ ["--font-display"]: fontVal }}>
      <Nav openBooking={openBooking}/>
      <Hero layout={layout} selection={selection} openBooking={openBooking}/>
      {layout!=="stacked" &&
        <div className="wrap" style={{marginTop:-28,position:"relative",zIndex:5}}>
          <div style={{maxWidth:560,marginLeft:"auto"}}>
            <BookingWidget selection={selection} openBooking={openBooking}/>
          </div>
        </div>}
      <Services openBooking={openBooking} setSelection={setSelection}/>
      <Masters openBooking={openBooking} setSelection={setSelection}/>
      <Gallery/>
      <Reviews/>
      <Blog/>
      <Contacts openBooking={openBooking}/>
      <Footer/>

      {t.sticky && <StickyCta show={scrolled && !open} selection={selection} openBooking={openBooking}/>}
      <BookingDrawer open={open} step={step} setStep={setStep} selection={selection} setSelection={setSelection} close={close}/>

      <TweaksPanel>
        <TweakSection label="Стиль"/>
        <TweakRadio label="Кольори тріади" value={t.intensity} options={["Сміливі","М'які"]} onChange={v=>setTweak("intensity",v)}/>
        <TweakRadio label="Тло" value={t.base} options={["Крем","Білий"]} onChange={v=>setTweak("base",v)}/>
        <TweakSelect label="Шрифт заголовків" value={t.font} options={["Open Sans","DM Serif Display","Cormorant Garamond","Playfair Display"]} onChange={v=>setTweak("font",v)}/>
        <TweakSection label="Розкладка"/>
        <TweakRadio label="Віджет запису" value={t.hero} options={["Поруч","Під текстом"]} onChange={v=>setTweak("hero",v)}/>
        <TweakToggle label="Липка панель запису" value={t.sticky} onChange={v=>setTweak("sticky",v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
