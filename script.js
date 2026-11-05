'use strict';
(() => {
  const root = document.documentElement;
  const motion = document.getElementById('motion-on');
  const theme = document.getElementById('light-theme');
  const menu = document.querySelector('.mobile-menu');
  const appearance = document.querySelector('.appearance');
  const header = document.querySelector('.header');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'modern-portfolio-finance-preview-v1';
  let currentLanguage = 'tr';
  const translations = {
    "Modern Portföy — Finans Demo Denemesi": "Modern Portfolio — Finance Demo Preview",
    "Canlı finans demosu ↗": "Try the finance demo ↗",
    "İleri düzey okuma ve yazma; teknik dokümantasyon takibinde yetkinlik.": "Advanced reading and writing; proficient in following technical documentation.",
    "Teknik dokümantasyon": "Technical documentation",
    "Okuma ve yazma": "Reading and writing",
    "Etkileşimli royal blue 3B halka": "Interactive royal blue 3D ring",
    "3B halka. Sürükleyerek veya yön tuşlarıyla döndürün.": "3D ring. Drag or use the arrow keys to rotate.",
    "Sürükle ve döndür · Yön tuşları da çalışır": "Drag to rotate · Arrow keys work too",
    "Sıfırla": "Reset",
  "Modern Portföy — JS Deneme Sürümü": "Modern Portfolio — JavaScript Edition",
  "İçeriğe geç": "Skip to content",
  "Modern Portföy": "Modern Portfolio",
  "Hakkımda": "About",
  "Yaklaşımım": "My approach",
  "Projeler": "Projects",
  "Yetkinlikler": "Skills",
  "Eğitim": "Education",
  "İletişim ↗": "Contact ↗",
  "Menü": "Menu",
  "Görünüm": "Appearance",
  "Görünüm tercihleri": "Appearance preferences",
  "Açık tema": "Light theme",
  "Siyah veya beyaz zemin": "Dark or light background",
  "Animasyonlar": "Animations",
  "Kaydırma ve kart efektleri": "Scroll and card effects",
  "Tema ve animasyon tercihleri bu tarayıcıda hatırlanır.": "Theme and animation preferences are remembered in this browser.",
  "YAZILIM GELİŞTİRİCİ": "SOFTWARE DEVELOPER",
  "Python · Android · Veri Tabanları": "Python · Android · Databases",
  "Bilgisayar Mühendisliği Öğrencisi": "Computer Engineering Student",
  "Python, mobil uygulamalar ve veri tabanları üzerine çalışıyorum. Temiz, sürdürülebilir ve ölçeklenebilir yazılımlar geliştirmeye odaklanıyorum.": "I work on Python, mobile applications and databases, focusing on clean, maintainable and scalable software.",
  "Projelerimi incele": "Explore my projects",
  "İletişime geç ↗": "Get in touch ↗",
  "PYTHON / ANDROID / VERİ TABANI": "PYTHON / ANDROID / DATABASES",
  "Temiz kod.": "Clean code.",
  "Sürdürülebilir çözümler.": "Maintainable solutions.",
  "ELAZIĞ / TÜRKİYE": "ELAZIĞ / TÜRKİYE",
  "ELAZIĞ, TÜRKİYE · İSTANBUL / ANKARA’DA STAJ YAPABİLİRİM": "ELAZIĞ, TÜRKİYE · AVAILABLE FOR INTERNSHIPS IN ISTANBUL / ANKARA",
  "Beni tanı ↓": "Get to know me ↓",
  "01 / HAKKIMDA": "01 / ABOUT",
  "Öğrenerek gelişiyor,": "Learning to grow,",
  "üreterek ilerliyorum.": "building to move forward.",
  "Fırat Üniversitesi’nde Bilgisayar Mühendisliği öğrencisiyim. Python geliştirme, mobil ve masaüstü uygulama mimarileri ile veri tabanı yönetimi alanlarında çalışıyorum.": "I am a Computer Engineering student at Fırat University. I work on Python development, mobile and desktop application architectures, and database management.",
  "Asenkron programlama, kullanıcı odaklı arayüz tasarımı ve veri güvenliği konularında pratik deneyime sahibim. Yazılım mühendisliği ilkelerini benimseyerek temiz ve sürdürülebilir kod üretmeye önem veriyorum.": "I have practical experience in asynchronous programming, user-focused interface design and data security. I follow software engineering principles to write clean, maintainable code.",
  "Otomasyon projelerine ilgi duyuyor, teknolojik gelişmeleri yakından takip ediyorum. Teknik birikimimi dinamik bir çalışma ortamında profesyonel projelere dönüştürmeyi hedefliyorum.": "I am interested in automation projects and keep up with new technologies. My goal is to apply my technical knowledge to professional projects in a dynamic team.",
  "Analitik problem çözme": "Analytical problem solving",
  "Hızlı öğrenme": "Fast learning",
  "Ekip çalışması": "Teamwork",
  "Agile iş birliği": "Agile collaboration",
  "02 / YAKLAŞIMIM": "02 / MY APPROACH",
  "Nasıl": "How",
  "çalışıyorum?": "I work.",
  "Problemi anlamaktan kodu iyileştirmeye: projelerimde izlediğim yaklaşım.": "From understanding a problem to improving the code: the approach I take in my projects.",
  "01 / ANLA": "01 / UNDERSTAND",
  "Problemi tanımla.": "Define the problem.",
  "İhtiyacı ve verinin yapısını netleştiririm. Finans uygulamamda gelir, gider ve net yekün analizlerini; akademik veri tabanı projemde normalizasyon ve ilişkileri temel aldım.": "I clarify the requirements and data structure. My finance app focuses on income, expenses and net balances; my academic database project focuses on normalization and relationships.",
  "Finans takibi · Veri tabanı tasarımı": "Finance tracking · Database design",
  "02 / GELİŞTİR": "02 / DEVELOP",
  "Yapıyı kur, birlikte üret.": "Build the structure, work together.",
  "Arayüzü ve veri akışını birlikte ele alırım. Android projesinde Jetpack Compose ve MVVM ile çalıştım; Git/GitHub üzerinden ekiple kod senkronizasyonu sağladım.": "I consider the interface and data flow together. In the Android project, I worked with Jetpack Compose and MVVM, using Git/GitHub to synchronize code with the team.",
  "Android · MVVM · Ekip çalışması": "Android · MVVM · Teamwork",
  "03 / KONTROL ET": "03 / REVIEW",
  "Hataları çöz, iyileştir.": "Debug and improve.",
  "Hata ayıklamayı ve veri işlemlerini geliştirme sürecinin parçası olarak görürüm. Android projesinde ekiple teknik sorunları çözdüm; finans uygulamasında SQLite sorgularını optimize ettim.": "I treat debugging and data operations as part of development. I worked with the Android team to resolve technical issues and optimized SQLite queries in my finance app.",
  "Hata ayıklama · Sorgu optimizasyonu": "Debugging · Query optimization",
  "03 / ÖNE ÇIKAN PROJELER": "03 / FEATURED PROJECTS",
  "Fikirden": "From ideas",
  "uygulamaya.": "to applications.",
  "GitHub profilim ↗": "My GitHub profile ↗",
  "(yeni sekme)": "(new tab)",
  "Her projede neyi amaçladığımı ve nasıl katkı sunduğumu keşfet. Ayrıntılar için kartı aç.": "Explore the purpose of each project and my contribution. Open a card to see the details.",
  "3 proje gösteriliyor.": "3 projects shown.",
  "Projeleri teknolojiye göre filtrele": "Filter projects by technology",
  "Tümü": "All",
  "Veri tabanı": "Databases",
  "Android geliştirme": "Android development",
  "Akıllı Rol Analizi ve Mobil Entegrasyon": "Smart Role Analysis & Mobile Integration",
  "AMAÇ": "PURPOSE",
  "Rol analiz süreçlerini optimize eden, modern Android mimarisine uygun bir mobil uygulama geliştirmek.": "Develop a mobile application that improves role analysis workflows using a modern Android architecture.",
  "KATKIM": "MY CONTRIBUTION",
  "Ekip içinde arayüz, durum yönetimi ve API entegrasyonları üzerinde çalıştım.": "I worked with the team on interfaces, state management and API integrations.",
  "TEKNOLOJİLER": "TECHNOLOGIES",
  "Katkımı incele": "Explore my contribution",
  "Ayrıntıları kapat": "Close details",
  "Projede üstlendiklerim": "My responsibilities",
  "Arayüz ve mimari": "Interface and architecture",
  "Jetpack Compose ile dinamik ve kullanıcı dostu arayüzler tasarladım. MVVM ve ViewModel kullanarak durum yönetimini uyguladım.": "I designed dynamic, user-friendly interfaces with Jetpack Compose and implemented state management using MVVM and ViewModel.",
  "Veri entegrasyonu": "Data integration",
  "Uzak sunucu ve servislerle veri alışverişi için güvenli API entegrasyonları gerçekleştirdim.": "I implemented secure API integrations to exchange data with remote servers and services.",
  "Git/GitHub ile kod senkronizasyonuna katkı sağladım; teknik çelişkiler ve hata ayıklama süreçlerinde ekiple koordineli çalıştım.": "I contributed to code synchronization with Git/GitHub and coordinated with the team to resolve technical conflicts and debug issues.",
  "Masaüstü uygulama": "Desktop application",
  "Kişisel Finans Takip Uygulaması": "Personal Finance Tracker",
  "Kişisel gelir, gider ve net yekün analizlerini tek bir masaüstü uygulamasında yönetmek.": "Manage personal income, expenses and net balance analysis in one desktop application.",
  "Uygulamayı Python ve Flet ile geliştirdim; SQLite veri katmanını ve arayüzünü hazırladım.": "I built the application with Python and Flet, including its SQLite data layer and user interface.",
  "Uygulama geliştirme": "Application development",
  "Flet çerçevesiyle bağımsız bir masaüstü uygulaması geliştirdim. Gelir, gider ve net yekün analizlerini yöneten finansal mantığı uyguladım.": "I developed a standalone desktop application using Flet and implemented the financial logic for income, expense and net balance analysis.",
  "Veri ve arayüz": "Data and interface",
  "SQLite ile güvenli veri saklama ve gerçek zamanlı güncellemeler için sorgu optimizasyonu üzerinde çalıştım. Excel dışa aktarımı ve grafik tabanlı veri görselleştirmeye odaklanan bir arayüz tasarladım.": "I worked on secure data storage with SQLite and query optimization for real-time updates. I designed an interface focused on Excel exports and chart-based data visualization.",
  "Geliştirme süreci": "Development process",
  "Geliştirmeyi hızlandırmak, kod yapısını optimize etmek ve finansal mantığı uygulamak için yapay zekâ araçlarından yararlandım.": "I used AI tools to speed up development, optimize code structure and implement financial logic.",
  "Akademik proje": "Academic project",
  "Veri Tabanı Şeması Tasarımı": "Database Schema Design",
  "Yerel bir platform için ilişkisel bir veri tabanı mimarisi oluşturmak.": "Create a relational database architecture for a local platform.",
  "Veri normalizasyonuna ve tablolar arasındaki ilişkilerin verimli tasarımına odaklandım.": "I focused on data normalization and efficient design of table relationships.",
  "İlişkisel tasarım": "Relational design",
  "Normalizasyon": "Normalization",
  "Veri modeli": "Data model",
  "Veri normalizasyonu ve verimli ilişki haritalandırmasını temel alarak ilişkisel veri tabanı mimarisi tasarladım.": "I designed a relational database architecture based on data normalization and efficient relationship mapping.",
  "SQL ve optimizasyon": "SQL and optimization",
  "SQL betikleri ve veri tabanı optimizasyonu üzerine uygulamalı deneyim kazandım.": "I gained hands-on experience with SQL scripts and database optimization.",
  "04 / TEKNİK YETKİNLİKLER": "04 / TECHNICAL SKILLS",
  "Kullandığım": "Technologies",
  "teknolojiler.": "I work with.",
  "Programlama": "Programming",
  "Python — ileri düzey / yetkin": "Python — advanced / proficient",
  "Kotlin — temel, geliştirmekte": "Kotlin — basic, developing",
  "Java — temel düzey": "Java — basic",
  "Python’da asenkron programlama": "Asynchronous programming in Python",
  "MVVM · kullanıcı odaklı arayüzler": "MVVM · user-focused interfaces",
  "Veri tabanları": "Databases",
  "İlişkisel tasarım · normalizasyon": "Relational design · normalization",
  "CRUD işlemleri · SQL": "CRUD operations · SQL",
  "Araçlar ve ağ temelleri": "Tools and networking fundamentals",
  "Linux temel komutları ve terminal": "Basic Linux commands and terminal",
  "TCP/IP · topolojiler · routing · ağ otomasyonu temelleri": "TCP/IP · topologies · routing · network automation fundamentals",
  "YABANCI DİL": "LANGUAGES",
  "İngilizce": "English",
  "— İleri düzey okuma ve yazma; teknik dokümantasyon takibinde yetkinlik.": "— Advanced reading and writing; proficient in following technical documentation.",
  "05 / EĞİTİM": "05 / EDUCATION",
  "Akademik": "My academic",
  "yolculuğum.": "journey.",
  "Yazılım geliştirmenin temellerini, uygulamalı projelerle bir araya getiriyorum.": "I bring together software development fundamentals and hands-on projects.",
  "2022 — Devam ediyor": "2022 — Present",
  "Fırat Üniversitesi": "Fırat University",
  "Bilgisayar Mühendisliği · Lisans": "Computer Engineering · Bachelor's degree",
  "ODAKLANDIĞIM DERSLER": "RELEVANT COURSEWORK",
  "Bilgisayar Ağları": "Computer Networks",
  "Veri Tabanı Yönetim Sistemleri": "Database Management Systems",
  "İşletim Sistemleri": "Operating Systems",
  "Yazılım Mimarisi": "Software Architecture",
  "Veri Yapıları ve Algoritmalar": "Data Structures and Algorithms",
  "06 / İLETİŞİM": "06 / CONTACT",
  "Birlikte üretmek için": "Let's build",
  "iletişime geçelim.": "something together.",
  "Elazığ, Türkiye’deyim. İstanbul ve Ankara’da staj yapabilirim. Staj ve proje fırsatları için bana ulaşabilirsiniz.": "I am based in Elazığ, Türkiye, and available for internships in Istanbul and Ankara. Contact me about internship and project opportunities.",
  "E-posta gönder": "Send an email",
  "Staj ve proje fırsatları için doğrudan yaz.": "Write to me directly about internships and projects.",
  "E-posta adresini kopyala": "Copy email address",
  "GitHub’ı incele": "Explore GitHub",
  "Kodlarıma ve geliştirdiğim çalışmalara göz at.": "Take a look at my code and development work.",
  "Yeni sekmede açılır.": "Opens in a new tab.",
  "LinkedIn’de bağlantı kur": "Connect on LinkedIn",
  "Profesyonel iletişim için profilime ulaş.": "Visit my profile to connect professionally.",
  "Adresi seçip kopyalayabilirsiniz:": "Select and copy the address:",
  "CV’yi yazdır / PDF kaydet: Ctrl+P · Mac: ⌘P": "Print CV / Save as PDF: Ctrl+P · Mac: ⌘P",
  "Başa dön ↑": "Back to top ↑",
  "Başa dön": "Back to top",
  "PROJE DETAYI": "PROJECT DETAILS",
  "Kapat ×": "Close ×",
  "Dil": "Language",
  "İçerik dili": "Content language",
  "Tema, dil ve animasyon tercihleri bu tarayıcıda hatırlanır.": "Theme, language and animation preferences are remembered in this browser.",
  "Mehmet Emre Sinekli — Fırat Üniversitesi Bilgisayar Mühendisliği öğrencisi. Python, Android ve veri tabanı projeleri, eğitim ve teknik yetkinlikler.": "Mehmet Emre Sinekli — Computer Engineering student at Fırat University. Python, Android and database projects, education and technical skills.",
  "Sayfa okuma ilerlemesi": "Page reading progress",
  "Modern Portföy, ana sayfa": "Modern Portfolio, home",
  "Ana menü": "Main navigation",
  "Mobil menü": "Mobile navigation",
  "Royal blue halkalar ve yörüngelerden oluşan soyut kompozisyon": "Abstract composition of royal blue rings and orbits",
  "Güçlü yönler": "Strengths",
  "E-posta adresi": "Email address",
  "Sayfanın başına dön": "Back to the top of the page",
  "Proje penceresini kapat": "Close project dialog",
  "E-posta adresi kopyalandı.": "Email address copied.",
  "Otomatik kopyalama kullanılamıyor. Seçili adresi Ctrl+C veya ⌘C ile kopyalayabilirsiniz.": "Automatic copying is unavailable. Copy the selected address with Ctrl+C or ⌘C."
};
  const translate = value => currentLanguage === 'en' ? (translations[value] || value) : value;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch { /* Storage can be unavailable for local files. */ }
  theme.checked = saved.light === true;
  motion.checked = typeof saved.motion === 'boolean' ? saved.motion : !media.matches;
  root.classList.add('js-enabled');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Observe stationary layout boxes, animate their contents. Watching a moving
  // element can repeatedly cross the viewport edge and restart its own effect.
  const targets = [...document.querySelectorAll('.hero-copy, .about-content, .section-heading, .workflow-grid li, .cv-project > summary, .skill-card, .language-row, .education-layout, .contact-inner')];
  const records = targets.map(target => ({
    target,
    anchor: target.matches('summary') ? target.parentElement : target,
    pieces: target.matches('summary') ? [target] : [...target.children]
  }));
  const recordByAnchor = new Map(records.map(record => [record.anchor, record]));
  const played = new WeakSet();
  const running = new Map();
  records.forEach(record => record.target.classList.add('js-reveal'));
  function inView(element) {
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && box.top < innerHeight - 12 && box.bottom > header.offsetHeight;
  }
  function animatePiece(element, delay = 0, duration = 650) {
    if (!motion.checked || typeof element.animate !== 'function') return;
    running.get(element)?.cancel();
    const animation = element.animate([
      { opacity: 0.25, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration, delay, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    running.set(element, animation);
    const release = () => { if (running.get(element) === animation) running.delete(element); };
    animation.onfinish = release;
    animation.oncancel = release;
  }
  function enter(target, delay = 0) {
    const record = records.find(item => item.target === target);
    if (!record || !motion.checked || !inView(record.anchor)) return;
    played.add(record.anchor);
    record.pieces.forEach((piece, index) => animatePiece(piece, delay + Math.min(index * 35, 140)));
  }
  function stopAnimations() {
    running.forEach(animation => animation.cancel());
    running.clear();
  }
  function save() {
    try { localStorage.setItem(key, JSON.stringify({ light: theme.checked, motion: motion.checked, language: currentLanguage })); } catch { /* Session controls still work. */ }
  }
  theme.addEventListener('change', save);
  motion.addEventListener('change', () => {
    stopAnimations();
    if (motion.checked) records.filter(record => inView(record.anchor)).forEach((record, index) => enter(record.target, Math.min(index * 60, 180)));
    save();
  });
  media.addEventListener('change', event => {
    if (event.matches) { motion.checked = false; stopAnimations(); save(); }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const record = recordByAnchor.get(entry.target);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.05 && !played.has(entry.target)) {
          const card = record.target.closest('.cv-project');
          const index = card ? [...card.parentElement.children].indexOf(card) : 0;
          enter(record.target, Math.min(index * 90, 180));
        } else if (!entry.isIntersecting) {
          played.delete(entry.target);
        }
      });
    }, { threshold: [0, 0.05], rootMargin: '0px 0px -12px 0px' });
    records.forEach(record => observer.observe(record.anchor));
  }

  function closePanels() { menu.open = false; appearance.open = false; }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const opened = [menu, appearance].find(panel => panel.open);
    if (opened) { opened.open = false; opened.querySelector('summary').focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.mobile-menu, .appearance')) closePanels();
  });
  function navigate(id) {
    const target = id ? document.getElementById(id) : document.getElementById('icerik');
    if (!target) return;
    closePanels();
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: motion.checked ? 'smooth' : 'instant', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = link.getAttribute('href');
      const id = hash.slice(1);
      if (id && !document.getElementById(id)) return;
      event.preventDefault();
      if (location.hash !== hash) {
        try { history.pushState(null, '', hash); } catch { location.hash = hash; }
      }
      navigate(id);
    });
  });
  window.addEventListener('popstate', () => navigate(location.hash.slice(1)));

  const links = [...document.querySelectorAll('.header nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.getElementById('reading-progress');
  const backTop = document.getElementById('back-top');
  backTop.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: motion.checked ? 'smooth' : 'instant' });
    document.querySelector('.brand').focus({ preventScroll: true });
  });
  let scheduled = false;
  function markActive() {
    let current = '';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= header.offsetHeight + 100) current = section.id; });
    if (current === 'finans-demo') current = 'projeler';
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 5) current = 'iletisim';
    links.forEach(link => {
      if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const limit = document.documentElement.scrollHeight - innerHeight;
    const percentage = limit > 0 ? Math.max(0, Math.min(100, scrollY / limit * 100)) : 0;
    progress.style.setProperty('--progress', percentage / 100);
    progress.setAttribute('aria-valuenow', String(Math.round(percentage)));
    backTop.hidden = scrollY < 600;
    scheduled = false;
  }
  function scheduleActive() { if (!scheduled) { scheduled = true; requestAnimationFrame(markActive); } }
  window.addEventListener('scroll', scheduleActive, { passive: true });
  document.addEventListener('portfolio:layout', scheduleActive);
  window.addEventListener('resize', () => { if (innerWidth > 1100) menu.open = false; scheduleActive(); });
  markActive();

  const cards = [...document.querySelectorAll('.cv-project')];
  const count = document.getElementById('filter-count');
  document.querySelectorAll('input[name="project-filter"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      const category = radio.id.replace('filter-', '');
      let total = 0;
      cards.forEach(card => {
        card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
        if (!card.hidden) { total++; enter(card.querySelector('summary'), Math.min((total - 1) * 100, 200)); }
      });
      count.textContent = currentLanguage === 'en' ? `${total} ${total === 1 ? 'project' : 'projects'} shown.` : `${total} proje gösteriliyor.`;
    });
  });
  let notificationTimer;
  function notify(message) {
    const notification = document.getElementById('notification');
    clearTimeout(notificationTimer);
    notification.dataset.source = message;
    notification.textContent = translate(message);
    notification.hidden = false;
    notificationTimer = setTimeout(() => { notification.hidden = true; }, 4500);
  }
  document.getElementById('copy-email').addEventListener('click', async () => {
    const fallback = document.getElementById('email-fallback');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('mehmetemre1507@outlook.com');
      fallback.hidden = true;
      notify('E-posta adresi kopyalandı.');
    } catch {
      fallback.hidden = false;
      const address = document.getElementById('email-address');
      address.focus();
      address.select();
      notify('Otomatik kopyalama kullanılamıyor. Seçili adresi Ctrl+C veya ⌘C ile kopyalayabilirsiniz.');
    }
  });

  const dialog = document.getElementById('project-dialog');
  let dialogOpener = null;
  function populateDialog(card) {
      const summary = card.querySelector('summary');
      document.getElementById('project-dialog-title').textContent = card.querySelector('h3').textContent;
      document.getElementById('project-dialog-kind').textContent = card.querySelector('.project-kind').textContent;
      const body = document.getElementById('project-dialog-body');
      body.replaceChildren();
      summary.querySelectorAll('.project-field-label, p, .tags').forEach(element => body.append(element.cloneNode(true)));
      const detail = card.querySelector('.project-detail').cloneNode(true);
      detail.className = 'dialog-detail';
      body.append(detail);
  }

  cards.forEach(card => {
    const summary = card.querySelector('summary');
    if (typeof dialog.showModal !== 'function') return;
    summary.setAttribute('aria-haspopup', 'dialog');
    summary.addEventListener('click', event => {
      event.preventDefault();
      closePanels();
      dialogOpener = summary;
      populateDialog(card);
      document.body.classList.add('modal-open');
      dialog.showModal();
      animatePiece(dialog, 0, 250);
    });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]')].filter(element => element.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (!first) { event.preventDefault(); return; }
    if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    running.get(dialog)?.cancel();
    dialogOpener?.focus({ preventScroll: true });
  });
  cards.forEach(card => card.addEventListener('toggle', () => {
    if (card.open) animatePiece(card.querySelector('.project-detail'), 0, 300);
  }));
  window.addEventListener('beforeprint', stopAnimations);
  // Keep original Turkish text nodes so switching languages never loses markup.
  const excluded = '#finans-demo, script, style, #notification, #filter-count, #project-dialog-title, #project-dialog-kind, #project-dialog-body';
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
    acceptNode(node) { return node.nodeValue.trim() && !node.parentElement.closest(excluded) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
  });
  const textRecords = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    textRecords.push({ node, original: node.nodeValue, key: node.nodeValue.trim() });
  }
  const attributeRecords = [];
  document.querySelectorAll('[aria-label], meta[name="description"]').forEach(element => {
    const name = element.matches('meta') ? 'content' : 'aria-label';
    attributeRecords.push({ element, name, original: element.getAttribute(name) });
  });
  const languageSelect = document.getElementById('site-language');
  function applyLanguage(value, persist = true) {
    currentLanguage = value === 'en' ? 'en' : 'tr';
    root.lang = currentLanguage;
    languageSelect.value = currentLanguage;
    textRecords.forEach(record => {
      record.node.nodeValue = record.original.replace(record.key, translate(record.key));
    });
    attributeRecords.forEach(record => record.element.setAttribute(record.name, translate(record.original)));
    const total = cards.filter(card => !card.hidden).length;
    count.textContent = currentLanguage === 'en' ? `${total} ${total === 1 ? 'project' : 'projects'} shown.` : `${total} proje gösteriliyor.`;
    const notification = document.getElementById('notification');
    if (notification.dataset.source) notification.textContent = translate(notification.dataset.source);
    if (dialog.open && dialogOpener) populateDialog(dialogOpener.closest('.cv-project'));
    if (persist) save();
    scheduleActive();
  }
  languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
  applyLanguage(saved.language, false);
})();
