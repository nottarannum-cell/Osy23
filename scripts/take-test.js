// Porosity Test Logic
const porosityData = {
    low: {
        icon: '🌊',
        type: 'Low Porosity',
        explanation: 'Your hair has tightly closed cuticles, making it harder for moisture to penetrate. It takes longer to get wet and dry.',
        tips: [
            'Use lightweight oils like jojoba, grapeseed, or argan',
            'Apply products to damp hair for better absorption',
            'Use heat (warm towel or steamer) to help open cuticles',
            'Avoid heavy oils and butters that can cause buildup',
            'Look for water-based products and light conditioners'
        ]
    },
    medium: {
        icon: '⚖️',
        type: 'Medium Porosity',
        explanation: 'Your hair has a balanced cuticle structure. It can absorb and retain moisture well with proper care.',
        tips: [
            'Use balanced oils like coconut (light), almond, or sunflower',
            'Maintain a good moisture-protein balance',
            'Regular deep conditioning helps maintain health',
            'You can use a variety of products, just avoid extremes',
            'Focus on maintaining your current healthy routine'
        ]
    },
    high: {
        icon: '💧',
        type: 'High Porosity',
        explanation: 'Your hair has open or damaged cuticles, absorbing moisture quickly but losing it just as fast. It needs extra sealing.',
        tips: [
            'Use heavier sealing oils like castor, olive, or shea-based',
            'Focus on protein treatments to strengthen hair',
            'Seal in moisture with oils and butters after conditioning',
            'Avoid over-washing which can strip natural oils',
            'Look for products with both moisture and protein'
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Test selection
    const testCards = document.querySelectorAll('.test-card');
    testCards.forEach(card => {
        card.addEventListener('click', function() {
            const testType = this.dataset.test;
            document.getElementById('test-selection').classList.add('hidden');
            document.getElementById(`${testType}-test`).classList.remove('hidden');
        });
    });

    // Test result buttons
    const resultButtons = document.querySelectorAll('.test-result-btn');
    resultButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const result = this.dataset.result;
            showResults(result);
        });
    });
});

function showResults(porosity) {
    const data = porosityData[porosity];
    const resultsDiv = document.getElementById('test-results');
    const floatTest = document.getElementById('float-test');
    const sprayTest = document.getElementById('spray-test');

    // Hide test sections
    floatTest.classList.add('hidden');
    sprayTest.classList.add('hidden');

    // Show results
    document.getElementById('porosity-icon').textContent = data.icon;
    document.getElementById('porosity-type').textContent = data.type;
    document.getElementById('porosity-explanation').textContent = data.explanation;
    
    const tipsList = document.getElementById('care-tips');
    tipsList.innerHTML = data.tips.map(tip => `<li>• ${tip}</li>`).join('');

    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetTest() {
    document.getElementById('test-selection').classList.remove('hidden');
    document.getElementById('float-test').classList.add('hidden');
    document.getElementById('spray-test').classList.add('hidden');
    document.getElementById('test-results').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


