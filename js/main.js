const langSelect = document.getElementById('lang');
const content = document.getElementById('content');
const themeBtn = document.getElementById('themeBtn');
let currentLang = 'en';
let darkMode = false;

// sample resources
const resources = [
  {id:1, title:{en:'Numbers', hi:'संख्याएँ', kn:'ಸಂಖ್ಯೆಗಳು'}, grade:1, subject:'Math'},
  {id:2, title:{en:'Plants', hi:'पौधे', kn:'ಸಸ್ಯಗಳು'}, grade:3, subject:'Science'}
];
const trainings = [
  {id:1, title:{en:'Using Tablets', hi:'टैबलेट का उपयोग', kn:'ಟ್ಯಾಬ್ಲೆಟ್ ಬಳಸು'}},
];

// translations for UI
const translations = {
  library:{en:'Digital Library', hi:'डिजिटल पुस्तकालय', kn:'ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿ'},
  training:{en:'Training & Skills', hi:'प्रशिक्षण और कौशल', kn:'ಪ್ರಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯಗಳು'},
  mentorship:{en:'Mentorship', hi:'मेंटरशिप', kn:'ಮೆಂಟಾರ್‌ಶಿಪ್'},
  sync:{en:'Offline Sync', hi:'ऑफ़लाइन सिंक', kn:'ಆಫ್‌ಲೈನ್ ಸಿಂಕ್'},
  impact:{en:'Impact & Partners', hi:'प्रभाव और साझेदार', kn:'ಪ್ರಭಾವ ಮತ್ತು ಪಾಲುದಾರರು'},
  login:{en:'Login', hi:'लॉगिन', kn:'ಲಾಗಿನ್'},
  dark:{en:'Dark Mode', hi:'डार्क मोड', kn:'ಡಾರ್ಕ್ ಮೋಡ್'},
  light:{en:'Light Mode', hi:'लाइट मोड', kn:'ಲೈಟ್ ಮೋಡ್'}
};

// handle theme
themeBtn.addEventListener('click', ()=>{
  darkMode=!darkMode;
  document.documentElement.setAttribute('data-theme', darkMode?'dark':'light');
  themeBtn.textContent=darkMode?translations.light[currentLang]:translations.dark[currentLang];
});

// handle language change
langSelect.addEventListener('change', ()=>{
  currentLang=langSelect.value;
  renderLibrary();
  themeBtn.textContent=darkMode?translations.light[currentLang]:translations.dark[currentLang];
});

// view buttons
document.querySelectorAll('[data-view]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const view=btn.dataset.view;
    if(view==='library') renderLibrary();
    if(view==='training') renderTraining();
  });
});

// render library
function renderLibrary(){
  content.innerHTML='';
  const h=document.createElement('h2');
  h.textContent=translations.library[currentLang];
  content.appendChild(h);
  resources.forEach(r=>{
    const div=document.createElement('div');
    div.className='card';
    div.textContent=`${r.title[currentLang]} — Grade ${r.grade} — ${r.subject}`;
    content.appendChild(div);
  });
}

// render training
function renderTraining(){
  content.innerHTML='';
  const h=document.createElement('h2');
  h.textContent=translations.training[currentLang];
  content.appendChild(h);
  trainings.forEach(t=>{
    const div=document.createElement('div');
    div.className='card';
    div.textContent=`${t.title[currentLang]}`;
    content.appendChild(div);
  });
}

// initial render
renderLibrary();
