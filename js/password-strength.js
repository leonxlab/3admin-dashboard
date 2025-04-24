document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;

    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.style.marginTop = '0.5rem';
    strengthIndicator.style.height = '4px';
    strengthIndicator.style.borderRadius = '2px';
    strengthIndicator.style.backgroundColor = 'var(--border-color)';
    strengthIndicator.style.position = 'relative';
    strengthIndicator.style.overflow = 'hidden';
    
    const strengthBar = document.createElement('div');
    strengthBar.style.position = 'absolute';
    strengthBar.style.top = '0';
    strengthBar.style.left = '0';
    strengthBar.style.height = '100%';
    strengthBar.style.width = '0%';
    strengthBar.style.transition = 'width 0.3s ease, background-color 0.3s ease';
    
    strengthIndicator.appendChild(strengthBar);
    passwordInput.parentNode.insertBefore(strengthIndicator, passwordInput.nextSibling);

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = 'transparent';
            return;
        }
        
        strengthBar.style.width = strength.percentage + '%';
        strengthBar.style.backgroundColor = strength.color;
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        strength += Math.min(password.length / 8, 1) * 40;
        
        // Character variety
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        
        const varietyCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
        strength += (varietyCount / 4) * 60;
        
        // Cap at 100
        strength = Math.min(strength, 100);
        
        // Determine color
        let color;
        if (strength < 40) {
            color = 'var(--danger-color)';
        } else if (strength < 70) {
            color = 'var(--warning-color)';
        } else {
            color = 'var(--success-color)';
        }
        
        return {
            percentage: strength,
            color: color
        };
    }
});