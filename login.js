const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');
const loginForm = document.getElementById('login-form');
const signUpForm = document.querySelector('.sign-up form');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');

// Định nghĩa ngôn ngữ
const languages = {
    vi: {
        'home': 'Trang chủ',
        'flight-info': 'Thông tin chuyến bay đã đặt',
        'help': 'Trợ giúp',
        'login-signup': 'Log in/Sign up',
        'login': 'Đăng nhập',
        'signup': 'Đăng ký',
        'username': 'Tên đăng nhập',
        'email': 'Email',
        'password': 'Mật khẩu',
        'forgot-pass': 'Quên mật khẩu?',
        'login-btn': 'Đăng nhập',
        'signup-btn': 'Đăng ký',
        'no-account': 'Chưa có tài khoản?',
        'already-account': 'Đã có tài khoản?',
        'signin': 'Đăng nhập',
        'signup': 'Đăng ký',
        'copyright': '© 2024 WL: Win every fLight. Quyền được bảo lưu.',
        'contact': 'Liên hệ chúng tôi:',
        'phone': 'SĐT : 0988241156',
        'address': 'Địa Chỉ : Quận Hà Đông Thành Phố Hà Nội'
    },
    en: {
        'home': 'Home',
        'flight-info': 'Booked Flight Info',
        'help': 'Help',
        'login-signup': 'Log in/Sign up',
        'login': 'Login',
        'signup': 'Sign Up',
        'username': 'Username',
        'email': 'Email',
        'password': 'Password',
        'forgot-pass': 'Forgot Password?',
        'login-btn': 'Login',
        'signup-btn': 'Sign Up',
        'no-account': "Don't have an account?",
        'already-account': 'Already have an account?',
        'signin': 'Sign In',
        'signup': 'Sign Up',
        'copyright': '© 2024 WL: Win every fLight. All rights reserved.',
        'contact': 'Contact us:',
        'phone': 'Phone: 0988241156',
        'address': 'Address: Ha Dong District, Hanoi City'
    }
};

// Chuyển đổi form
signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signUp');
    wrapper.classList.remove('animate-signIn');
});

// Chuyển đổi chế độ sáng/tối
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Chuyển đổi ngôn ngữ
let currentLang = localStorage.getItem('language') || 'vi';
function updateLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        element.textContent = languages[lang][key];
    });
    langToggle.textContent = lang === 'vi' ? 'EN' : 'VI';
    localStorage.setItem('language', lang);
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    updateLanguage(currentLang);
});

// Khởi tạo trạng thái
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    // Khởi tạo ngôn ngữ
    updateLanguage(currentLang);
});

// Xử lý đăng nhập
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/ttkh');
        const data = await response.json();

        const user = data.find(user => user.username === username && user.password === password);

        if (user) {
            alert(languages[currentLang]['login-success'] || 'Đăng nhập thành công');
            window.location.href = 'home.html';
        } else {
            alert(languages[currentLang]['login-fail'] || 'Tên đăng nhập hoặc mật khẩu sai');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(languages[currentLang]['error'] || 'Xảy ra lỗi hãy kiểm tra kết nối');
    }
});

// Xử lý đăng ký
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    const newUser = {
        username,
        email,
        password
    };

    try {
        const response = await fetch('http://localhost:3000/ttkh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            alert(languages[currentLang]['signup-success'] || 'Đăng ký thành công');
            signInLink.click();
        } else {
            alert(languages[currentLang]['signup-fail'] || 'Đăng ký thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(languages[currentLang]['error'] || 'Xảy ra lỗi hãy kiểm tra kết nối');
    }
});