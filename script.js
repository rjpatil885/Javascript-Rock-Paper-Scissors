  function selectOption(option, player) {
    const playerSelectionElement = document.getElementById(`${player}-selection`);
    playerSelectionElement.textContent = `${player === 'player1' ? 'Player 1' : 'Player 2 (AI)'} selected: ${option}`;
    playerSelectionElement.style.display = 'block';

    const options = document.querySelectorAll(`.${player} i`);
    options.forEach((optionElement) => {
      optionElement.style.color = '#000000'; 
      optionElement.style.border = 'none'; 
    });

    const selectedOptionElement = document.querySelector(`.${player} i[data-option="${option}"]`);
    selectedOptionElement.style.color = '#FF0000'; 
    selectedOptionElement.style.border = '2px solid #FF0000'; 

    if (player === 'player1') {
      const player2Option = getAIOption();
      const player2SelectionElement = document.getElementById('player2-selection');
      player2SelectionElement.textContent = `Player 2 (AI) selected: ${player2Option}`;
      player2SelectionElement.style.display = 'block';
      displayResult(option, player2Option);
    }
  }

  function getAIOption() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function displayResult(player1Option, player2Option) {
    const resultElement = document.getElementById('result');

    if (player1Option === player2Option) {
      setResultText(resultElement, "It's a tie!", '#FFFF00');
      highlightTieOption('player1', player1Option);
      highlightTieOption('player2', player2Option);
    } else if (
      (player1Option === 'rock' && player2Option === 'scissors') ||
      (player1Option === 'paper' && player2Option === 'rock') ||
      (player1Option === 'scissors' && player2Option === 'paper')
    ) {
      setResultText(resultElement, 'Player 1 wins!', '#00FF00');
      highlightWinningOption('player1', player1Option);
      resetOptionColor('player2');
    } else {
      setResultText(resultElement, 'Player 2 (AI) wins!', '#00FF00');
      highlightWinningOption('player2', player2Option);
      resetOptionColor('player1');
    }
  }

  function setResultText(element, text, color) {
    element.textContent = text;
    element.style.color = color;

    if (text.length <= 10) {
      element.style.fontSize = '24px';
    } else if (text.length <= 20) {
      element.style.fontSize = '20px';
    } else {
      element.style.fontSize = '16px';
    }
  }

  function highlightWinningOption(player, option) {
    const options = document.querySelectorAll(`.${player} i`);
    options.forEach((optionElement) => {
      optionElement.style.color = optionElement.getAttribute('data-option') === option ? '#00FF00' : '#000000';
    });
  }

  function highlightTieOption(player, option) {
    const options = document.querySelectorAll(`.${player} i`);
    options.forEach((optionElement) => {
      if (optionElement.getAttribute('data-option') === option) {
        optionElement.style.color = '#FFFF00';
        optionElement.style.border = '2px solid #FFFF00'; 
      } else {
        optionElement.style.color = '#000000'; 
        optionElement.style.border = 'none'; 
      }
    });
  }

  function resetOptionColor(player) {
    const options = document.querySelectorAll(`.${player} i`);
    options.forEach((optionElement) => {
      optionElement.style.color = '#000000'; 
      optionElement.style.border = 'none'; 
    });
  }