const sketches = [
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

function openSidebar() {
  sidebar.classList.add("open");
  sidebar.setAttribute("aria-hidden", "false");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebar.setAttribute("aria-hidden", "true");
}

// Build sidebar list
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

hamburger.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);

// Load first sketch on startup
loadSketch(sketches[0]);
