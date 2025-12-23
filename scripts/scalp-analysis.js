// Scalp Analysis Results
const scalpData = {
    Normal: {
        icon: '✅',
        color: 'green',
        explanation: 'Your scalp is balanced and healthy!',
        tips: [
            'Wash 2-3 times per week',
            'Use balanced, gentle shampoos',
            'Maintain regular routine',
            'Look for balanced formulas with mild surfactants'
        ]
    },
    Dry: {
        icon: '🌵',
        color: 'orange',
        explanation: 'Your scalp needs extra moisture and gentle care.',
        tips: [
            'Wash less frequently (1-2×/week)',
            'Use moisturizing, gentle shampoos',
            'Pre-oil before washing',
            'Look for: Aloe, hyaluronic acid, fatty alcohols',
            'Avoid harsh sulfates'
        ]
    },
    Oily: {
        icon: '💧',
        color: 'blue',
        explanation: 'Your scalp produces excess oil and needs regular cleansing.',
        tips: [
            'Wash 3-4 times per week',
            'Use clarifying but non-stripping shampoos',
            'Focus on scalp cleansing',
            'Look for: Niacinamide, green tea, gentle clarifying agents',
            'Avoid heavy oils on scalp'
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.scalp-result-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            showScalpResults(type);
        });
    });
});

function showScalpResults(type) {
    const data = scalpData[type];
    const resultsDiv = document.getElementById('scalp-results');
    
    resultsDiv.innerHTML = `
        <div class="result-card border-${data.color}-300">
            <div class="text-center mb-6">
                <div class="text-6xl mb-4">${data.icon}</div>
                <h2 class="text-3xl font-heading font-bold text-${data.color}-600 mb-2">${type} Scalp</h2>
                <p class="text-lg text-gray-700">${data.explanation}</p>
            </div>
            <div class="bg-white rounded-xl p-6">
                <h3 class="text-xl font-heading font-semibold text-${data.color}-600 mb-4">Recommended Care:</h3>
                <ul class="space-y-2 text-gray-700">
                    ${data.tips.map(tip => `<li>• ${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


