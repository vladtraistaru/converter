const API_BASE = 'https://api.frankfurter.dev/v1';

// DOM Elements
const converterTypeSelect = document.getElementById('converter-type');
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');
const rateInfo = document.getElementById('rate-info');
const errorDiv = document.getElementById('error');
const swapBtn = document.getElementById('swap-btn');
const funToggle = document.getElementById('fun-toggle');
const comparisonDiv = document.getElementById('comparison');

// State
let currentType = 'currency';
let funMode = false;
const unitsConfig = UNITS_CONFIG; // Loaded from units-config.js
let currencies = {};
let rateCache = {};
const CACHE_DURATION = 5 * 60 * 1000;

// Initialize
async function init() {
    // Build type dropdown
    buildTypeDropdown();

    // Setup events
    setupEventListeners();

    // Load initial converter
    await loadConverterType(currentType);
}

function buildTypeDropdown() {
    converterTypeSelect.innerHTML = '';

    // Group units by category
    const categories = {};

    // Add currency first (hardcoded, not from config)
    categories['Popular'] = [
        { key: 'currency', name: 'Currency', icon: '💱' }
    ];

    // Add units from config
    Object.entries(unitsConfig).forEach(([key, config]) => {
        const category = config.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({
            key,
            name: config.name,
            icon: config.icon
        });
    });

    // Build optgroups
    Object.entries(categories).forEach(([category, items]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;

        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.key;
            option.textContent = `${item.icon} ${item.name}`;
            if (item.key === 'currency') option.selected = true;
            optgroup.appendChild(option);
        });

        converterTypeSelect.appendChild(optgroup);
    });
}

function setupEventListeners() {
    converterTypeSelect.addEventListener('change', onTypeChange);
    amountInput.addEventListener('input', smartConvert);
    fromSelect.addEventListener('change', convert);
    toSelect.addEventListener('change', convert);
    swapBtn.addEventListener('click', swap);
    funToggle.addEventListener('click', toggleFunMode);
}

function smartConvert() {
    // Use debounce only for currency (API calls), instant for local units
    if (currentType === 'currency') {
        debouncedConvert();
    } else {
        convert();
    }
}

function toggleFunMode() {
    funMode = !funMode;
    funToggle.classList.toggle('active', funMode);
    // Reload current type to update dropdowns
    loadConverterType(currentType);
}

async function onTypeChange() {
    currentType = converterTypeSelect.value;
    await loadConverterType(currentType);
}

async function loadConverterType(type) {
    clearDropdowns();
    hideError();

    // Show/hide fun toggle based on whether this type has fun units
    const hasFunUnits = unitsConfig[type]?.funUnits;
    funToggle.classList.toggle('visible', !!hasFunUnits);
    
    // Reset fun mode if switching to a type without fun units
    if (!hasFunUnits && funMode) {
        funMode = false;
        funToggle.classList.remove('active');
    }

    if (type === 'currency') {
        await loadCurrency();
    } else if (unitsConfig[type]) {
        loadUnits(type);
    } else {
        showError('This conversion type is not available.');
        resultDiv.textContent = '—';
        rateInfo.textContent = '';
    }
}

// Currency functions
async function loadCurrency() {
    if (Object.keys(currencies).length === 0) {
        try {
            const response = await fetch(`${API_BASE}/currencies`);
            if (!response.ok) throw new Error('Failed to fetch currencies');
            currencies = await response.json();
        } catch (error) {
            showError('Unable to load currencies. Please refresh the page.');
            return;
        }
    }

    const currencyCodes = Object.keys(currencies).sort();
    currencyCodes.forEach(code => {
        addOption(fromSelect, code, `${code} - ${currencies[code]}`);
        addOption(toSelect, code, `${code} - ${currencies[code]}`);
    });

    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
    convert();
}

async function convertCurrency(amount, from, to) {
    if (from === to) {
        return { result: amount, rate: 1 };
    }

    const rate = await fetchRate(from, to);
    return { result: amount * rate, rate };
}

async function fetchRate(from, to) {
    const key = `${from}_${to}`;
    const cached = rateCache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.rate;
    }

    const response = await fetch(`${API_BASE}/latest?base=${from}&symbols=${to}`);
    if (!response.ok) throw new Error('Failed to fetch rate');

    const data = await response.json();
    const rate = data.rates[to];
    rateCache[key] = { rate, timestamp: Date.now() };
    return rate;
}

// Unit conversion functions
function loadUnits(type) {
    const config = unitsConfig[type];

    // Add standard units
    if (funMode && config.funUnits) {
        // Use optgroups when fun mode is on
        addOptgroup(fromSelect, 'Standard', config.units);
        addOptgroup(toSelect, 'Standard', config.units);
        addOptgroup(fromSelect, 'Fun 🎉', config.funUnits);
        addOptgroup(toSelect, 'Fun 🎉', config.funUnits);
    } else {
        // No optgroups when fun mode is off
        Object.entries(config.units).forEach(([code, unit]) => {
            addOption(fromSelect, code, `${code} - ${unit.name}`);
            addOption(toSelect, code, `${code} - ${unit.name}`);
        });
    }

    fromSelect.value = config.defaults.from;
    toSelect.value = config.defaults.to;
    convert();
}

