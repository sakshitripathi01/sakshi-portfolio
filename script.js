(function(){
  // ===== THEME TOGGLE =====
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function setThemeIcon(theme){
    if(theme === 'light'){
      themeIcon.innerHTML = '<path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      themeIcon.innerHTML = '<path d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1l1.1-1.1M18 6l1.1-1.1M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  }
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('portfolio-theme'); } catch(e) {}
  if(savedTheme === 'light' || savedTheme === 'dark'){ root.setAttribute('data-theme', savedTheme); }
  setThemeIcon(root.getAttribute('data-theme'));

  themeToggle.addEventListener('click', function(){
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    setThemeIcon(next);
    try { localStorage.setItem('portfolio-theme', next); } catch(e) {}
  });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function(){
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // ===== RESEARCH MODAL =====
  const modal = document.getElementById('researchModal');
  const openModalBtn = document.getElementById('openResearchModal');
  const closeModalBtn = document.getElementById('closeResearchModal');

  function openModal(){
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeModalBtn.focus();
  }
  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    openModalBtn.focus();
  }
  openModalBtn.addEventListener('click', openModal);
  var om2=document.getElementById('openResearchModal2'); if(om2) om2.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // ===== TOAST + PLACEHOLDER LINKS =====
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2600);
  }
  document.querySelectorAll('[data-placeholder]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      showToast(el.getAttribute('data-placeholder') + ' hasn\u2019t been added yet.');
    });
  });

  // ===== NAV: scrolled shadow + active section highlight =====
  const navEl = document.querySelector('header.nav');
  var prog=document.getElementById('progress');
  function onScroll(){ navEl.classList.toggle('scrolled', window.scrollY > 8); var m=document.documentElement.scrollHeight-innerHeight; if(prog&&m>0) prog.style.transform='scaleX('+(scrollY/m)+')'; }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sectionIds = ['home','about','skills','projects','research','experience','analytics','achievements','education','contact'];
  if('IntersectionObserver' in window){
    const spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          navLinks.forEach(function(a){
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach(function(id){
      var s = document.getElementById(id);
      if(s) spy.observe(s);
    });
  }

  document.querySelectorAll('.skills-block, .project-card').forEach(function(el){ el.addEventListener('mousemove', function(e){ var r=el.getBoundingClientRect(); el.style.setProperty('--mx',(e.clientX-r.left)+'px'); el.style.setProperty('--my',(e.clientY-r.top)+'px'); }); });

  // Resume is served locally as resume.pdf; no placeholder handler is needed.

  // ===== CONTACT FORM VALIDATION =====
  const form = document.getElementById('contactForm');
  const nameField = document.getElementById('nameField');
  const emailField = document.getElementById('emailField');
  const messageField = document.getElementById('messageField');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');
  const successMsg = document.getElementById('successMsg');

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    if(nameInput.value.trim().length < 2){
      nameField.classList.add('has-error');
      valid = false;
    } else {
      nameField.classList.remove('has-error');
    }

    if(!isValidEmail(emailInput.value.trim())){
      emailField.classList.add('has-error');
      valid = false;
    } else {
      emailField.classList.remove('has-error');
    }

    if(messageInput.value.trim().length < 10){
      messageField.classList.add('has-error');
      valid = false;
    } else {
      messageField.classList.remove('has-error');
    }

    if(valid){
      const submitButton = form.querySelector('.form-submit');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        _subject: 'New Portfolio Contact Message — Sakshi Tripathi',
        _template: 'table'
      };
      fetch('https://formsubmit.co/ajax/st6481871@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function(response){
        if(!response.ok) throw new Error('Message service unavailable');
        return response.json();
      }).then(function(result){
        if(result.success === 'true' || result.success === true){
          successMsg.classList.add('show');
          form.querySelectorAll('input:not([type="hidden"]), textarea').forEach(function(el){ el.disabled = true; });
          submitButton.textContent = 'Message Sent';
        } else {
          throw new Error('Email confirmation may be required');
        }
      }).catch(function(){
        successMsg.classList.remove('show');
        showToast('Message could not be sent. Please email st6481871@gmail.com directly.');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
    } else {
      successMsg.classList.remove('show');
    }
  });

  [nameInput, emailInput, messageInput].forEach(function(input){
    input.addEventListener('input', function(){
      input.closest('.field').classList.remove('has-error');
    });
  });

})();