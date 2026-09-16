import { useState, useEffect, useMemo, useRef } from "react";
import { HARMONY_DATA } from "../data.js";
import { SERVICE_IMG, SERVICE_ICON, SERVICE_TINT, MASTER_IMG, PHOTO_SIZE } from "../images.js";

/* ---------- inline icon (same paths as Icon.astro) ---------- */
const ICON_PATHS = {
  chevron: "M9 18l6-6-6-6",
  arrow: "M5 12h14M13 5l7 7-7 7",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z",
};
function Icon({ name, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/* ---------- dates ---------- */
function buildDates() {
  const dows = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"];
  const out = [];
  const now = new Date();
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      key: i,
      dow: i === 0 ? "Сьогодні" : dows[d.getDay()],
      dnum: d.getDate(),
      label: `${d.getDate()} ${months[d.getMonth()]}`,
    });
  }
  return out;
}

function ServiceThumb({ svc }) {
  const src = SERVICE_IMG[svc.id];
  if (src) {
    return <img src={src} width={PHOTO_SIZE.width} height={PHOTO_SIZE.height} loading="lazy" alt="" />;
  }
  return (
    <div className={"ava " + SERVICE_TINT[svc.id]} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={SERVICE_ICON[svc.id]} style={{ width: 20, height: 20 }} />
    </div>
  );
}

/* ---------- widget shown next to hero ---------- */
function BookingWidget({ selection, openBooking }) {
  const svc = selection.service;
  const mst = selection.master;
  return (
    <div className="booking-widget">
      <div className="bw-head">
        <span className="t">Запис онлайн</span>
        <span className="tag"><Icon name="clock" style={{ width: 13, height: 13 }} /> 1 хвилина</span>
      </div>
      <div className="bw-steps">
        <span className="s on"></span><span className="s"></span><span className="s"></span><span className="s"></span>
      </div>
      <div className="bw-field" onClick={() => openBooking(0)}>
        <div><div className="k">Послуга</div><div className={"v" + (svc ? "" : " ph")}>{svc ? svc.name : "Оберіть послугу"}</div></div>
        <Icon name="chevron" />
      </div>
      <div className="bw-field" onClick={() => openBooking(1)}>
        <div><div className="k">Майстер</div><div className={"v" + (mst ? "" : " ph")}>{mst ? mst.name : "Будь-який вільний"}</div></div>
        <Icon name="chevron" />
      </div>
      <div className="bw-field" onClick={() => openBooking(2)}>
        <div><div className="k">Дата і час</div><div className={"v" + (selection.date && selection.time ? "" : " ph")}>{selection.date && selection.time ? `${selection.date.label}, ${selection.time}` : "Оберіть зручний час"}</div></div>
        <Icon name="calendar" />
      </div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 6 }} onClick={() => openBooking(0)}>
        Записатися онлайн <Icon name="arrow" />
      </button>
    </div>
  );
}

