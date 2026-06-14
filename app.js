const REPO_CONTENTS_API =
  "https://api.github.com/repos/mimicry00/interactive-computing-site/contents/";
const SKETCH_PATTERN = /^\d+_/;

// Fallback for when the GitHub API is unreachable (e.g. rate-limited)
const FALLBACK_SKETCHES = [
  "01_hommage_Ellsworth_Kelly",
  "02_rotating_line",
  "03_arrows",
  "04_trail",
  "05_vines",
  "06_worms",
  "07_rings",
  "08_dusts",
  "09_fountain",
  "10_exploding_typo",
  "11_flowfield",
  "12_cross-rects",
  "13_color_drops",
  "14_open_your_mouth",
];

const iframe = document.getElementById("sketch-frame");
const sketchTitle = document.querySelector(".sketch-title");
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");
const sketchList = document.querySelector(".sketch-list");

function displayName(folder) {
  return folder.replace(/_/g, " ");
}

function loadSketch(folder) {
  iframe.src = folder + "/index.html";
  sketchTitle.textContent = displayName(folder);
  sketchList.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.dataset.folder === folder);
  });
  closeSidebar();
}

function buildList(sketches) {
  sketchList.innerHTML = "";
  sketches.forEach((folder) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = displayName(folder);
    a.dataset.folder = folder;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      loadSketch(folder);
    });
    li.appendChild(a);
    sketchList.appendChild(li);
  });
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebar.setAttribute("aria-hidden", "false");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebar.setAttribute("aria-hidden", "true");
}

async function fetchSketchFolders() {
  const res = await fetch(REPO_CONTENTS_API);
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const items = await res.json();
  return items
    .filter((item) => item.type === "dir" && SKETCH_PATTERN.test(item.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => item.name);
}

async function init() {
  let sketches;
  try {
    sketches = await fetchSketchFolders();
  } catch (err) {
    console.warn("GitHub API unavailable, using fallback list.", err);
    sketches = FALLBACK_SKETCHES;
  }
  buildList(sketches);
  if (sketches.length > 0) loadSketch(sketches[0]);
}

hamburger.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);

init();
