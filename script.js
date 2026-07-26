// script.js

const martialArts = [
    {
        name: "Brazilian Jiu-Jitsu (BJJ)",
        description: "A highly effective ground-fighting art focusing on leverage and submissions. Known for allowing smaller individuals to overcome larger opponents.",
        scores: { self_defense: 2, fitness: 1, mindfulness: 0, sport: 2, striking: 0, grappling: 3, mixed: 1, weapons: 0, fit_low: 1, fit_medium: 2, fit_high: 2 }
    },
    {
        name: "Muay Thai",
        description: "Known as the 'Art of Eight Limbs', this is a high-intensity striking art. It heavily favors reach and excellent cardiovascular endurance.",
        scores: { self_defense: 2, fitness: 3, mindfulness: 0, sport: 2, striking: 3, grappling: 0, mixed: 1, weapons: 0, fit_low: 0, fit_medium: 1, fit_high: 3 }
    },
    {
        name: "Tai Chi",
        description: "A gentle, internal martial art. Perfect for older practitioners or those looking for low-impact movement and mobility.",
        scores: { self_defense: 0, fitness: 0, mindfulness: 3, sport: 0, striking: 1, grappling: 0, mixed: 0, weapons: 1, fit_low: 3, fit_medium: 2, fit_high: 1 }
    },
    {
        name: "Krav Maga",
        description: "A highly aggressive self-defense system. Excellent for practical, real-world survival for all genders and sizes.",
        scores: { self_defense: 3, fitness: 2, mindfulness: 0, sport: 0, striking: 2, grappling: 1, mixed: 2, weapons: 1, fit_low: 1, fit_medium: 2, fit_high: 2 }
    },
    {
        name: "MMA (Mixed Martial Arts)",
        description: "The ultimate combination of striking and grappling. Highly physically demanding.",
        scores: { self_defense: 2, fitness: 3, mindfulness: 0, sport: 3, striking: 2, grappling: 2, mixed: 3, weapons: 0, fit_low: 0, fit_medium: 1, fit_high: 3 }
    },
    {
        name: "Taekwondo",
        description: "A Korean martial art famous for fast, dynamic, and high spinning kicks. It builds massive leg strength and agility.",
        scores: { self_defense: 1, fitness: 2, mindfulness: 0, sport: 3, striking: 3, grappling: 0, mixed: 0, weapons: 0, fit_low: 1, fit_medium: 2, fit_high: 2 }
    },
    {
        name: "Capoeira",
        description: "An Afro-Brazilian martial art combining dance, acrobatics, and music. It demands and develops extreme fluidity and full-body control.",
        scores: { self_defense: 1, fitness: 3, mindfulness: 1, sport: 0, striking: 2, grappling: 0, mixed: 1, weapons: 0, fit_low: 0, fit_medium: 1, fit_high: 3 }
    }
];

// Prevent selecting the same primary and secondary goals
document.getElementById('goal').addEventListener('change', function() {
    const primaryValue = this.value;
    const secondarySelect = document.getElementById('secondary_goal');

    Array.from(secondarySelect.options).forEach(option => {
        if (option.value !== "") {
            option.style.display = 'block';
            option.disabled = false;
        }
    });

    if (primaryValue !== "") {
        const optionToDisable = secondarySelect.querySelector(`option[value="${primaryValue}"]`);
        if (optionToDisable) {
            optionToDisable.style.display = 'none';
            optionToDisable.disabled = true;

            if (secondarySelect.value === primaryValue) {
                secondarySelect.value = "";
            }
        }
    }
});

// Restore hidden secondary options when the main form is cleared
document.getElementById('selectorForm').addEventListener('reset', function() {
    const secondarySelect = document.getElementById('secondary_goal');
    
    Array.from(secondarySelect.options).forEach(option => {
        if (option.value !== "") {
            option.style.display = 'block';
            option.disabled = false;
        }
    });
    
    document.getElementById('resultBox').classList.add('hidden');
});

