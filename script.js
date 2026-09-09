(function(){
  "use strict";

  /* ---------- footer year ---------- */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---------- MTF sample questions ----------
     EDIT: swap in your own stems. Keys must stay the same shape. */
  var QS = [
    {
      meta: "Paper A · Pharmacology",
      stem: "Regarding propofol:",
      items: [
        { t:"It is presented as an emulsion containing soybean oil, glycerol and purified egg phosphatide.", a:true,
          why:"True. That lipid vehicle is also why strict asepsis matters and why it supports bacterial growth." },
        { t:"It reduces the cerebral metabolic rate of oxygen consumption.", a:true,
          why:"True. It lowers CMRO2, with a coupled fall in cerebral blood flow and ICP — the basis of its use in neuroanaesthesia." },
        { t:"It has significant analgesic properties.", a:false,
          why:"False. Propofol is a hypnotic with essentially no analgesic action. A frequent trap because it is often given alongside an opioid." },
        { t:"It reduces systemic vascular resistance.", a:true,
          why:"True. Vasodilatation plus some direct myocardial depression and blunting of the baroreflex — hence the hypotension on induction." },
        { t:"It is a recognised trigger of malignant hyperthermia.", a:false,
          why:"False. Propofol is safe in MH-susceptible patients and is a mainstay of a trigger-free technique." }
      ]
    },
    {
      meta: "Paper A · Physiology",
      stem: "Concerning the oxyhaemoglobin dissociation curve:",
      items: [
        { t:"A rise in 2,3-DPG shifts the curve to the right.", a:true,
          why:"True. Higher 2,3-DPG reduces haemoglobin's affinity for oxygen, favouring offloading at the tissues." },
        { t:"Fetal haemoglobin shifts the curve to the left.", a:true,
          why:"True. HbF binds 2,3-DPG poorly, so affinity is higher and the curve sits left — which is what lets it extract oxygen across the placenta." },
        { t:"The P50 of normal adult haemoglobin is approximately 3.5 kPa.", a:true,
          why:"True. Around 26.6 mmHg, which is roughly 3.5 kPa. Know it in both units — the paper uses SI." },
        { t:"Hypothermia shifts the curve to the right.", a:false,
          why:"False. Cooling shifts it left, increasing affinity and impairing offloading at the tissues." },
        { t:"Carbon monoxide shifts the curve to the right.", a:false,
          why:"False. CO shifts it left as well as reducing carrying capacity — which is precisely why the tissue hypoxia is worse than the measured saturation suggests." }
      ]
    },
    {
      meta: "Paper B · Intensive care",
      stem: "In the management of septic shock in adults:",
      items: [
        { t:"Noradrenaline is the recommended first-line vasopressor.", a:true,
          why:"True. It is first line, with vasopressin commonly added rather than escalating noradrenaline indefinitely." },
        { t:"Hydroxyethyl starch is recommended for volume resuscitation.", a:false,
          why:"False. Starches are recommended against — the signal on renal injury and mortality settled this." },
        { t:"Antimicrobials should be given within one hour of recognition in septic shock.", a:true,
          why:"True. For shock, immediate administration is recommended; the guidance is more nuanced where sepsis is only possible and shock is absent." },
        { t:"Serum lactate is a direct measure of tissue hypoxia.", a:false,
          why:"False. It is a marker, not a measure — adrenergic stimulation, impaired clearance and liver dysfunction all raise it without hypoxia." },
        { t:"Vasopressin may be added to reduce the noradrenaline requirement.", a:true,
          why:"True. It is the standard second agent, added at a moderate noradrenaline dose rather than as a last resort." }
      ]
    }
  ];

  var qi = 0, answered = 0, correct = 0;
  var elStem = document.getElementById('mtfStem'),
      elRows = document.getElementById('mtfRows'),
      elMeta = document.getElementById('mtfMeta'),
      elCount= document.getElementById('mtfCount'),
      elScore= document.getElementById('mtfScore'),
      elNext = document.getElementById('mtfNext');

  function render(){
    var q = QS[qi];
    elMeta.textContent = q.meta;
    elCount.textContent = 'Question ' + (qi+1) + ' of ' + QS.length;
    elStem.textContent = q.stem;
    elRows.innerHTML = '';
    answered = 0;

    q.items.forEach(function(it, i){
      var row = document.createElement('div');
      row.className = 'mtf__row';

      var p = document.createElement('p');
      p.textContent = String.fromCharCode(97+i) + '. ' + it.t;

      var pick = document.createElement('div');
      pick.className = 'mtf__pick';

      var why = document.createElement('div');
      why.className = 'mtf__why';
      why.style.display = 'none';

      ['True','False'].forEach(function(lbl){
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = lbl === 'True' ? 'T' : 'F';
        b.setAttribute('aria-label', lbl + ' — statement ' + String.fromCharCode(97+i));
        b.addEventListener('click', function(){
          if (pick.dataset.done) return;
          pick.dataset.done = '1';
          var chose = (lbl === 'True');
          var ok = (chose === it.a);
          b.classList.add(ok ? 'right' : 'wrong');
          why.textContent = '';
          var strong = document.createElement('b');
          strong.textContent = it.a ? 'True. ' : 'False. ';
          why.appendChild(strong);
          why.appendChild(document.createTextNode(it.why.replace(/^(True|False)\.\s*/,'')));
          why.className = 'mtf__why' + (ok ? '' : ' no');
          why.style.display = 'block';
          answered++; if (ok) correct++;
          if (answered === 5){
            elScore.innerHTML = 'You got <b>' + correct + '</b> of the last five. Every statement is marked on its own — that is where the marks hide.';
          }
        });
        pick.appendChild(b);
      });

      row.appendChild(p);
      row.appendChild(pick);
      row.appendChild(why);
      elRows.appendChild(row);
    });
  }

  elNext.addEventListener('click', function(){
    qi = (qi + 1) % QS.length;
    correct = 0;
    elScore.textContent = 'Answer all five statements — there is no penalty for a wrong one.';
    render();
  });
  render();

  /* ---------- tabs ---------- */
  var tabBtns = document.querySelectorAll('.tabs button');
  tabBtns.forEach(function(b){
    b.addEventListener('click', function(){
      tabBtns.forEach(function(x){ x.classList.remove('on'); });
      document.querySelectorAll('.tabpane').forEach(function(p){ p.classList.remove('on'); });
      b.classList.add('on');
      document.getElementById(b.dataset.tab).classList.add('on');
    });
  });

  /* ---------- route finder ---------- */
  var stage = 'trainee', goal = 'uk';
  var STAGE = {
    trainee:  'You are in the best possible position, because Part I can be sat during training and a pass never expires.',
    md:       'With training complete you are eligible for both parts, so the question is sequencing rather than eligibility.',
    frca:     'Holding the FRCA or FCAI exempts you from Part I — you enter at Part II.',
    consultant:'Years post-training is not a barrier. What changes is that your revision has to be rebuilt around basic sciences you have not formally revisited in a while.'
  };
  var GOAL = {
    uk: ['Sit Part I now — it is currently accepted as exemption from the Primary FRCA, saving you a sitting, a set of fees and a trip.',
         'Confirm the current exemption position in Section 7 of the RCoA examination regulations, since these rules were revised recently.',
         'Run GMC registration as a separate parallel track. The diploma removes an exam barrier; it does not create a right to work.',
         'Decide whether you are aiming at the Final FRCA or a specialist registration portfolio — they need different evidence.'],
    eu: ['This is the qualification\u2019s home ground. Sit Part I, then Part II once you hold specialist certification.',
         'Check the ESAIC country list to confirm your national diploma is recognised for Part II entry.',
         'Start language certification now if you are targeting a specific country — it takes longer than the exam does.',
         'Treat national registration and recognition of training as a separate workstream running alongside.'],
    ie: ['Sit Part I — it is recognised for exemption from the Irish primary-level examination.',
         'Ireland is often the most realistic first European post for international graduates, so build the application in parallel with revision.',
         'Confirm the current exemption position directly with the College of Anaesthesiologists of Ireland.',
         'If you later shift to the UK, the same diploma still works in your favour.'],
    uae: ['Be clear-eyed: no diploma bypasses licensing. Your route runs through the unified PQR, DataFlow verification and an authority assessment.',
          'Identify the emirate first — DHA for Dubai, DOH for Abu Dhabi, MOHAP for the Northern Emirates. They are separate licences.',
          'Use the EDAIC to strengthen the file rather than to shortcut it. It makes your specialist standing legible to an assessor who may not know your national degree.',
          'Check the PQR for your grade and specialty before you assume a diploma changes your eligibility band.'],
    nonclin: ['An internationally recognised specialist credential is what makes a CV readable to a non-clinical recruiter who cannot assess a national degree.',
              'Pair it with something that shows structured written thinking — publications, peer review, or a completed research project.',
              'Pharmacovigilance and medical writing are the most accessible first steps; medical affairs and medical monitor roles usually want a couple of years of specialist practice first.',
              'Sit Part I regardless. It costs you one exam cycle and it opens the clinical routes at the same time, so you are not closing a door.']
  };

  function paint(){
    var out = document.getElementById('routeOut');
    var items = GOAL[goal].map(function(s){ return '<li>' + s + '</li>'; }).join('');
    out.innerHTML =
      '<h3>Where to start</h3>' +
      '<p>' + STAGE[stage] + '</p>' +
      '<ol>' + items + '</ol>' +
      '<p class="route__hint" style="margin-top:1.1rem">This is a starting frame, not advice on your specific file. Send your details and you will be pointed to the right starting module.</p>';
  }
  function wire(id, set){
    var box = document.getElementById(id);
    box.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){
        box.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        set(b.dataset.v);
        paint();
      });
    });
  }
  wire('qStage', function(v){ stage = v; });
  wire('qGoal',  function(v){ goal  = v; });
  paint();

  /* ---------- plan buttons prefill the contact form ---------- */
  document.querySelectorAll('[data-plan]').forEach(function(a){
    a.addEventListener('click', function(){
      var sel = document.getElementById('fPlan');
      for (var i=0;i<sel.options.length;i++){
        if (sel.options[i].text === a.dataset.plan) sel.selectedIndex = i;
      }
    });
  });

  /* ---------- contact: compose a message, open WhatsApp or mail ---------- */
  var WA_NUMBER = '91XXXXXXXXXX';                 // EDIT
  var EMAIL     = 'hello@crestoneducation.com';   // EDIT

  function compose(){
    var n = document.getElementById('fName').value.trim() || 'Hello';
    return n + ' here.\n' +
           'Stage: ' + document.getElementById('fStage').value + '\n' +
           'Enquiring about: ' + document.getElementById('fPlan').value + '\n\n' +
           (document.getElementById('fMsg').value.trim() || '(no question written yet)');
  }
  function flash(){
    var s = document.getElementById('sentNote');
    s.classList.add('on');
    setTimeout(function(){ s.classList.remove('on'); }, 5000);
  }
  document.getElementById('sendWa').addEventListener('click', function(){
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(compose()), '_blank');
    flash();
  });
  document.getElementById('sendMail').addEventListener('click', function(){
    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('EDAIC enquiry — ' + document.getElementById('fPlan').value) +
      '&body=' + encodeURIComponent(compose());
    flash();
  });

  /* ---------- nav highlight ---------- */
  var links = document.querySelectorAll('.nav__links a');
  var targets = [].map.call(links, function(a){ return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        links.forEach(function(l,i){ l.classList.toggle('on', targets[i] === e.target); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function(t){ if (t) io.observe(t); });
  }
})();
