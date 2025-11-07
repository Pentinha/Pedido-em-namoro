window.onload = function () {
  let tentativas = 0; 
  let mensagemExibida = false; 

  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.popup')) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  function responderSim() {
    const popup = document.getElementById('popup');
    const h1 = popup.querySelector('h1');
    const wrapper = document.getElementById('button-wrapper');
    
    // --- CORREÇÃO DO EMOJI ---
    h1.innerText = "Ja pode beijar o namorado! 💘❤️";
    
    const warning = popup.querySelector('.warning-message');
    if (warning) {
      warning.remove();
    }
    
    if (wrapper) {
      wrapper.remove();
    }
  }
  window.responderSim = responderSim;

  const noBtn = document.querySelector('.no-btn');
  const popup = document.getElementById('popup');
  const wrapper = document.getElementById('button-wrapper');

  function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    
    // --- CORREÇÃO DA FUGA ---
    // A lógica agora usa clientWidth, que ignora o overflow
    const maxX = popup.clientWidth - btnRect.width;
    const maxY = popup.clientHeight - btnRect.height;

    // A lógica de random agora vai de 0 até o máximo, garantindo
    // que o botão sempre fique 100% dentro do popup.
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = 'translate(0, 0)'; 
  }

  function flee() {
    // Torna o botão 'absolute' na primeira tentativa de fuga
    if (noBtn.style.position !== 'absolute') {
      noBtn.style.position = 'absolute';
      wrapper.style.justifyContent = 'center';
    }
    
    tentativas++;
    
    if (tentativas >= 3) {
      if (!mensagemExibida) {
        const mensagem = document.createElement('p');
        mensagem.innerText = "Acho que não vai conseguir!";
        mensagem.className = 'warning-message';
        popup.appendChild(mensagem);
        mensagemExibida = true;
      }
      noBtn.remove();
    } else {
      moveNoButton();
    }
  }

  // A fuga agora SÓ acontece no clique.
  noBtn.addEventListener('click', flee);
};
