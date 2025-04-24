document.addEventListener('DOMContentLoaded', function() {
    // Validasi Form Login
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!validateEmail(email)) {
                showError('Email tidak valid');
                return;
            }
            
            if (password.length < 8) {
                showError('Password minimal 8 karakter');
                return;
            }
            
            // Simulasi login berhasil
            simulateLogin();
        });
    }

    // Validasi Form Register
    const registerForm = document.querySelector('.auth-form');
    if (registerForm && document.getElementById('fullname')) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (fullname.length < 3) {
                showError('Nama lengkap minimal 3 karakter');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Email tidak valid');
                return;
            }
            
            if (password.length < 8) {
                showError('Password minimal 8 karakter');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Password tidak sama');
                return;
            }
            
            if (!terms) {
                showError('Anda harus menyetujui syarat dan ketentuan');
                return;
            }
            
            // Simulasi registrasi berhasil
            simulateRegister();
        });
    }

    // Fungsi Validasi Email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Tampilkan Pesan Error
    function showError(message) {
        // Hapus error sebelumnya
        const oldError = document.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        // Buat element error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.textAlign = 'center';
        errorElement.textContent = message;
        
        // Tempatkan sebelum tombol submit
        const submitButton = document.querySelector('.auth-form .btn');
        submitButton.parentNode.insertBefore(errorElement, submitButton);
        
        // Animasi
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        errorElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    // Simulasi Login Berhasil
    function simulateLogin() {
        const submitButton = document.querySelector('.auth-form .btn');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        
        // Simulasi request API
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }

    // Simulasi Register Berhasil
    function simulateRegister() {
        const submitButton = document.querySelector('.auth-form .btn');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat akun...';
        
        // Simulasi request API
        setTimeout(() => {
            showSuccess('Akun berhasil dibuat! Mengarahkan ke dashboard...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 1500);
    }

    // Tampilkan Pesan Sukses
    function showSuccess(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'success-message';
        errorElement.style.color = 'var(--success-color)';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.textAlign = 'center';
        errorElement.textContent = message;
        
        const submitButton = document.querySelector('.auth-form .btn');
        submitButton.parentNode.insertBefore(errorElement, submitButton);
    }
});