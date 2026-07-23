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
    }
];

document.getElementById('selectorForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Get basic inputs
    const goal = document.getElementById('goal').value;
    const secondaryGoal = document.getElementById('secondary_goal').value;
    const preference = document.getElementById('preference').value;
    const fitness = document.getElementById('fitness').value;

    // Get personal attributes
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;

    let bestMatch = null;
    let highestScore = -1;

    martialArts.forEach(art => {
        let currentScore = 0;

        // Goal Points: Multiply primary goal by 2 to give it more weight
        if (art.scores[goal]) currentScore += (art.scores[goal] * 2);
        
        // Add secondary goal points if the user selected one
        if (secondaryGoal !== "" && art.scores[secondaryGoal]) {
            currentScore += art.scores[secondaryGoal];
        }

        // Preference Points
        if (art.scores[preference]) currentScore += art.scores[preference];
        
        // Fitness Points
        const fitnessKey = "fit_" + fitness;
        if (art.scores[fitnessKey]) currentScore += art.scores[fitnessKey];

        // --- Custom Logic for Personal Attributes --- //

        // Age Logic
        if (age >= 50) {
            if (art.name === "Tai Chi") currentScore += 2;
            if (art.name === "MMA" || art.name === "Muay Thai") currentScore -= 1;
        }

        // Height Logic
        if (height >= 72) { 
            if (art.name === "Muay Thai" || art.name === "MMA") currentScore += 1;
        }

        // Weight Logic
        if (weight <= 150) {
            if (art.name === "Brazilian Jiu-Jitsu (BJJ)") currentScore += 2;
        }

        // Gender Logic
        if (gender === "female") {
            if (art.name === "Krav Maga" || art.name === "Brazilian Jiu-Jitsu (BJJ)") currentScore += 1;
        }

        // Update highest score
        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = art;
        }
    });

    // Display the result
    document.getElementById('matchName').textContent = bestMatch.name;
    document.getElementById('matchDescription').textContent = bestMatch.description;
    
    document.getElementById('selectorForm').classList.add('hidden');
    document.getElementById('resultBox').classList.remove('hidden');
});

// Reset functionality 
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('selectorForm').reset();
    document.getElementById('selectorForm').classList.remove('hidden');
    document.getElementById('resultBox').classList.add('hidden');
});