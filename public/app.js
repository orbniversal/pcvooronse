document.body.className = window.app.body;
const box = document.createElement('div');
box.className = window.app.box;
const abovebar = document.createElement('div');
abovebar.className = window.app.abovebar;
const clock = document.createElement('div');
clock.className = window.app.clock;
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}
abovebar.appendChild(clock);
box.appendChild(abovebar);

const content = document.createElement('div');
content.className = window.app.content;

const navigation = document.createElement('div');
navigation.className = window.app.navigation

const sections = {
  over: 'Wie ben ik?',
  ervaringen: 'Mijn ervaringen',
  services: 'Wat bied ik aan?', 
  contact: 'Neem contact en stel je vraag',
  forum: 'Forum'
};

Object.entries(sections).forEach(([id, text]) => {
  const _button = document.createElement('button');
  _button.className = window.app.navigation_button;
  _button.textContent = text;
  _button.onclick = () => show_section(id);
  navigation.appendChild(_button);
});

const sections_box = document.createElement('div');
sections_box.style.minHeight = '200px';

function show_section(id) {
  sections_box.innerHTML = '';
  const section = document.createElement('div');
  
  switch(id) {
    case 'over':
      section.innerHTML = `<h2>Wie ben ik?</h2>
      <p>Naam: Thienpont kevin</p>
      <p>Geboortedatum: 26/07/1993</p>
      <p>Kennis: Basis Windows en Android</p>
      <p>Gereedschap:</p>
      <ul><li>Meer dan 5 computers en 2 smartphones.</li>
      <li>AI Assistent ( Robot met heel veel kennis ).</li>
      <li>Toegang tot de meest recente Windows 11 installatie bestanden.</li></ul>`;
      break;
    case 'services':
      section.innerHTML = `<h2>Wat bied ik aan?</h2>
      <ul><li> Tips, adviesen & uitleg.</li>
      <li> Organisering en opruimingen.</li>
      <li> Een proper Windows installatie.</li>
      <li> Ik kom aan huis bij een afspraak en ga aan de slag.</li></ul>`;
      break;
    case 'ervaringen':
      section.innerHTML = `<h2>Mijn ervaringen</h2>
      <p>Sinds de jaren 2000 stapelgek van computers.</p>
      <p>Er is geen dag waar ik daar niet mee bezig ben.</p>
      <p>Alles is zelf aangeleerd & heb gevoel voor coderen.</p>
      <p>Ik kan programma's aanmaken met functie's naar je wens.</p>
      <p>Ik heb weinig kennis in de hardware gedeelte van computers.</p>`;
      break;
    case 'contact':
      section.innerHTML = `<h2>Contact</h2>
        <p>Email: orbniversal@gmail.com</p>
        <p>Gsm: +32 460/943/907</p>`;
      break;
    case 'forum':
      section.innerHTML = `<h2>Forum</h2>
      <p>Meld je aan & deel problemen en oplossingen met anderen.</p>
      <p>Niks is beter dan eens vragen aan andere mensen</p>
      <p>via bericht of video gesprek voor een oplossing naar een probleem</p>
      <p>of gewoon eens een babbel doen over computers & smartphones</p>
      <p>als ik afwezig ben.</p>`;
      break;
  }
  
  sections_box.appendChild(section);
}

content.appendChild(navigation);
content.appendChild(sections_box);
box.appendChild(content);
document.body.appendChild(box);

show_section('over');
updateClock();
setInterval(updateClock, 1000);