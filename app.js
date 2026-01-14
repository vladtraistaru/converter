const API_BASE = 'https://api.frankfurter.dev/v1';

const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');
const rateInfo = document.getElementById('rate-info');
const errorDiv = document.getElementById('error');
const swapBtn = document.getElementById('swap-btn');

let currencies = {};
let rateCache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchCurrencies() {
    try {
        const response = await fetch(`${API_BASE}/currencies`);
        if (!response.ok) throw new Error('Failed to fetch currencies');
        currencies = await response.json();
        populateDropdowns();
    } catch (error) {
        showError('Unable to load currencies. Please refresh the page.');
    }
}

function populateDropdowns() {
    const currencyCodes = Object.keys(currencies).sort();

    currencyCodes.forEach(code => {
        const option1 = document.createElement('option');
        option1.value = code;
        option1.textContent = `${code} - ${currencies[code]}`;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = code;
        option2.textContent = `${code} - ${currencies[code]}`;
        toSelect.appendChild(option2);
    });

    // Set defaults
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';

    // Initial conversion
    convert();
}

function getCacheKey(from, to) {
    return `${from}_${to}`;
}

function getCachedRate(from, to) {
    const key = getCacheKey(from, to);
    const cached = rateCache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.rate;
    }
    return null;
}

function setCachedRate(from, to, rate) {
    const key = getCacheKey(from, to);
    rateCache[key] = { rate, timestamp: Date.now() };
}

async function fetchRate(from, to) {
    const cachedRate = getCachedRate(from, to);
    if (cachedRate !== null) {
        return cachedRate;
    }

    const response = await fetch(`${API_BASE}/latest?base=${from}&symbols=${to}`);
    if (!response.ok) throw new Error('Failed to fetch rate');

    const data = await response.json();
    const rate = data.rates[to];
    setCachedRate(from, to, rate);
    return rate;
}

async function convert() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!from || !to) return;

    hideError();
    resultDiv.classList.add('loading');

    // Same currency - no conversion needed
    if (from === to) {
        resultDiv.textContent = formatNumber(amount);
        resultDiv.classList.remove('loading');
        rateInfo.textContent = '';
        return;
    }

    try {
        const rate = await fetchRate(from, to);
        const converted = amount * rate;

        resultDiv.textContent = formatNumber(converted);
        rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        resultDiv.classList.remove('loading');
    } catch (error) {
        resultDiv.classList.remove('loading');
        showError('Conversion failed. Please try again.');
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
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

// Event listeners
amountInput.addEventListener('input', debouncedConvert);
fromSelect.addEventListener('change', convert);
toSelect.addEventListener('change', convert);
swapBtn.addEventListener('click', swap);

// Initialize
fetchCurrencies();
