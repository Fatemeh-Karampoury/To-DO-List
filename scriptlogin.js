const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.querySelector('.username-error');
const passwordError = document.querySelector('.password-error');
const submitBtn = document.getElementById('submit-btn');

// مقدار صحیح ایمیل و رمز برای تست
const validEmail = "eve.holt@reqres.in";
const validPassword = "cityslicka";

submitBtn.addEventListener('click', async () => {
    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // بررسی مقدار نام کاربری
    if (email === '') {
        usernameError.style.display = 'block';
        usernameError.textContent = 'نام کاربری را وارد کنید';
        return;
    } else {
        usernameError.style.display = 'none';
    }

    // بررسی مقدار رمز عبور
    if (password === '') {
        passwordError.style.display = 'block';
        passwordError.textContent = 'رمز عبور را وارد کنید';
        return;
    } else {
        passwordError.style.display = 'none';
    }

    // بررسی اینکه ایمیل و رمز معتبر باشند
    if (email !== validEmail || password !== validPassword) {
        passwordError.style.display = 'block';
        passwordError.textContent = 'نام کاربری یا رمز عبور اشتباه است';
        return;
    }

    try {
        const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            passwordError.style.display = 'block';
            passwordError.textContent = data.error || 'خطا در ورود به سیستم';
            return;
        }

        console.log('توکن دریافتی:', data.token);
        localStorage.setItem('token', data.token);

        // پاک کردن ورودی‌ها
        usernameInput.value = '';
        passwordInput.value = '';

        // هدایت به صفحه دیگر
        window.location.href = 'index.html';

    } catch (error) {
        alert('خطا در ارتباط با سرور');
    }
});
