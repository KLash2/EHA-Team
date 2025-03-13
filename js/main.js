// التحكم في صفحة الدخول
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const splashVideo = document.querySelector('.splash-video');
    const splashContent = document.querySelector('.splash-content');

    // التحقق من عرض صفحة البداية
    const hasSplashBeenShown = localStorage.getItem('splashShown');
    
    if (!hasSplashBeenShown) {
        // عرض صفحة البداية
        splashScreen.style.display = 'flex';
        
        // وظيفة لتشغيل الفيديو
        const playVideo = () => {
            const playPromise = splashVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Video started playing');
                }).catch(error => {
                    console.log('Autoplay prevented:', error);
                    document.addEventListener('click', () => {
                        splashVideo.play();
                    }, { once: true });
                });
            }
        };

        // محاولة تشغيل الفيديو عند تحميله
        splashVideo.addEventListener('loadeddata', playVideo);

        // إضافة مستمعات إضافية للتأكد من تشغيل الفيديو
        document.addEventListener('click', playVideo, { once: true });
        document.addEventListener('touchstart', playVideo, { once: true });
        document.addEventListener('keydown', playVideo, { once: true });

        // تأثير التحول بعد 13 ثانية
        setTimeout(() => {
            // خفض مستوى الصوت تدريجياً
            let volume = 1;
            const fadeAudio = setInterval(() => {
                if (volume > 0) {
                    volume = Math.max(0, volume - 0.1);
                    splashVideo.volume = volume;
                } else {
                    clearInterval(fadeAudio);
                    splashVideo.muted = true;
                }
            }, 100);

            // إضافة تأثيرات دارك ويب
            splashScreen.classList.add('dark-transition');
            splashVideo.classList.add('dark-transition');
            splashContent.classList.add('dark-transition');
            
            // إخفاء صفحة الدخول بعد انتهاء التأثيرات
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    // تخزين حالة العرض
                    localStorage.setItem('splashShown', 'true');
                }, 500);
            }, 1500);
        }, 13000);
    } else {
        // إخفاء صفحة البداية مباشرة إذا تم عرضها من قبل
        splashScreen.style.display = 'none';
    }

    // تهيئة particles.js مع تحسين الأداء
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#00a8ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00a8ff',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });

    // تحسين تأثير الكتابة
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = ['اختبار الاختراق', 'أمن المعلومات', 'التحقيق الجنائي الرقمي', 'حماية البيانات'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newTextDelay);

    // تحسين القائمة المتجاوبة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // إغلاق القائمة عند النقر على أي رابط
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // تحسين التمرير السلس مع تأثيرات إضافية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تحسين نموذج الاتصال
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // التحقق من صحة المدخلات
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            if (!formData.name || !formData.email || !formData.message) {
                showMessage('error', 'يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showMessage('error', 'يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            try {
                // هنا يمكن إضافة كود إرسال البيانات إلى الخادم
                showMessage('success', 'تم إرسال رسالتك بنجاح!');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                showMessage('error', 'عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            }
        });
    }

    // دالة التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // دالة إظهار الرسائل
    function showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        `;
        
        document.body.appendChild(messageDiv);

        // حذف الرسالة بعد 3 ثواني
        setTimeout(() => {
            messageDiv.classList.add('fade-out');
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // تحسين تأثيرات التمرير
    const scrollElements = document.querySelectorAll('.service-card, .project-card, .stat-item');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // تحسين أداء التمرير باستخدام requestAnimationFrame
    let throttleTimer;
    const throttle = (callback, time) => {
        if (throttleTimer) return;
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    };

    window.addEventListener('scroll', () => {
        throttle(handleScrollAnimation, 250);
    });

    // تحسين شريط التنقل عند التمرير
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // التحكم بالصوت
    const audio = document.getElementById('background-audio');
    const audioControl = document.getElementById('audio-control');
    
    // تشغيل الصوت تلقائياً عند تحميل الصفحة
    audio.volume = 0.9; // ضبط مستوى الصوت
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Auto-play was prevented:', error);
        });
    }
    
    // زر التحكم بالصوت
    audioControl.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            audioControl.classList.remove('muted');
        } else {
            audio.pause();
            audioControl.classList.add('muted');
        }
    });
});