/* ---------- bottom sticky bar ---------- */
function StickyCta({ show, selection, openBooking }) {
  const svc = selection.service;
  return (
    <div className={"sticky-cta" + (show ? " show" : "")}>
      <div className="sticky-inner">
        <div className="sum">
          <span className="t">{svc ? svc.name : "Готові до змін?"}</span>
          <span className="d">{svc ? `${svc.price} ₴ ${svc.unit} · ${svc.dur}` : "Запишіться онлайн за хвилину"}</span>
        </div>
        <span className="grow"></span>
        <button className="btn btn-primary" onClick={() => openBooking(svc ? 1 : 0)}>
          Записатися <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

/* ---------- drawer ---------- */
function BookingDrawer({ open, step, setStep, selection, setSelection, close }) {
  const D = HARMONY_DATA;
  const dates = useMemo(buildDates, []);
  const patch = (p) => setSelection((prev) => ({ ...prev, ...p }));

  const titles = ["Оберіть послугу", "Оберіть майстра", "Дата і час", "Ваші контакти", "Готово"];
  const subs = [
    "З чого почнемо ваше перетворення?",
    "До кого вас записати?",
    "Коли вам зручно завітати?",
    "Залиште дані — і ми підтвердимо запис.",
    "",
  ];

  const canNext = () => {
    if (step === 0) return !!selection.service;
    if (step === 1) return true; // master optional
    if (step === 2) return !!selection.date && !!selection.time;
    if (step === 3) return selection.name && selection.phone && selection.phone.length >= 6;
    return true;
  };

  const next = () => { if (step < 4) setStep(step + 1); };
  const back = () => { if (step > 0) setStep(step - 1); };

  return (
    <div className={"drawer-overlay" + (open ? " open" : "")} onClick={(e) => { if (e.target.classList.contains("drawer-overlay")) close(); }}>
      <aside className="drawer" role="dialog" aria-label="Онлайн-запис">
        <div className="drawer-head">
          <div className="logo" style={{ fontSize: 24 }}>Harmony<span className="dot"></span></div>
          <button className="x" onClick={close} aria-label="Закрити"><Icon name="x" /></button>
        </div>
        {step < 4 &&
          <div className="drawer-steps">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={"s" + (i < step ? " done" : i === step ? " on" : "")}></span>
            ))}
          </div>}

        <div className="drawer-body">
          {step < 4 && <><div className="step-title display">{titles[step]}</div><div className="step-sub">{subs[step]}</div></>}

          {/* STEP 0 — service */}
          {step === 0 && D.services.map((s) => (
            <div key={s.id} className={"opt" + (selection.service && selection.service.id === s.id ? " sel" : "")} onClick={() => patch({ service: s })}>
              <ServiceThumb svc={s} />
              <div className="ot"><div className="a">{s.name}</div><div className="b">{s.cat} · {s.dur}</div></div>
              <div className="price display">{s.price} ₴</div>
              <div className="check"><Icon name="check" /></div>
            </div>
          ))}

          {/* STEP 1 — master */}
          {step === 1 && (
            <>
              <div className={"opt" + (!selection.master ? " sel" : "")} onClick={() => patch({ master: null })}>
                <div className="ava" style={{ background: "var(--teal-tint)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-deep)" }}><Icon name="sparkle" style={{ width: 22, height: 22 }} /></div>
                <div className="ot"><div className="a">Будь-який вільний майстер</div><div className="b">Підберемо найближчий вільний час</div></div>
                <div className="check"><Icon name="check" /></div>
              </div>
              {D.masters.map((m) => (
                <div key={m.id} className={"opt" + (selection.master && selection.master.id === m.id ? " sel" : "")} onClick={() => patch({ master: m })}>
                  <img src={MASTER_IMG[m.id]} width={PHOTO_SIZE.width} height={PHOTO_SIZE.height} loading="lazy" alt="" />
                  <div className="ot"><div className="a">{m.name}</div><div className="b">{m.role}</div></div>
                  <div className="check"><Icon name="check" /></div>
                </div>
              ))}
            </>
          )}

          {/* STEP 2 — date + time */}
          {step === 2 && (
            <>
              <div className="date-row">
                {dates.map((d) => (
                  <div key={d.key} className={"date-cell" + (selection.date && selection.date.key === d.key ? " sel" : "")} onClick={() => patch({ date: d })}>
                    <div className="dow">{d.dow}</div>
                    <div className="dnum display">{d.dnum}</div>
                  </div>
                ))}
              </div>
              <label className="field-label" style={{ marginTop: 14 }}>Вільний час</label>
              <div className="time-grid">
                {D.times.map((t) => {
                  const off = D.timesOff.includes(t);
                  return <div key={t} className={"time-cell" + (selection.time === t ? " sel" : "") + (off ? " off" : "")} onClick={() => !off && patch({ time: t })}>{t}</div>;
                })}
              </div>
            </>
          )}

          {/* STEP 3 — contact */}
          {step === 3 && (
            <>
              <label className="field-label">Ваше ім'я</label>
              <input className="field-input" placeholder="Наприклад, Олена" value={selection.name || ""} onChange={(e) => patch({ name: e.target.value })} />
              <label className="field-label">Телефон</label>
              <input className="field-input" placeholder="+38 0__ ___ __ __" value={selection.phone || ""} onChange={(e) => patch({ phone: e.target.value })} />
              <label className="field-label">Коментар (необов'язково)</label>
              <input className="field-input" placeholder="Побажання до запису" value={selection.note || ""} onChange={(e) => patch({ note: e.target.value })} />
              <div className="summary-box">
                <div className="sr"><span className="k">Послуга</span><span className="v">{selection.service ? selection.service.name : "—"}</span></div>
                <div className="sr"><span className="k">Майстер</span><span className="v">{selection.master ? selection.master.name : "Будь-який вільний"}</span></div>
                <div className="sr"><span className="k">Дата і час</span><span className="v">{selection.date ? `${selection.date.label}, ${selection.time}` : "—"}</span></div>
                <div className="sr"><span className="k">Орієнтовна ціна</span><span className="v">{selection.service ? `${selection.service.price} ₴ ${selection.service.unit}` : "—"}</span></div>
              </div>
            </>
          )}

          {/* STEP 4 — success */}
          {step === 4 && (
            <div className="success">
              <div className="ok"><Icon name="check" /></div>
              <h3 className="display">Вас записано!</h3>
              <p>{selection.name ? selection.name + ", " : ""}чекаємо на вас {selection.date ? selection.date.label : ""} о {selection.time}. Ми надішлемо SMS-нагадування на {selection.phone}.</p>
              <div className="summary-box" style={{ marginTop: 22, textAlign: "left" }}>
                <div className="sr"><span className="k">Послуга</span><span className="v">{selection.service ? selection.service.name : "—"}</span></div>
                <div className="sr"><span className="k">Майстер</span><span className="v">{selection.master ? selection.master.name : "Будь-який вільний"}</span></div>
                <div className="sr"><span className="k">Коли</span><span className="v">{selection.date ? `${selection.date.label}, ${selection.time}` : "—"}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          {step === 4 ? (
            <button className="btn btn-dark btn-block" onClick={close}>Чудово, до зустрічі!</button>
          ) : (
            <>
              {step > 0 && <button className="btn btn-outline" onClick={back}>Назад</button>}
              <button className="btn btn-primary" style={{ flex: 1, opacity: canNext() ? 1 : .45, pointerEvents: canNext() ? "auto" : "none" }} onClick={next}>
                {step === 3 ? "Підтвердити запис" : "Далі"} <Icon name="arrow" />
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

/* ---------- driver: the one client:visible island ---------- */
export default function BookingDriver() {
  const [selection, setSelection] = useState({ service: null, master: null, date: null, time: null, name: "", phone: "", note: "" });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const dataRef = useRef(HARMONY_DATA);

  const openBooking = (s = 0, p = null) => {
    if (p) setSelection((prev) => ({ ...prev, ...p }));
    setStep(s);
    setOpen(true);
  };
  const close = () => setOpen(false);

  // Bridge: static "Записатись" buttons outside this island dispatch
  // harmony:open-booking (see Layout.astro). Flush anything that fired
  // before we mounted, then keep listening.
  useEffect(() => {
    const D = dataRef.current;

    const handle = (detail) => {
      const service = detail.serviceId ? D.services.find((s) => s.id === detail.serviceId) : null;
      const master = detail.masterId ? D.masters.find((m) => m.id === detail.masterId) : null;
      const patch = {};
      if (service) patch.service = service;
      if (master) patch.master = master;
      openBooking(detail.step, Object.keys(patch).length ? patch : null);
    };

    const onEvent = (e) => handle(e.detail);
    window.addEventListener("harmony:open-booking", onEvent);

    const queue = window.__harmonyBookingQueue || [];
    window.__harmonyBookingQueue = [];
    window.__harmonyBookingReady = true;
    queue.forEach(handle);

    return () => window.removeEventListener("harmony:open-booking", onEvent);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="wrap booking-bar" style={{ marginTop: -28, position: "relative", zIndex: 5 }}>
        <BookingWidget selection={selection} openBooking={openBooking} />
      </div>

      <StickyCta show={scrolled && !open} selection={selection} openBooking={openBooking} />
      <BookingDrawer open={open} step={step} setStep={setStep} selection={selection} setSelection={setSelection} close={close} />
    </>
  );
}
