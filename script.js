const searchBox = document.getElementById("search-box");
const searchInput = document.getElementById("search-input");
const wordText = document.getElementById("word-text");
const typeText= document.getElementById("type-txt");
const phoneticText = document.getElementById("phonetic-txt");
const soundButton = document.getElementById("sound-btn");
const definitionText = document.getElementById("definition-txt");
const exampleElem = document.getElementById("example-elem");
const synonymElem = document.getElementById("synonym-elem");
const antonymElem = document.getElementById("antonym-elem");
const audio = new Audio();
const wordDetailsElem = document.querySelector(".word-details")
const errorText = document.querySelector(".errorText")

async function getWordDetails(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();
    const wordData = data[0];
    const phonetics = wordData.phonetics || [];

    let phoneticTxt = "", phoneticAudio = "";

    for (const phonetic of phonetics) {
        if (phonetic.text && !phoneticTxt) phoneticTxt = phonetic.text;
        if (phonetic.audio && !phoneticAudio) phoneticAudio = phonetic.audio;
        if (phoneticTxt && phoneticAudio) break;
    }

    const meaning = wordData.meanings[0];

    return {
        word: wordData.word.toLowerCase(),
        phonetic: {
            text: phoneticTxt,
            audio: phoneticAudio
        },
        speechPart: meaning.partOfSpeech,
        definition: meaning.definitions[0].definition,
        synonyms: meaning.synonyms || [],
        antonyms: meaning.antonyms || [],
        example: meaning.definitions[0].example || ""
    }
}

searchBox.addEventListener("submit", async e => {
    e.preventDefault();
    if (searchInput.value.trim() === "") {
        errorText.textContent = "Please Enter a Word";
    } else {
        
        wordDetailsElem.classList.remove("active");
        try {
            errorText.textContent = "";
            const wordDetails = await getWordDetails(searchInput.value);
            wordText.textContent = wordDetails.word;
            typeText.textContent = wordDetails.speechPart;
            phoneticText.textContent = wordDetails.phonetic.text;
            audio.src = wordDetails.phonetic.audio;
            definitionText.textContent = wordDetails.definition;
            exampleElem.querySelector("p").textContent = wordDetails.example;
            synonymElem.querySelector("p").textContent = wordDetails.synonyms.join(", ");
            antonymElem.querySelector("p").textContent = wordDetails.antonyms.join(", ");
            exampleElem.style.display = wordDetails.example === "" ? "none" : "block";
            synonymElem.style.display = wordDetails.synonyms.length === 0 ? "none" : "block";
            antonymElem.style.display = wordDetails.antonyms.length === 0 ? "none" : "block";
            wordDetailsElem.classList.add("active");
        } catch (error) {
            errorText.textContent = "Word Not Found";
        }
    }
});


soundButton.addEventListener("click", () => {
    audio.play();
    
});




const toggleSwitch = document.querySelector('.switch input');
const logoImg = document.getElementById('logo-img');
const themeIcon = document.getElementById('theme-icon'); // <i id="theme-icon" class="ri-moon-line"></i>

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleSwitch.checked = true;
    logoImg.src = "images/logo-white.png"; 
    themeIcon.classList.remove("ri-moon-line");
    themeIcon.classList.add("ri-sun-line");
} else {
    logoImg.src = "images/logo-black.png"; 
    themeIcon.classList.remove("ri-sun-line");
    themeIcon.classList.add("ri-moon-line");
}

// Toggle theme
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        logoImg.src = "images/logo-white.png";
        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        logoImg.src = "images/logo-black.png";
        themeIcon.classList.remove("ri-sun-line");
        themeIcon.classList.add("ri-moon-line");
    }
});




const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (hamburger.classList.contains('ri-menu-line')) {
        hamburger.classList.remove('ri-menu-line');
        hamburger.classList.add('ri-close-line');
    } else {
        hamburger.classList.remove('ri-close-line');
        hamburger.classList.add('ri-menu-line');
    }
});
