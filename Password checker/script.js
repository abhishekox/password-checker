const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const submitBtn = document.getElementById('submitBtn');

const requirements = {
    length: { el: document.getElementById('req-length'), test: pw => pw.length >= 8 },
    upper: { el: document.getElementById('req-upper'), test: pw => /[A-Z]/.test(pw) },
    number: { el: document.getElementById('req-number'), test: pw => /[0-9]/.test(pw) },
    special: { el: document.getElementById('req-special'), test: pw => /[^A-Za-z0-9]/.test(pw) }
};

const strengthLevels = [
    { label: 'Enter a password', color: '#334155', width: '0%' },
    { label: 'Weak', color: 'var(--weak)', width: '25%' },
    { label: 'Medium', color: 'var(--medium)', width: '50%' },
    { label: 'Strong', color: 'var(--strong)', width: '75%' },
    { label: 'Very Strong', color: 'var(--very-strong)', width: '100%' }
];

toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.textContent = isPassword ? '🙈' : '👁';
});

passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    let metCount = 0;

    Object.values(requirements).forEach(req => {
        const passed = req.test(value);
        req.el.classList.toggle('met', passed);
        if (passed) metCount++;
    });

    const level = value.length === 0 ? 0 : metCount;
    const current = strengthLevels[level];

    strengthBar.style.width = current.width;
    strengthBar.style.background = current.color;
    strengthLabel.textContent = current.label;

    const isValid = metCount === 4;
    submitBtn.disabled = !isValid;
    submitBtn.classList.toggle('active', isValid);
});

submitBtn.addEventListener('click', () => {
    if (!submitBtn.disabled) {
        alert('Account created successfully!')
    }
});