document.getElementById('selectorForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Get basic inputs
    const goal = document.getElementById('goal').value;
    const secondaryGoal = document.getElementById('secondary_goal').value;
    const preference = document.getElementById('preference').value;
    const fitness = document.getElementById('fitness').value;
    const flexibility = document.getElementById('flexibility').value;

    // Get personal attributes
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;

    // Create an array to hold the scores for each art
    let scoredArts = [];

    martialArts.forEach(art => {
        let currentScore = 0;

        if (art.scores[goal]) currentScore += (art.scores[goal] * 2);
        
        if (secondaryGoal !== "" && art.scores[secondaryGoal]) {
            currentScore += art.scores[secondaryGoal];
        }

        if (art.scores[preference]) currentScore += art.scores[preference];
        
        const fitnessKey = "fit_" + fitness;
        if (art.scores[fitnessKey]) currentScore += art.scores[fitnessKey];

        // Flexibility Logic
        if (flexibility === "high") {
            if (art.name === "Taekwondo" || art.name === "Capoeira") currentScore += 2;
        } else if (flexibility === "low") {
            if (art.name === "Taekwondo" || art.name === "Capoeira") currentScore -= 2;
            if (art.name === "Krav Maga") currentScore += 1;
        }

        if (age >= 50) {
            if (art.name === "Tai Chi") currentScore += 2;
            if (art.name === "MMA" || art.name === "Muay Thai" || art.name === "Capoeira") currentScore -= 1;
        }

        if (height >= 72) { 
            if (art.name === "Muay Thai" || art.name === "MMA" || art.name === "Taekwondo") currentScore += 1;
        }

        if (weight <= 150) {
            if (art.name === "Brazilian Jiu-Jitsu (BJJ)") currentScore += 2;
        }

        // Updated Gender Logic based on participation statistics
        if (gender === "female") {
            if (art.name === "Taekwondo" || art.name === "Muay Thai") {
                currentScore += 2;
            }
            if (art.name === "Krav Maga" || art.name === "Brazilian Jiu-Jitsu (BJJ)") {
                currentScore += 1;
            }
        }

        // Push the calculated score and the art object to our array
        scoredArts.push({ art: art, score: currentScore });
    });

    // Sort the array in descending order based on the score
    scoredArts.sort((a, b) => b.score - a.score);

    // Extract the top 3 matches
    const top1 = scoredArts[0].art;
    const top2 = scoredArts[1].art;
    const top3 = scoredArts[2].art;

    // Display the results
    document.getElementById('matchName1').textContent = top1.name;
    document.getElementById('matchDesc1').textContent = top1.description;
    
    document.getElementById('matchName2').textContent = top2.name;
    document.getElementById('matchDesc2').textContent = top2.description;
    
    document.getElementById('matchName3').textContent = top3.name;
    document.getElementById('matchDesc3').textContent = top3.description;
    
    // Populate the school search dropdown with the top 3 styles
    const searchSelect = document.getElementById('searchStyle');
    searchSelect.innerHTML = `
        <option value="${top1.name}">1. ${top1.name}</option>
        <option value="${top2.name}">2. ${top2.name}</option>
        <option value="${top3.name}">3. ${top3.name}</option>
    `;

    // Show results and scroll
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth' });
});

// Local School Search Logic
document.getElementById('searchSchoolsBtn').addEventListener('click', function() {
    const zipCode = document.getElementById('zipcode').value;
    const selectedStyle = document.getElementById('searchStyle').value;
    const schoolList = document.getElementById('schoolList');

    schoolList.innerHTML = '';

    if (zipCode.length < 5) {
        schoolList.innerHTML = '<li style="color: red; text-align: center;">Please enter a valid 5-digit zip code.</li>';
        return;
    }

    schoolList.innerHTML = `<li style="text-align: center;">Searching for ${selectedStyle} schools near ${zipCode}...</li>`;

    setTimeout(() => {
        schoolList.innerHTML = `
            <li style="background: #fff; margin: 0.5rem 0; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
                <strong>Premier ${selectedStyle} Academy</strong><br>
                Distance: 3.2 miles away
            </li>
            <li style="background: #fff; margin: 0.5rem 0; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
                <strong>Elite Combat Fitness</strong><br>
                Distance: 8.5 miles away
            </li>
            <li style="background: #fff; margin: 0.5rem 0; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
                <strong>Downtown ${selectedStyle} Club</strong><br>
                Distance: 14.1 miles away
            </li>
        `;
    }, 1500); 
});

// Reset functionality (Start Over Button at bottom)
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('selectorForm').reset();
    document.getElementById('resultBox').classList.add('hidden');
    
    // Clear out the search data
    document.getElementById('zipcode').value = '';
    document.getElementById('schoolList').innerHTML = '';
    
    // Scroll back to the top of the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
});