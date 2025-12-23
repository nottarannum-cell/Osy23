// Routine Generation Logic (Mock - will be replaced with API call later)
const routineTemplates = {
    'Normal-Low': {
        routine: [
            'Wash: 1–2 times/week with gentle shampoo',
            'Oil: Jojoba 1×/week on damp hair',
            'Deep condition: 1× every 2 weeks with heat',
            'Avoid heavy silicones and butters',
            'Look for: Lightweight conditioners, water-based products'
        ]
    },
    'Normal-Medium': {
        routine: [
            'Wash: 2–3 times/week',
            'Oil: Coconut (light) or almond 1–2×/week',
            'Deep condition: 1×/week',
            'Maintain moisture-protein balance',
            'Look for: Balanced humectants, light proteins'
        ]
    },
    'Normal-High': {
        routine: [
            'Wash: 2–3 times/week with hydrating shampoo',
            'Oil: Castor + olive mix 2×/week',
            'Deep condition: Weekly with protein',
            'Seal in moisture after every wash',
            'Look for: Protein-moisture balance, sealing ingredients'
        ]
    },
    'Dry-Low': {
        routine: [
            'Wash: 1×/week with moisturizing shampoo',
            'Oil: Jojoba or grapeseed 2×/week on damp hair',
            'Deep condition: Weekly with heat treatment',
            'Pre-oil before washing',
            'Look for: Hyaluronic acid, aloe, lightweight oils'
        ]
    },
    'Dry-Medium': {
        routine: [
            'Wash: 1–2 times/week',
            'Oil: Almond or sunflower 2×/week',
            'Deep condition: Weekly',
            'Focus on hydration',
            'Look for: Aloe, hyaluronic acid, fatty alcohols'
        ]
    },
    'Dry-High': {
        routine: [
            'Wash: 1–2×/week with hydrating shampoo',
            'Oil: Castor + olive mix 2–3×/week',
            'Deep condition: Weekly with protein',
            'Seal moisture immediately after washing',
            'Look for: Shea, panthenol, protein-moisture balance'
        ]
    },
    'Oily-Low': {
        routine: [
            'Wash: 2–3 times/week with gentle clarifying shampoo',
            'Oil: Jojoba (light) 1×/week, scalp only if needed',
            'Deep condition: 1× every 2 weeks, avoid scalp',
            'Focus on scalp health',
            'Look for: Niacinamide, green tea, gentle surfactants'
        ]
    },
    'Oily-Medium': {
        routine: [
            'Wash: 3–4 times/week with clarifying but non-stripping shampoo',
            'Oil: Lightweight oils 1×/week, avoid scalp',
            'Deep condition: 1×/week, mid-lengths to ends only',
            'Keep scalp clean, condition ends',
            'Look for: Niacinamide, green tea, balanced formulas'
        ]
    },
    'Oily-High': {
        routine: [
            'Wash: 3–4 times/week with clarifying shampoo',
            'Oil: Light sealing oils 1×/week on ends only',
            'Deep condition: 1×/week, avoid scalp area',
            'Focus on scalp cleansing, end hydration',
            'Look for: Clarifying surfactants, niacinamide, green tea'
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('routine-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            scalpType: document.getElementById('scalp-type').value,
            hairPorosity: document.getElementById('hair-porosity').value,
            hairLength: document.getElementById('hair-length').value,
            concerns: document.getElementById('concerns').value.trim()
        };

        // Validate required fields
        if (!formData.name || !formData.scalpType || !formData.hairPorosity) {
            alert('Please fill in all required fields');
            return;
        }

        // Generate and show routine
        const routineData = generateRoutine(formData);

        // Attempt to save to Supabase for logged-in user (non-blocking for UI)
        saveRoutineForCurrentUser(routineData).catch((err) => {
            console.error('Failed to save routine to Supabase:', err);
        });
    });
});

function generateRoutine(data) {
    const key = `${data.scalpType}-${data.hairPorosity}`;
    const template = routineTemplates[key] || routineTemplates['Normal-Medium'];
    
    const routineData = {
        name: data.name,
        scalpType: data.scalpType,
        hairPorosity: data.hairPorosity,
        hairLength: data.hairLength || '',
        concerns: data.concerns || '',
        routine: template.routine
    };

    // Display results
    const resultsDiv = document.getElementById('routine-results');
    resultsDiv.innerHTML = formatRoutine(routineData);
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return routineData;
}
 
async function saveRoutineForCurrentUser(routineData) {
    // Supabase client is created globally in main.js
    if (!supabaseClient) {
        console.warn('Supabase client not available on this page; routine will not be saved.');
        return;
    }

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData || !userData.user) {
        // Not logged in; do not save but do not block the user either
        console.info('User is not logged in; routine not saved to Supabase.');
        return;
    }

    const user = userData.user;

    const payload = {
        user_id: user.id,
        routine: {
            name: routineData.name,
            scalpType: routineData.scalpType,
            hairPorosity: routineData.hairPorosity,
            hairLength: routineData.hairLength,
            concerns: routineData.concerns,
            steps: routineData.routine
        }
    };

    const { error } = await supabaseClient.from('saved_routines').insert(payload);
    if (error) {
        throw error;
    }
}