function addOptgroup(select, label, units) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = label;

    Object.entries(units).forEach(([code, unit]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${unit.name}`;
        optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
}

function getUnit(config, code) {
    // Check standard units first, then fun units
    return config.units[code] || (config.funUnits && config.funUnits[code]);
}

function convertUnits(amount, from, to, type) {
    const config = unitsConfig[type];

    // Special case: temperature
    if (config.type === 'temperature') {
        return convertTemperature(amount, from, to);
    }

    // Special case: fuel economy (has inverse units)
    if (config.type === 'fuel') {
        return convertFuel(amount, from, to, config);
    }

    // Standard conversion (check both units and funUnits)
    const fromUnit = getUnit(config, from);
    const toUnit = getUnit(config, to);
    const fromToBase = fromUnit.toBase;
    const toToBase = toUnit.toBase;

    // Convert: amount in 'from' -> base -> 'to'
    const baseValue = amount * fromToBase;
    const result = baseValue / toToBase;
    const rate = fromToBase / toToBase;

    return { result, rate, baseValue };
}

function convertTemperature(amount, from, to) {
    let celsius;

    // Convert to Celsius first
    switch (from) {
        case 'c': celsius = amount; break;
        case 'f': celsius = (amount - 32) * 5 / 9; break;
        case 'k': celsius = amount - 273.15; break;
    }

    // Convert from Celsius to target
    let result;
    switch (to) {
        case 'c': result = celsius; break;
        case 'f': result = celsius * 9 / 5 + 32; break;
        case 'k': result = celsius + 273.15; break;
    }

    // Rate doesn't make sense for temperature, show formula instead
    return { result, rate: null, formula: getTemperatureFormula(from, to) };
}

function getTemperatureFormula(from, to) {
    const formulas = {
        'c_f': '°C × 9/5 + 32',
        'c_k': '°C + 273.15',
        'f_c': '(°F - 32) × 5/9',
        'f_k': '(°F - 32) × 5/9 + 273.15',
        'k_c': 'K - 273.15',
        'k_f': '(K - 273.15) × 9/5 + 32'
    };
    return formulas[`${from}_${to}`] || '';
}

function convertFuel(amount, from, to, config) {
    const fromUnit = config.units[from];
    const toUnit = config.units[to];

    let kml; // km per liter as base

    // Convert to km/l
    if (fromUnit.inverse) {
        kml = 100 / amount;
    } else {
        kml = amount * fromUnit.toBase;
    }

    // Convert from km/l to target
    let result;
    if (toUnit.inverse) {
        result = 100 / kml;
    } else {
        result = kml / toUnit.toBase;
    }

    return { result, rate: null };
}

// Comparison functions
function getComparison(baseValue, type) {
    const config = unitsConfig[type];
    if (!config || !config.comparisons || baseValue <= 0) return null;

    // Find the best comparison
    for (const comp of config.comparisons) {
        if (baseValue <= comp.max) {
            const ratio = baseValue / comp.max;
            if (ratio >= 0.1) {
                // Show as fraction of the reference
                const displayRatio = ratio >= 1 ? ratio.toFixed(1) : ratio.toFixed(2);
                return `${comp.icon} About ${displayRatio}× the ${comp.text}`;
            } else {
                // Too small for this comparison, will use a smaller one
                continue;
            }
        }
    }

    // Value is larger than all comparisons
    const largest = config.comparisons[config.comparisons.length - 1];
    const ratio = (baseValue / largest.max).toFixed(1);
    return `${largest.icon} About ${ratio}× the ${largest.text}`;
}

function showComparison(baseValue, type) {
    const comparison = getComparison(baseValue, type);

    if (comparison) {
        comparisonDiv.innerHTML = `<span class="comparison-text">${comparison}</span>`;
        comparisonDiv.classList.add('show');
    } else {
        comparisonDiv.classList.remove('show');
    }
}

function hideComparison() {
    comparisonDiv.classList.remove('show');
}

// Shared functions
function clearDropdowns() {
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
}

function addOption(select, value, text, title) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    if (title) option.title = title;
    select.appendChild(option);
}

async function convert() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!from || !to) return;

    hideError();
    resultDiv.classList.add('loading');

    try {
        let conversion;

        if (currentType === 'currency') {
            conversion = await convertCurrency(amount, from, to);
            hideComparison(); // No comparisons for currency
        } else if (unitsConfig[currentType]) {
            conversion = convertUnits(amount, from, to, currentType);
            // Show comparison based on the base value
            if (conversion.baseValue !== undefined) {
                showComparison(conversion.baseValue, currentType);
            } else {
                hideComparison();
            }
        } else {
            throw new Error('Not implemented');
        }

        resultDiv.textContent = formatNumber(conversion.result);

        // Show rate info
        if (from === to) {
            rateInfo.textContent = '';
        } else if (conversion.formula) {
            rateInfo.textContent = conversion.formula;
        } else if (conversion.rate !== null) {
            rateInfo.textContent = `1 ${from} = ${formatRate(conversion.rate)} ${to}`;
        } else {
            rateInfo.textContent = '';
        }

        resultDiv.classList.remove('loading');
    } catch (error) {
        resultDiv.classList.remove('loading');
        showError('Conversion failed. Please try again.');
        hideComparison();
        console.error(error);
    }
}

function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) {
        return '—';
    }
    if (Math.abs(num) >= 1000000) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    if (Math.abs(num) < 0.0001 && num !== 0) {
        return num.toExponential(4);
    }
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 });
}

function formatRate(rate) {
    if (rate === null || rate === undefined) return '';
    if (Math.abs(rate) < 0.0001) {
        return rate.toExponential(4);
    }
    return rate.toFixed(6).replace(/\.?0+$/, '');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function hideError() {
    errorDiv.classList.remove('show');
}

function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const debouncedConvert = debounce(convert, 300);

function swap() {
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;
    fromSelect.value = toValue;
    toSelect.value = fromValue;
    convert();
}

// Start
init();
