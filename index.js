document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        stars.appendChild(star);
    }
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
};

const MINIMUM_ADDITIONAL_ITERATION_COUNT = 2;

const config = {  
  additionalIterationCount: Math.max(MINIMUM_ADDITIONAL_ITERATION_COUNT, 3),
  transitionDuration: 3000,
  prize: 6575, // Adjust this to the actual number of days
  digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

const getPrizeText = () => document.getElementById("prize-text"),
      getTracks = () => document.querySelectorAll(".digit > .digit-track");

const getFormattedPrize = () => config.prize.toString(),
      getPrizeDigitByIndex = index => parseInt(config.prize.toString()[index]),
      determineIterations = index => index + config.additionalIterationCount;

const createElement = (type, className, text) => {
  const element = document.createElement(type);
  element.className = className;
  if(text !== undefined) element.innerText = text;
  return element;
}

const createCharacter = character => createElement("span", "character", character);

const createDigit = (digit, trackIndex) => {
  const digitElement = createElement("span", "digit"),
        trackElement = createElement("span", "digit-track");
  
  let digits = [],
      iterations = determineIterations(trackIndex);
  
  for(let i = 0; i < iterations; i++) {
    digits = [...digits, ...config.digits];
  }
  
  trackElement.innerText = digits.join(" ");
  
  trackElement.style.transitionDuration = `${config.transitionDuration}ms`;
  
  digitElement.appendChild(trackElement);
  
  return digitElement;
}

const setup = () => {
  let index = 0;
  
  const prizeText = getPrizeText();
  
  for(const character of getFormattedPrize()) {
    const element = isNaN(character) 
      ? createCharacter(character) : createDigit(character, index++);
    
    prizeText.appendChild(element);
  }  
}

const animate = () => {
  getTracks().forEach((track, index) => {
    const digit = getPrizeDigitByIndex(index),
          iterations = determineIterations(index),
          activeDigit = ((iterations - 1) * 10) + digit;
    
    track.style.translate = `0rem ${activeDigit * -10}rem`;
  });
}

const resetTrackPosition = track => {
  track.style.transitionDuration = "0ms";
  track.style.translate = "0rem 0rem";
  track.offsetHeight;
  track.style.transitionDuration = `${config.transitionDuration}ms`;
}

const resetAnimation = () => {
  for(const track of getTracks()) resetTrackPosition(track);
}

window.onload = () => {
  setup();
  
  setTimeout(animate);  
};

const handleRedo = () => {
  resetAnimation();
  
  animate();
}

const updateTheme = theme => {
  document.documentElement.style.setProperty("--theme-rgb", `var(--${theme})`);
  
  for(const button of document.querySelectorAll(".theme-button")) {
    button.dataset.selected = theme === button.dataset.theme;
  }
}

const handleChangeTheme = e => updateTheme(e.currentTarget.dataset.theme);

updateTheme("green");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let animationInterval = null;

document.querySelectorAll('.scrambled-text').forEach(textElement => {
  textElement.addEventListener('mouseenter', () => {
    let iteration = 0;

    clearInterval(animationInterval);

    animationInterval = setInterval(() => {
      textElement.innerText = textElement.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return textElement.dataset.value[index];
          }
          
          return alphabet[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= textElement.dataset.value.length) {
        clearInterval(animationInterval);
      }
      
      iteration += 1 / 3;
    }, 30);
  });
});

document.querySelectorAll('.page').forEach((page, index) => {
  page.addEventListener('click', function() {
      this.classList.toggle('flipped');
      adjustZIndex(index);
  });
});

function adjustZIndex(currentPageIndex) {
  document.querySelectorAll('.page').forEach((page, index) => {
      if(index > currentPageIndex) {
          page.style.zIndex = currentPageIndex + 1 - index;
      } else {
          page.style.zIndex = index + 1;
      }
  });
}
