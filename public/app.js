(async () => {
  await import('./window/window.js');

  document.body.className = window.app.pagina;
  const box = document.createElement('div');
  box.className = window.app.box;
  const balk = document.createElement('div');
  balk.className = window.app.balk;

  const menu = document.createElement('button');
  menu.className = window.app.menu;
  const menu_icoon = document.createElement('img');
  menu_icoon.src = './favicon.ico';
  menu_icoon.alt = 'Explore';
  menu.appendChild(menu_icoon);

  const menu_box = document.createElement('div');
  menu_box.className = window.app.menu_box;

  const menu_onderdelen = [
    {
      naam: 'Welkom',
      submenu: []
    }, {
      naam: 'Donaties',
      submenu: []
    }, {
      naam: 'Eigenaar',
      submenu: ['Studies', 'Gegevens']
    }, {
      naam: 'Organisatie',
      submenu: ['Gegevens', 'Ervaringen', 'Gereedschappen']
    }, {
      naam: 'Documentatie',
      submenu: ['Diensten', 'Kennissen', 'Rondleiding']
    }
  ];

  let open_Submenu = null;

  menu_onderdelen.forEach(onderdeel => {
    const menu_onderdeel = document.createElement('div');
    menu_onderdeel.className = window.app.menu_onderdeel;

    const menu_naam = document.createElement('span');
    menu_naam.className = window.app.menu_naam;
    menu_naam.textContent = onderdeel.naam;
    menu_onderdeel.appendChild(menu_naam);

    if (onderdeel.submenu.length > 0) {
      const menu_pijltje = document.createElement('span');
      menu_pijltje.className = window.app.menu_pijltje;
      menu_pijltje.textContent = '▶';
      menu_onderdeel.appendChild(menu_pijltje);

      const submenu = document.createElement('div');
      submenu.className = window.app.submenu;

      onderdeel.submenu.forEach(sub_onderdeel => {
        const sub_menu_onderdeel = document.createElement('div');
        sub_menu_onderdeel.className = window.app.sub_menu_onderdeel;
        sub_menu_onderdeel.textContent = sub_onderdeel;

        sub_menu_onderdeel.addEventListener('click', () => {
          const module = `/window/window/${onderdeel.naam.toLowerCase()}` +
            `/${sub_onderdeel.toLowerCase()}.js`;
          open_menu(module);
          close_menu();
        });

        submenu.appendChild(sub_menu_onderdeel);
      });

      menu_onderdeel.appendChild(submenu);

      menu_onderdeel.addEventListener('mouseenter', () => {
        if (open_Submenu && open_Submenu !== submenu) {
          open_Submenu.classList.remove(window.app.submenu_open);
        }
        open_Submenu = submenu;
        submenu.classList.add(window.app.submenu_open);
      });
    } else {
      menu_onderdeel.addEventListener('mouseenter', () => {
        if (open_Submenu) {
          open_Submenu.classList.remove(window.app.submenu_open);
          open_Submenu = null;
        }
      });

      menu_onderdeel.addEventListener('click', () => {
        const module = `/window/${onderdeel.naam.toLowerCase()}.js`;
        open_menu(module);
        close_menu();
      });
    }

    menu_box.appendChild(menu_onderdeel);
  });

  const klok = document.createElement('div');
  klok.className = window.app.klok;
  function Klok_functie() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    klok.textContent = `${hours}:${minutes}:${seconds}`;
  }

  balk.appendChild(menu);
  balk.appendChild(klok);
  box.appendChild(balk);
  box.appendChild(menu_box);
  document.body.appendChild(box);

  let menu_open = false;

  function close_menu() {
    menu_open = false;
    menu_box.classList.remove(window.app.show);
    if (open_Submenu) {
      open_Submenu.classList.remove(window.app.submenu_open);
      open_Submenu = null;
    }
    setTimeout(() => menu_box.style.display = 'none', 300);
  }

  menu.addEventListener('click', () => {
    menu_open = !menu_open;
    if (menu_open) {
      menu_box.style.display = 'block';
      setTimeout(() => menu_box.classList.add(window.app.show), 10);
    } else {
      menu_box.classList.remove(window.app.show);
      if (open_Submenu) {
        open_Submenu.classList.remove(window.app.submenu_open);
        open_Submenu = null;
      }
      setTimeout(() => menu_box.style.display = 'none', 300);
    }
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menu_box.contains(e.target)) {
      menu_open = false;
      menu_box.classList.remove(window.app.show);
      if (open_Submenu) {
        open_Submenu.classList.remove(window.app.submenu_open);
        open_Submenu = null;
      }
      setTimeout(() => menu_box.style.display = 'none', 300);
    }
  });
  Klok_functie();
  setInterval(Klok_functie, 1000);
  const welkom_module = '/window/welkom.js';
  await open_menu(welkom_module);
})();