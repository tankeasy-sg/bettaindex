const species = [
  {
    scientific: 'Betta splendens',
    common: 'Wild Siamese Fighter',
    region: 'Thailand, Cambodia, Laos',
    habitat: 'rice-paddy',
    water: 'Still, shallow, warm lowland waters',
    temperament: 'Territorial males; moderate in community species tanks',
    notes:
      'The famous ancestor of domestic bettas. Wild forms are slimmer and less finnage-heavy than ornamental strains.',
    ph: '6.5–7.5',
    temp: '24–30°C',
  },
  {
    scientific: 'Betta hendra',
    common: 'Hendra Betta',
    region: 'Kalimantan, Borneo',
    habitat: 'peat-swamp',
    water: 'Acidic peat pools and blackwater drainages',
    temperament: 'Relatively calm in species setup; mouthbrooder',
    notes:
      'Known for iridescent blue-green flanks and red fins. Sensitive to poor water quality shifts.',
    ph: '4.0–6.0',
    temp: '24–28°C',
  },
  {
    scientific: 'Betta macrostoma',
    common: 'Brunei Beauty',
    region: 'Brunei, Sarawak (Borneo)',
    habitat: 'slow-stream',
    water: 'Cooler, clear forest creeks with leaf litter',
    temperament: 'Pairs can be assertive during spawning',
    notes:
      'One of the most sought-after wild bettas. Distinctive orange-red body and large mouthbrooding behavior.',
    ph: '6.0–7.2',
    temp: '21–26°C',
  },
  {
    scientific: 'Betta imbellis',
    common: 'Peaceful Betta',
    region: 'Malay Peninsula, southern Thailand',
    habitat: 'blackwater',
    water: 'Slow ditches, swamps, vegetated margins',
    temperament: 'Milder than splendens; still male territoriality',
    notes:
      'Ideal entry species for keepers transitioning from domestic lines to wild complexes.',
    ph: '5.5–7.0',
    temp: '24–29°C',
  },
  {
    scientific: 'Betta coccina',
    common: 'Scarlet Betta',
    region: 'Sumatra',
    habitat: 'peat-swamp',
    water: 'Very tannin-rich, extremely soft acidic swamp water',
    temperament: 'Shy, best in dimly lit planted biotopes',
    notes:
      'A classic blackwater jewel from the coccina complex, requiring stable low pH and leaf litter cover.',
    ph: '3.5–5.5',
    temp: '24–27°C',
  },
  {
    scientific: 'Betta albimarginata',
    common: 'White-Edged Betta',
    region: 'East Kalimantan, Borneo',
    habitat: 'slow-stream',
    water: 'Forest side channels and tributary creeks',
    temperament: 'Active and social relative to many wild species',
    notes:
      'Paternal mouthbrooder with bold orange and black contrast and characteristic white fin edging.',
    ph: '6.0–7.0',
    temp: '23–27°C',
  },
];

const speciesGrid = document.getElementById('speciesGrid');
const searchInput = document.getElementById('searchInput');
const chipRow = document.getElementById('chipRow');
const speciesDialog = document.getElementById('speciesDialog');
const dialogContent = document.getElementById('dialogContent');

let activeFilter = 'all';

const habitatLabel = {
  all: 'All habitats',
  blackwater: 'Blackwater',
  'peat-swamp': 'Peat swamp',
  'slow-stream': 'Slow stream',
  'rice-paddy': 'Rice paddy',
};

function renderSpecies() {
  const query = searchInput.value.toLowerCase().trim();
  const visible = species.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.habitat === activeFilter;
    const haystack = `${item.scientific} ${item.common} ${item.region} ${item.water}`.toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesFilter && matchesSearch;
  });

  speciesGrid.innerHTML = visible
    .map(
      (item, idx) => `
      <article class="species-card">
        <div>
          <h2>${item.scientific}</h2>
          <small>${item.common}</small>
        </div>
        <div class="meta">
          <span>${habitatLabel[item.habitat]}</span>
          <span>${item.temp}</span>
          <span>pH ${item.ph}</span>
        </div>
        <p>${item.notes}</p>
        <div class="card-actions">
          <button data-open="${idx}">Open profile</button>
        </div>
      </article>
    `
    )
    .join('');

  if (!visible.length) {
    speciesGrid.innerHTML =
      '<article class="species-card"><h2>No results</h2><p>Try a different search term or habitat filter.</p></article>';
  }

  speciesGrid.querySelectorAll('button[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => openDialog(visible[Number(btn.dataset.open)]));
  });
}

function openDialog(item) {
  dialogContent.innerHTML = `
    <h2>${item.scientific}</h2>
    <p><strong>Common name:</strong> ${item.common}</p>
    <p><strong>Native range:</strong> ${item.region}</p>
    <p><strong>Habitat:</strong> ${habitatLabel[item.habitat]}</p>
    <p><strong>Water style:</strong> ${item.water}</p>
    <p><strong>Temperature:</strong> ${item.temp}</p>
    <p><strong>pH:</strong> ${item.ph}</p>
    <p><strong>Temperament:</strong> ${item.temperament}</p>
    <p>${item.notes}</p>
  `;

  speciesDialog.showModal();
}

chipRow.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.filter) {
    return;
  }

  activeFilter = target.dataset.filter;
  chipRow.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('is-active'));
  target.classList.add('is-active');
  renderSpecies();
});

searchInput.addEventListener('input', renderSpecies);

renderSpecies();
