function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allCharacters = '';
    if (includeUppercase) allCharacters += uppercase;
    if (includeLowercase) allCharacters += lowercase;
    if (includeNumbers) allCharacters += numbers;
    if (includeSymbols) allCharacters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    document.getElementById('password').textContent = password;
    evaluateStrength(password);
    updateButton();
}

function evaluateStrength(password) {
    const strengthLabel = document.getElementById('strength');
    const length = password.length;
    let strength = 0;

    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (length < 8) {
        strengthLabel.textContent = 'Fortaleza: Débil';
        strengthLabel.setAttribute('data-strength', 'weak');
    } else if (length < 10 || strength < 2) {
        strengthLabel.textContent = 'Fortaleza: Media';
        strengthLabel.setAttribute('data-strength', 'medium');
    } else if (length < 14 || strength < 3) {
        strengthLabel.textContent = 'Fortaleza: Fuerte';
        strengthLabel.setAttribute('data-strength', 'strong');
    } else {
        strengthLabel.textContent = 'Fortaleza: Muy Fuerte';
        strengthLabel.setAttribute('data-strength', 'very-strong');
    }
}

function updateButton() {
    const generateButton = document.getElementById('generate');
    generateButton.textContent = 'Generar nueva contraseña';
}

document.getElementById('generate').addEventListener('click', generatePassword);

document.getElementById('copy').addEventListener('click', () => {
    const password = document.getElementById('password').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Contraseña copiada al portapapeles');
    });
});
