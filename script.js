// تحميل متأخر للصور
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// تحسين أداء التمرير
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        // تحديث شريط التقدم
        const skills = document.querySelectorAll('.skill-progress-bar');
        skills.forEach(skill => {
            const rect = skill.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                skill.style.width = skill.getAttribute('data-width');
            }
        });

        // تحديث زر العودة للأعلى
        const scrollTop = document.querySelector('.scroll-top');
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
});

// تحسين التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// تهيئة حالة اللغة والمظهر
let currentLang = localStorage.getItem('language') || 'en';
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // تهيئة شريط التقدم للمهارات
    const skills = document.querySelectorAll('.skill-progress-bar');
    skills.forEach(skill => {
        const percentage = skill.parentElement.querySelector('.skill-percentage').textContent;
        skill.style.width = percentage;
    });

    // إظهار جميع الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.transform = 'none';
    });

    // إظهار جميع البطاقات
    const cards = document.querySelectorAll('.project-card, .skill-item');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });

    // تطبيق اللغة المحفوظة
    setLanguage(currentLang);
    
    // تطبيق المظهر المحفوظ
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-switch i').classList.replace('fa-moon', 'fa-sun');
        document.querySelector('.theme-switch span').textContent = currentLang === 'ar' ? 'الوضع النهاري' : 'Light Mode';
    }
});

// وظيفة تغيير اللغة
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(currentLang);
    localStorage.setItem('language', currentLang);
}

// وظيفة تطبيق اللغة
function setLanguage(lang) {
    // تحديث اتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث النصوص
    document.querySelectorAll('[data-ar]').forEach(element => {
        element.textContent = lang === 'ar' ? element.dataset.ar : element.dataset.en;
    });
    
    // تحديث placeholders
    document.querySelectorAll('[data-ar-placeholder]').forEach(element => {
        element.placeholder = lang === 'ar' ? element.dataset.arPlaceholder : element.dataset.enPlaceholder;
    });
    
    // تحديث زر اللغة
    const langBtn = document.querySelector('.lang-text');
    langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    
    // تحديث عنوان الصفحة
    document.title = lang === 'ar' ? 'محمود أحمد - مطور واجهات ويب' : 'Mahmoud Ahmed - Frontend Developer';
    
    // تحديث اتجاه النصوص
    updateTextAlignment();

    // تحديث نص زر المظهر
    const themeText = document.querySelector('.theme-switch span');
    if (isDarkTheme) {
        themeText.textContent = lang === 'ar' ? 'الوضع النهاري' : 'Light Mode';
    } else {
        themeText.textContent = lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode';
    }
}

// وظيفة تغيير المظهر
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    const themeIcon = document.querySelector('.theme-switch i');
    const themeText = document.querySelector('.theme-switch span');
    
    if (isDarkTheme) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = currentLang === 'ar' ? 'الوضع النهاري' : 'Light Mode';
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = currentLang === 'ar' ? 'الوضع الليلي' : 'Dark Mode';
    }
}

// تحديث اتجاه النصوص
function updateTextAlignment() {
    const isRTL = currentLang === 'ar';
    const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .about-text');
    
    elements.forEach(element => {
        element.style.textAlign = isRTL ? 'right' : 'left';
    });
}

// تهيئة شريط التقدم للمهارات
function initializeSkillsProgress() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                const percentage = progressBar.getAttribute('data-progress');
                progressBar.style.width = percentage + '%';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));
}

// معالجة نموذج الاتصال
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // يمكنك هنا إضافة كود لإرسال البيانات إلى الخادم
    console.log('Form submitted:', { name, email, message });
    
    // عرض رسالة نجاح
    const button = form.querySelector('button');
    const originalContent = button.innerHTML;
    const successMessage = currentLang === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent Successfully!';
    button.innerHTML = `<i class="fas fa-check"></i><span>${successMessage}</span>`;
    button.style.background = '#2ecc71';
    
    // إعادة تعيين النموذج
    form.reset();
    
    // إعادة زر الإرسال إلى حالته الأصلية بعد 3 ثواني
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = '';
    }, 3000);
    
    return false;
}

// تحسين تأثيرات الصور
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'all 0.5s ease-out';
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
});

// إضافة تأثير التوهج للعنوان
const heroTitle = document.querySelector('.hero h2');
setInterval(() => {
    const hue = Math.random() * 360;
    heroTitle.style.textShadow = `0 0 20px hsl(${hue}, 100%, 50%)`;
}, 2000);

// تحسين شاشة التحميل
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
});

// وظيفة التمرير إلى المشاريع
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// وظيفة التمرير إلى الأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// إضافة تأثير التمرير المتحرك
document.addEventListener('scroll', () => {
    const parallaxHeader = document.querySelector('.parallax-header');
    if (parallaxHeader) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        parallaxHeader.style.backgroundPositionY = `${rate}px`;
    }
});

// تهيئة تأثيرات الظهور
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // تأثيرات المشاريع
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        
        // تأثير التحويم للصور
        const img = card.querySelector('img');
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1) translate(0, 0)';
        });
    });

    // تأثيرات المهارات
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
        
        // تأثير التحويم للأيقونات
        const icon = item.querySelector('.skill-icon i');
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // تأثير شريط التقدم
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = percentage;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));

    // تأثير الموجة للأزرار
    const buttons = document.querySelectorAll('.project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // تأثير التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تأثير ظهور العناصر بشكل متتابع
    const staggerItems = (items, delay = 100) => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * delay);
        });
    };

    // تطبيق تأثير الظهور المتتابع
    const cascadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('projects-container')) {
                    staggerItems(entry.target.querySelectorAll('.project-card'));
                } else if (entry.target.classList.contains('skills-container')) {
                    staggerItems(entry.target.querySelectorAll('.skill-item'));
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.projects-container, .skills-container').forEach(container => {
        cascadeObserver.observe(container);
    });

    // تحسين تحميل الصور
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            img.parentElement.classList.add('image-loaded');
        });
    });

    // تأثيرات إضافية للمشاريع
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const tags = card.querySelectorAll('.project-tag');
        
        card.addEventListener('mouseenter', () => {
            tags.forEach((tag, index) => {
                tag.style.transitionDelay = `${index * 50}ms`;
                tag.style.transform = 'translateY(0)';
                tag.style.opacity = '1';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            tags.forEach(tag => {
                tag.style.transitionDelay = '0ms';
                tag.style.transform = 'translateY(20px)';
                tag.style.opacity = '0';
            });
        });
    });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('language-toggle').addEventListener('click', () => {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        const currentLang = el.getAttribute('data-lang') || 'en';
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        el.textContent = el.getAttribute(`data-${newLang}`);
        el.setAttribute('data-lang', newLang);
    });
}); 