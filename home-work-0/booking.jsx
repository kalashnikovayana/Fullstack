/* Harmony — booking drawer + sticky CTA. Babel; exports to window. */
const { useState: useStateB, useMemo } = React;

function buildDates(){
  const dows = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];
  const months = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
  const out = [];
  const now = new Date();
  for(let i=0;i<8;i++){
    const d = new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
    out.push({ key:i, dow: i===0?"Сьогодні":dows[d.getDay()], dnum:d.getDate(),
      label:`${d.getDate()} ${months[d.getMonth()]}` });
  }
  return out;
}

function StickyCta({ show, selection, openBooking }){
  const svc = selection.service;
  return (
    <div className={"sticky-cta"+(show?" show":"")}>
      <div className="sticky-inner">
        <div className="sum">
          <span className="t">{svc?svc.name:"Готові до змін?"}</span>
          <span className="d">{svc?`${svc.price} ₴ ${svc.unit} · ${svc.dur}`:"Запишіться онлайн за хвилину"}</span>
        </div>
        <span className="grow"></span>
        <button className="btn btn-primary" onClick={()=>openBooking(svc?1:0)}>
          Записатися <Icon name="arrow"/>
        </button>
      </div>
    </div>
  );
}

function BookingDrawer({ open, step, setStep, selection, setSelection, close }){
  const D = window.HARMONY_DATA;
  const dates = useMemo(buildDates, []);
  const patch = (p)=>setSelection(prev=>({...prev,...p}));

  const titles = ["Оберіть послугу","Оберіть майстра","Дата і час","Ваші контакти","Готово"];
  const subs = [
    "З чого почнемо ваше перетворення?",
    "До кого вас записати?",
    "Коли вам зручно завітати?",
    "Залиште дані — і ми підтвердимо запис.",
    ""
  ];

  const canNext = () => {
    if(step===0) return !!selection.service;
    if(step===1) return true; // master optional
    if(step===2) return !!selection.date && !!selection.time;
    if(step===3) return selection.name && selection.phone && selection.phone.length>=6;
    return true;
  };

  const next = ()=>{ if(step<4) setStep(step+1); };
  const back = ()=>{ if(step>0) setStep(step-1); };

  return (
    <div className={"drawer-overlay"+(open?" open":"")} onClick={(e)=>{ if(e.target.classList.contains("drawer-overlay")) close(); }}>
      <aside className="drawer" role="dialog" aria-label="Онлайн-запис">
        <div className="drawer-head">
          <div className="logo" style={{fontSize:24}}>Harmony<span className="dot"></span></div>
          <button className="x" onClick={close} aria-label="Закрити"><Icon name="x"/></button>
        </div>
        {step<4 &&
          <div className="drawer-steps">
            {[0,1,2,3].map(i=>(
              <span key={i} className={"s"+(i<step?" done":i===step?" on":"")}></span>
            ))}
          </div>}

        <div className="drawer-body">
          {step<4 && <><div className="step-title display">{titles[step]}</div><div className="step-sub">{subs[step]}</div></>}

          {/* STEP 0 — service */}
          {step===0 && D.services.map(s=>(
            <div key={s.id} className={"opt"+(selection.service&&selection.service.id===s.id?" sel":"")} onClick={()=>patch({service:s})}>
              <image-slot id={"d-"+s.img} shape="circle" src={(window.SLOT_SRC&&window.SLOT_SRC[s.img])||''} placeholder=""></image-slot>
              <div className="ot"><div className="a">{s.name}</div><div className="b">{s.cat} · {s.dur}</div></div>
              <div className="price display">{s.price} ₴</div>
              <div className="check"><Icon name="check"/></div>
            </div>
          ))}

          {/* STEP 1 — master */}
          {step===1 && (
            <>
              <div className={"opt"+(!selection.master?" sel":"")} onClick={()=>patch({master:null})}>
                <div className="ava" style={{background:"var(--teal-tint)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--teal-deep)"}}><Icon name="sparkle" style={{width:22,height:22}}/></div>
                <div className="ot"><div className="a">Будь-який вільний майстер</div><div className="b">Підберемо найближчий вільний час</div></div>
                <div className="check"><Icon name="check"/></div>
              </div>
              {D.masters.map(m=>(
                <div key={m.id} className={"opt"+(selection.master&&selection.master.id===m.id?" sel":"")} onClick={()=>patch({master:m})}>
                  <image-slot id={"d-"+m.img} shape="circle" src={(window.SLOT_SRC&&window.SLOT_SRC[m.img])||''} placeholder=""></image-slot>
                  <div className="ot"><div className="a">{m.name}</div><div className="b">{m.role}</div></div>
                  <div className="check"><Icon name="check"/></div>
                </div>
              ))}
            </>
          )}

          {/* STEP 2 — date + time */}
          {step===2 && (
            <>
              <div className="date-row">
                {dates.map(d=>(
                  <div key={d.key} className={"date-cell"+(selection.date&&selection.date.key===d.key?" sel":"")} onClick={()=>patch({date:d})}>
                    <div className="dow">{d.dow}</div>
                    <div className="dnum display">{d.dnum}</div>
                  </div>
                ))}
              </div>
              <label className="field-label" style={{marginTop:14}}>Вільний час</label>
              <div className="time-grid">
                {D.times.map(t=>{
                  const off = D.timesOff.includes(t);
                  return <div key={t} className={"time-cell"+(selection.time===t?" sel":"")+(off?" off":"")} onClick={()=>!off&&patch({time:t})}>{t}</div>;
                })}
              </div>
            </>
          )}

          {/* STEP 3 — contact */}
          {step===3 && (
            <>
              <label className="field-label">Ваше ім'я</label>
              <input className="field-input" placeholder="Наприклад, Олена" value={selection.name||""} onChange={e=>patch({name:e.target.value})}/>
              <label className="field-label">Телефон</label>
              <input className="field-input" placeholder="+38 0__ ___ __ __" value={selection.phone||""} onChange={e=>patch({phone:e.target.value})}/>
              <label className="field-label">Коментар (необов'язково)</label>
              <input className="field-input" placeholder="Побажання до запису" value={selection.note||""} onChange={e=>patch({note:e.target.value})}/>
              <div className="summary-box">
                <div className="sr"><span className="k">Послуга</span><span className="v">{selection.service?selection.service.name:"—"}</span></div>
                <div className="sr"><span className="k">Майстер</span><span className="v">{selection.master?selection.master.name:"Будь-який вільний"}</span></div>
                <div className="sr"><span className="k">Дата і час</span><span className="v">{selection.date?`${selection.date.label}, ${selection.time}`:"—"}</span></div>
                <div className="sr"><span className="k">Орієнтовна ціна</span><span className="v">{selection.service?`${selection.service.price} ₴ ${selection.service.unit}`:"—"}</span></div>
              </div>
            </>
          )}

          {/* STEP 4 — success */}
          {step===4 && (
            <div className="success">
              <div className="ok"><Icon name="check"/></div>
              <h3 className="display">Вас записано!</h3>
              <p>{selection.name?selection.name+", ":""}чекаємо на вас {selection.date?selection.date.label:""} о {selection.time}. Ми надішлемо SMS-нагадування на {selection.phone}.</p>
              <div className="summary-box" style={{marginTop:22,textAlign:"left"}}>
                <div className="sr"><span className="k">Послуга</span><span className="v">{selection.service?selection.service.name:"—"}</span></div>
                <div className="sr"><span className="k">Майстер</span><span className="v">{selection.master?selection.master.name:"Будь-який вільний"}</span></div>
                <div className="sr"><span className="k">Коли</span><span className="v">{selection.date?`${selection.date.label}, ${selection.time}`:"—"}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          {step===4 ? (
            <button className="btn btn-dark btn-block" onClick={close}>Чудово, до зустрічі!</button>
          ) : (
            <>
              {step>0 && <button className="btn btn-outline" onClick={back}>Назад</button>}
              <button className={"btn btn-primary"+(canNext()?"":" ")} style={{flex:1,opacity:canNext()?1:.45,pointerEvents:canNext()?"auto":"none"}} onClick={next}>
                {step===3 ? "Підтвердити запис" : "Далі"} <Icon name="arrow"/>
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { StickyCta, BookingDrawer });
