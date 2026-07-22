// script.js

// 1. Define our database of martial arts
const martialArts = [
    {
        name: "Brazilian Jiu-Jitsu (BJJ)",
        description: "A highly effective ground-fighting art focusing on leverage and submissions. Great for self-defense and sport.",
        scores: { self_defense: 2, fitness: 1, mindfulness: 0, sport: 2, striking: 0, grappling: 3, mixed: 1, weapons: 0 }
    },
    {
        name: "Muay Thai",
        description: "Known as the 'Art of Eight Limbs', this is a high-intensity striking art using punches, kicks, knees, and elbows.",
        scores: { self_defense: 2, fitness: 3, mindfulness: 0, sport: 2, striking: 3, grappling: 0, mixed: 1, weapons: 0 }
    },
    {
        name: "Tai Chi",
        description: "A gentle, internal Chinese martial art practiced for defense training, health benefits, and meditation.",
        scores: { self_defense: 0, fitness: 0, mindfulness: 3, sport: 0, striking: 1, grappling: 0, mixed: 0, weapons: 1 }
    },
    {
        name: "Krav Maga",
        description: "A military self-defense and fighting system. No rules, just pure practical self-preservation.",
        scores: { self_defense: 3, fitness: 2, mindfulness: 0, sport: 0, striking: 2, grappling: 1, mixed: 2, weapons: 1 }
    },
    {
        name: "MMA (Mixed Martial Arts)",
        description: "The ultimate combination of striking and grappling. Highly physically demanding and competition-focused.",
        scores: { self_defense: 2, fitness: 3, mindfulness: 0, sport: 3, striking: 2, grappling: 2, mixed: 3, weapons: 0 }
    }
];

// 2. Handle the form submission
document.getElementById('selectorForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    // Get user answers
    const goal = document.getElementById('goal').value;
    const preference = document.getElementById('preference').value;

    // Reset scores for all styles
    let bestMatch = null;
    let highestScore = -1;

    // Calculate scores
    martialArts.forEach(art => {
        // Add points based on the user's selected traits
        let currentScore = 0;
        if (art.scores[goal]) currentScore += art.scores[goal];
        if (art.scores[preference]) currentScore += art.scores[preference];

        // Update highest score
        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = art;
        }
    });

    // 3. Display the result
    document.getElementById('matchName').textContent = bestMatch.name;
    document.getElementById('matchDescription').textContent = bestMatch.description;
    
    // Hide form, show results
    document.getElementById('selectorForm').classList.add('hidden');
    document.getElementById('resultBox').classList.remove('hidden');
});

// Reset functionality
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('selectorForm').reset();
    document.getElementById('selectorForm').classList.remove('hidden');
    document.getElementById('resultBox').classList.add('hidden');
});