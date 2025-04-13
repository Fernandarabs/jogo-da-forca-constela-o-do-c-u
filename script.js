const palavras = [
    {
      nome: "orion",
      dica: "Estudante de arte, divertido e preucupado com sua familia",
      imagem: "Orion.png",
      personagem: "orion"
    },
    {
      nome: "sky",
      dica: "Estudante de dança, orgulhoso e arrogante, sempre ta pronto para acabar com quem bate de frente com ele.",
      imagem: "sky.png",
      personagem: "sky"
    },
    {
      nome: "stormy",
      dica: "Pediatra, irmão de Sky proteje quem e importante para ele.",
      imagem: "Sky.Png",
      personagem: "storn"
    },
    {
      nome: "bellatrix",
      dica: "Gentil e educada, seu bem mais precioso são seus irmãos e seu pai adotivo.",
      imagem: "Orion.png",
      personagem: "bellatrix"
    },
    {
      nome: "cloud",
      dica: "Estudante de Admistração, e uma pessoa quieta e arrogante, mas protejer com tudo quem ele ama.",
      imagem: "Sky.png",
      personagem: "cloud"
    },
    {
      nome: "lyra",
      dica: "Afrontosa nunca abaixa a cabeça protejer seus irmãos com todas as suas forças.",
      imagem: "Orion.png",
      personagem: "lyra"
    },
    {
      nome: "wind",
      dica: "Debochada e arrogante e ta sempre pronta para uma briga, ama uma barraco.",
      imagem: "Sky.png",
      personagem: "wind"
    },
    {
      nome: "rain",
      dica: "Barraqueiro e afrontoso, assim como sua irmã esta sempre pronto para uma bela discursão.",
      imagem: "Orion.png",
      personagem: "rain"
    }
  ];
  
  let palavraSelecionada;
  let dicasPor = ""; // sky ou orion
  let letrasCorretas = [];
  let tentativas = 0;
  let rodadaAtual = 0;
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnLogin").addEventListener("click", iniciarJogo);
  });
  
  function iniciarJogo() {
    const nome = document.getElementById("nomeUsuario").value.trim();
    if (!nome) {
      alert("Digite seu nome para começar.");
      return;
    }
  
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("jogoContainer").style.display = "block";
    iniciarPartida();
  }
  
  function iniciarPartida() {
    if (rodadaAtual >= palavras.length) {
      mostrarMensagemFinal(true);
      return;
    }
  
    const sorteada = palavras[rodadaAtual];
    palavraSelecionada = sorteada;
    dicasPor = Math.random() < 0.5 ? "sky" : "orion";
    letrasCorretas = [];
    tentativas = 0;
  
    document.getElementById("palavra").innerText = "_ ".repeat(palavraSelecionada.nome.length).trim();
    document.getElementById("erros").innerText = tentativas;
    mostrarDica();
  
    const letrasContainer = document.getElementById("letras");
    letrasContainer.innerHTML = "";
  
    for (let i = 65; i <= 90; i++) {
      const letra = String.fromCharCode(i);
      const botao = document.createElement("button");
      botao.textContent = letra;
      botao.onclick = () => verificarLetra(letra.toLowerCase(), botao);
      letrasContainer.appendChild(botao);
    }
  }
  
  function mostrarDica() {
    const img = document.getElementById("imgDica");
    const texto = document.getElementById("textoDica");
  
    img.src = `${dicasPor}.png`;
    if (dicasPor === "sky") {
      texto.innerHTML = `<strong>Sky</strong> Cruzando os braços <br><em>"Tá na cara quem é. Presta atenção!"</em><br><br><strong>Dica:</strong> ${palavraSelecionada.dica}`;
    } else {
      texto.innerHTML = `<strong>Orion</strong> sorrir<br><em>"Vou te dar uma dica, você consegue."</em><br><br><strong>Dica:</strong> ${palavraSelecionada.dica}`;
    }
  }
  
  function verificarLetra(letra, botao) {
    botao.disabled = true;
  
    if (palavraSelecionada.nome.includes(letra)) {
      letrasCorretas.push(letra);
    } else {
      tentativas++;
      document.getElementById("erros").innerText = tentativas;
    }
  
    atualizarPalavra();
  
    if (!document.getElementById("palavra").innerText.includes("_")) {
      rodadaAtual++;
      setTimeout(iniciarPartida, 1000); // Avançar para o próximo personagem após um segundo
    } else if (tentativas >= 6) {
      rodadaAtual++;
      setTimeout(iniciarPartida, 1000); // Avançar para o próximo personagem após um segundo
    }
  }
  
  function atualizarPalavra() {
    const exibicao = palavraSelecionada.nome
      .split("")
      .map(letra => letrasCorretas.includes(letra) ? letra : "_")
      .join(" ");
    document.getElementById("palavra").innerText = exibicao;
  }
  
  function mostrarMensagemFinal(vitoria) {
    document.getElementById("jogoContainer").style.display = "none";
    const fim = document.getElementById("fimContainer");
    const msg = document.getElementById("mensagemFinal");
  
    if (vitoria) {
      msg.innerHTML = `
        <strong>Parabéns!</strong> Você venceu todos os personagens!
        <br>Agora pode se orgulhar da sua vitória.
      `;
    } else {
      msg.innerHTML = `
        <strong>Game Over!</strong> Você perdeu a rodada.
        <br>Evoluar 
      `;
    }
  
    fim.style.display = "flex";
  }
  