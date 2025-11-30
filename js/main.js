const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

let currentLang = localStorage.getItem("lang") || "en";
$("#lang").value = currentLang;

/* ============ VIEW SWITCHING ============== */
function showView(name){
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#view-" + name).classList.add("active");
}
$$("button[data-view]").forEach(btn => btn.onclick = () => showView(btn.dataset.view));
$$(".backBtn").forEach(b => b.onclick = () => showView("dashboard"));

/* ============ LOAD JSON FILES ============== */
let resources = [];
let trainings = [];

async function loadData(){
  resources = await fetch("data/resources.json").then(r=>r.json());
  trainings = await fetch("data/trainings.json").then(r=>r.json());
  renderLibrary();
  renderTraining();
}
loadData();

/* ============ LIBRARY ============== */
function renderLibrary(){
  const list = $("#libraryList");
  list.innerHTML = "";

  resources.forEach(r=>{
    const title = r.title[currentLang] || r.title.en;
    list.innerHTML += `
      <div class="resource">
        <div><strong>${title}</strong></div>
        <button class="btn" data-id="${r.id}">Download</button>
      </div>`;
  });
}

/* ============ TRAINING ============== */
function renderTraining(){
  const list = $("#trainingList");
  list.innerHTML = "";
  trainings.forEach(t=>{
    const title = t.title[currentLang] || t.title.en;
    list.innerHTML += `
      <div class="resource">
        <div><strong>${title}</strong></div>
        <button class="btn" data-tid="${t.id}">Download</button>
      </div>`;
  });
}

/* ============ LANGUAGE SWITCH ============== */
$("#lang").onchange = () => {
  currentLang = $("#lang").value;
  localStorage.setItem("lang", currentLang);
  renderLibrary();
  renderTraining();
};

/* ============ DARK MODE ============== */
$("#themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* ============ IMPACT CHART ============== */
function impactChart(){
  new Chart($("#impactChart"),{
    type:"bar",
    data:{
      labels:["Students","Teachers","Kiosks"],
      datasets:[{data:[1200,200,40],backgroundColor:["#0b6e4f","#0b6ea3","#fbbf24"]}]
    },
    options:{plugins:{legend:{display:false}}}
  });
}
impactChart();
