
  // =============================================
  // ⚙️ CONFIGURATION - EDIT THESE VALUES!
  // =============================================

  // 🗓️ SET YOUR RELATIONSHIP START DATE HERE (Year, Month-1, Day)
  const START_DATE = new Date(2020, 2, 18); // March 18, 2020

  // 💌 EDIT YOUR BIRTHDAY WISHES HERE
  const WISHES = [
    { emoji: "🌹", text: "You make every day feel like a beautiful dream." },
    { emoji: "✨", text: "Your smile lights up my whole world." },
    { emoji: "💕", text: "I fall in love with you more each day." },
    { emoji: "🌙", text: "You're my favorite hello and hardest goodbye." },
    { emoji: "🎀", text: "Happy Birthday to the most amazing person I know!" },
  ];

  // 💌 EDIT YOUR LOVE LETTERS HERE
  const LOVE_LETTERS = [
    "You are the reason I believe in magic. ✨",
    "My heart chose you, and it will always choose you. 💖",
    "You're not just my love, you're my best friend. 🌹",
    "Thank you for being you — perfectly imperfect. 🦋",
    "Here's to a million more birthdays together! 🥂",
  ];

  // =============================================
  // 🚫 NO NEED TO EDIT BELOW THIS LINE
  // =============================================

  // --- Screen navigation ---
  let currentScreen = 'hero';

  function goTo(screen) {
    const current = document.getElementById('screen-' + currentScreen);
    const next = document.getElementById('screen-' + screen);
    if (current) {
      current.classList.remove('active');
      current.style.transform = 'translateX(-60px)';
      current.style.opacity = '0';
    }
    setTimeout(() => {
      if (next) {
        next.style.transform = 'translateX(60px)';
        next.classList.add('active');
        setTimeout(() => {
          next.style.transform = 'translateX(0)';
        }, 10);
      }
      currentScreen = screen;
      if (screen === 'timer') startTimer();
      if (screen === 'hero') createStarsAndFireworks();
    }, 200);
  }

  // --- Stars & fireworks ---
  function createStarsAndFireworks() {
    const container = document.getElementById('stars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 60 + '%';
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(star);
    }
    launchFireworks();
  }

  function launchFireworks() {
    const positions = [
      {x: 20, y: 15}, {x: 70, y: 10}, {x: 45, y: 20}, {x: 85, y: 25}, {x: 15, y: 30}
    ];
    const colors = ['#ff6b9d', '#ffd93d', '#c084fc', '#38bdf8', '#ff4757'];
    const hero = document.getElementById('screen-hero');
    
    positions.forEach((pos, pi) => {
      setTimeout(() => {
        for (let i = 0; i < 12; i++) {
          const p = document.createElement('div');
          p.className = 'firework';
          p.style.left = pos.x + '%';
          p.style.top = pos.y + '%';
          p.style.backgroundColor = colors[i % colors.length];
          const angle = (i * Math.PI * 2) / 12;
          const dist = 60 + Math.random() * 30;
          p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
          p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
          p.style.animation = 'none';
          hero.appendChild(p);
          requestAnimationFrame(() => {
            p.style.transition = 'all 1.2s ease-out';
            p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
            p.style.opacity = '0';
          });
          setTimeout(() => p.remove(), 1500);
        }
      }, pi * 500);
    });

    // Repeat fireworks
    setTimeout(launchFireworks, 3000);
  }

  // --- Timer ---
  let timerInterval;
  function startTimer() {
    document.getElementById('start-date-text').textContent = START_DATE.toLocaleDateString();
    if (timerInterval) clearInterval(timerInterval);
    function update() {
      const now = new Date();
      const diff = now - START_DATE;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('timer-days').textContent = days;
      document.getElementById('timer-hours').textContent = hours;
      document.getElementById('timer-minutes').textContent = minutes;
      document.getElementById('timer-seconds').textContent = seconds;
    }
    update();
    timerInterval = setInterval(update, 1000);
  }

  // --- Wishes ---
  function createWishes() {
    const container = document.getElementById('wishes-container');
    container.innerHTML = '';
    WISHES.forEach((w, i) => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.style.animationDelay = (0.3 + i * 0.2) + 's';
      card.innerHTML = `<span class="emoji">${w.emoji}</span><span class="text">${w.text}</span>`;
      container.appendChild(card);
    });
  }
  createWishes();

  // --- Cake / Blow ---
  let blowCount = 0;
  function blowCandle() {
    blowCount++;
    document.getElementById('blow-info').textContent = `Tap the button 3 times to blow the candles! (${blowCount}/3)`;
    if (blowCount >= 3) {
      document.getElementById('flames').style.display = 'none';
      document.getElementById('blow-info').classList.add('hidden');
      document.getElementById('blow-btn').classList.add('hidden');
      document.getElementById('cake-success').classList.remove('hidden');

      // Smoke
      const cake = document.getElementById('screen-cake');
      for (let i = 0; i < 5; i++) {
        const smoke = document.createElement('span');
        smoke.className = 'smoke';
        smoke.textContent = '💨';
        smoke.style.left = (30 + i * 10) + '%';
        smoke.style.top = '30%';
        smoke.style.animationDelay = i * 0.2 + 's';
        cake.appendChild(smoke);
        setTimeout(() => smoke.remove(), 2500);
      }
    }
  }

  // --- Surprise ---
  let currentLetter = 0;

  function openSurprise() {
    document.getElementById('surprise-closed').classList.add('hidden');
    document.getElementById('surprise-opened').classList.remove('hidden');

    // Sparkle burst
    const screen = document.getElementById('screen-surprise');
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle-burst';
      sparkle.textContent = '✨';
      const angle = (i * Math.PI * 2) / 12;
      sparkle.style.left = '50%';
      sparkle.style.top = '40%';
      screen.appendChild(sparkle);
      requestAnimationFrame(() => {
        sparkle.style.transition = 'all 1s ease-out';
        sparkle.style.transform = `translate(${Math.cos(angle) * 120}px, ${Math.sin(angle) * 120}px)`;
        sparkle.style.opacity = '0';
      });
      setTimeout(() => sparkle.remove(), 1200);
    }

    showLetter(0);
  }

  function showLetter(index) {
    currentLetter = index;
    document.getElementById('letter-text').textContent = LOVE_LETTERS[index];
    const card = document.getElementById('letter-card');
    card.style.animation = 'none';
    requestAnimationFrame(() => { card.style.animation = 'flipIn 0.5s ease'; });

    // Dots
    const dotsEl = document.getElementById('letter-dots');
    dotsEl.innerHTML = '';
    LOVE_LETTERS.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === index ? ' active' : '');
      dot.onclick = () => showLetter(i);
      dotsEl.appendChild(dot);
    });

    // Buttons
    const btns = document.getElementById('letter-buttons');
    btns.innerHTML = '';
    if (index < LOVE_LETTERS.length - 1) {
      const btn = document.createElement('button');
      btn.className = 'btn-ghost';
      btn.textContent = 'Next 💕';
      btn.onclick = () => showLetter(index + 1);
      btns.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn-love';
      btn.textContent = "Let's Celebrate! 🎉";
      btn.onclick = () => goTo('celebrate');
      btns.appendChild(btn);
    }
  }

  // --- Celebrate ---
  function startCelebration() {
    const screen = document.getElementById('screen-celebrate');
    screen.classList.add('celebrating');
    document.getElementById('pre-celebrate').classList.add('hidden');
    document.getElementById('post-celebrate').classList.remove('hidden');

    // Confetti
    const confettiColors = ['#ff6b9d', '#ffd93d', '#c084fc', '#38bdf8', '#ff4757', '#2ed573', '#ff6348'];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.borderRadius = ['50%', '2px', '0'][Math.floor(Math.random() * 3)];
      piece.style.animationDuration = (2 + Math.random() * 3) + 's';
      piece.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 6000);
    }
  }

  // --- Bear image (inline base64 placeholder - replace with your image) ---
  // Using a simple emoji fallback for bear
  const bearImg = document.getElementById('bear-img');
  bearImg.onerror = function() {
    // If image fails to load, show emoji instead
    this.style.display = 'none';
    const emoji = document.createElement('div');
    emoji.textContent = '🧸🎁';
    emoji.style.fontSize = '5rem';
    emoji.style.zIndex = '10';
    emoji.style.marginBottom = '16px';
    emoji.className = 'bear-img';
    this.parentNode.insertBefore(emoji, this);
  };

  // Cake image fallback
  const cakeImg = document.getElementById('cake-img');
  cakeImg.onerror = function() {
    this.style.display = 'none';
    const emoji = document.createElement('div');
    emoji.textContent = '🎂';
    emoji.style.fontSize = '6rem';
    emoji.style.marginBottom = '8px';
    this.parentNode.insertBefore(emoji, this);
  };

  // Init
  createStarsAndFireworks();

  // Add background hearts to timer screen
  const timerScreen = document.getElementById('screen-timer');
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'bg-heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.top = Math.random() * 90 + '%';
    heart.style.animationDelay = i * 0.3 + 's';
    timerScreen.appendChild(heart);
  }

	// Don't show the lovable-badge if the page is in an iframe or if it's being rendered by puppeteer (screenshot service)
	if (window.self !== window.top || navigator.userAgent.includes('puppeteer')) {
		// the page is in an iframe
		var badge = document.getElementById('lovable-badge');
		if (badge) {
			badge.style.display = 'none';
		}
	}

	// Add click event listener to close button with animation
	var closeButton = document.getElementById('lovable-badge-close');
	if (closeButton) {
		closeButton.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var badge = document.getElementById('lovable-badge');
			if (badge) {
				badge.classList.add('closing');
				setTimeout(function() {
					if (badge) {
						badge.style.display = 'none';
					}
				}, 240);
			}
		});
	}
