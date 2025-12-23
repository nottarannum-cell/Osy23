// Hair Concerns Data
const concernsData = {
    'hair-fall': {
        icon: '🍂',
        title: 'Hair Fall / Shedding',
        solutions: [
            'Avoid tight hairstyles that pull on the scalp',
            'Use gentle, sulfate-free shampoos',
            'Light oil massage (jojoba or argan) to improve circulation',
            'Look for ingredients: rosemary oil, caffeine, niacinamide',
            'Reduce heat styling and chemical treatments',
            'Ensure adequate nutrition (protein, iron, vitamins)',
            'Manage stress levels'
        ],
        warning: 'If hair fall is severe (more than 100-150 hairs/day) or sudden, consult a dermatologist to rule out underlying medical conditions.'
    },
    'frizz': {
        icon: '⚡',
        title: 'Frizz',
        solutions: [
            'Use hydrating leave-in conditioners',
            'Avoid harsh sulfates that strip natural oils',
            'Use microfiber towels instead of regular towels',
            'Apply products to damp hair to seal in moisture',
            'Look for ingredients: glycerin, aloe vera, panthenol',
            'Use cool water for final rinse',
            'Consider silk or satin pillowcases',
            'Avoid over-brushing dry hair'
        ],
        warning: null
    },
    'dryness': {
        icon: '🌵',
        title: 'Dryness',
        solutions: [
            'Use moisturizing conditioners regularly',
            'Pre-oil before washing (especially for high porosity)',
            'Deep condition weekly with heat treatment',
            'Look for ingredients: hyaluronic acid, aloe vera, coconut oil (light)',
            'Avoid overwashing (1-2×/week for dry hair)',
            'Seal in moisture with light oils after conditioning',
            'Use gentle, moisturizing shampoos',
            'Protect hair from sun and environmental damage'
        ],
        warning: null
    },
    'breakage': {
        icon: '✂️',
        title: 'Breakage / Split Ends',
        solutions: [
            'Balance moisture and protein in your routine',
            'Use satin or silk pillowcases to reduce friction',
            'Get regular gentle trims to remove split ends',
            'Avoid rough brushing, especially when wet',
            'Use wide-tooth combs for detangling',
            'Reduce heat styling and use heat protectants',
            'Strengthen hair with protein treatments (1-2×/month)',
            'Be gentle when styling and avoid tight hairstyles'
        ],
        warning: null
    },
    'dandruff': {
        icon: '❄️',
        title: 'Dandruff / Flakiness',
        solutions: [
            'Use shampoos with active ingredients: salicylic acid, zinc pyrithione, or tea tree oil',
            'Avoid heavy scalp oils that can worsen buildup',
            'Wash more regularly (2-3×/week) to remove flakes',
            'Gently massage scalp during washing',
            'Look for anti-fungal ingredients',
            'Avoid scratching scalp',
            'Consider scalp exfoliation treatments'
        ],
        warning: 'If dandruff is severe, persistent, or accompanied by redness/itching, consult a dermatologist. It could be seborrheic dermatitis or another condition requiring medical treatment.'
    },
    'oily-scalp': {
        icon: '💧',
        title: 'Oily Scalp',
        solutions: [
            'Wash 3-4 times per week with gentle clarifying shampoo',
            'Use lightweight products, avoid heavy oils on scalp',
            'Focus shampoo on scalp, condition only ends',
            'Look for ingredients: niacinamide, green tea extract',
            'Avoid over-conditioning scalp area',
            'Use dry shampoo between washes if needed',
            'Don\'t skip washing - regular cleansing prevents buildup'
        ],
        warning: null
    },
    'buildup': {
        icon: '🧴',
        title: 'Product Buildup',
        solutions: [
            'Use clarifying shampoo once a month or as needed',
            'Regular scalp exfoliation to remove dead skin and product',
            'Avoid layering too many leave-in products',
            'Rinse thoroughly after conditioning',
            'Use apple cider vinegar rinse occasionally (diluted)',
            'Choose water-soluble products when possible',
            'Simplify your routine - less is often more'
        ],
        warning: null
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const concernCards = document.querySelectorAll('.concern-card');
    
    concernCards.forEach(card => {
        card.addEventListener('click', function() {
            const concern = this.dataset.concern;
            showConcernDetails(concern);
        });
    });
});

function showConcernDetails(concern) {
    const data = concernsData[concern];
    const detailsDiv = document.getElementById('concern-details');
    
    let warningHtml = '';
    if (data.warning) {
        warningHtml = `
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-4">
                <p class="text-sm text-gray-700"><strong>⚠️ Important:</strong> ${data.warning}</p>
            </div>
        `;
    }
    
    detailsDiv.innerHTML = `
        <div class="result-card">
            <div class="text-center mb-6">
                <div class="text-6xl mb-4">${data.icon}</div>
                <h2 class="text-3xl font-heading font-bold text-pink-600 mb-2">${data.title}</h2>
            </div>
            <div class="bg-white rounded-xl p-6">
                <h3 class="text-xl font-heading font-semibold text-blue-600 mb-4">Solutions & Tips:</h3>
                <ul class="space-y-3 text-gray-700">
                    ${data.solutions.map(solution => `<li class="flex items-start"><span class="text-pink-500 mr-2">•</span> ${solution}</li>`).join('')}
                </ul>
                ${warningHtml}
            </div>
            <div class="mt-6 text-center">
                <button onclick="closeConcernDetails()" class="btn-primary">Close</button>
            </div>
        </div>
    `;
    
    detailsDiv.classList.remove('hidden');
    detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeConcernDetails() {
    document.getElementById('concern-details').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


