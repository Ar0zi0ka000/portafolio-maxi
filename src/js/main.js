// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Cargar proyectos desde JSON y renderizarlos
async function loadProjects() {
  try {
    const res = await fetch("data/projects.json", { cache: "no-store" });
    const items = await res.json();
    renderProjects(items);
  } catch (e) {
    console.error("No se pudo cargar projects.json", e);
  }
}

function renderProjects(items) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.image || "src/assets/img/placeholder.jpg";
    img.alt = p.title || "Proyecto";

    const body = document.createElement("div");
    body.className = "card-body";

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    const desc = document.createElement("p");
    desc.textContent = p.description || "";

    const links = document.createElement("div");
    links.className = "links";

    if (p.demo) {
      const aDemo = document.createElement("a");
      aDemo.href = p.demo;
      aDemo.target = "_blank";
      aDemo.rel = "noreferrer";
      aDemo.className = "link";
      aDemo.textContent = "Demo";
      links.appendChild(aDemo);
    }

    if (p.repo) {
      const aRepo = document.createElement("a");
      aRepo.href = p.repo;
      aRepo.target = "_blank";
      aRepo.rel = "noreferrer";
      aRepo.className = "link";
      aRepo.textContent = "Código";
      links.appendChild(aRepo);
    }

    body.appendChild(h3);
    body.appendChild(desc);
    body.appendChild(links);

    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

loadProjects();
