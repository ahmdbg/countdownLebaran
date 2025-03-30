function startCountdown() {
    const targetDate = new Date("March 31, 2025 00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");
    const envelopeElement = document.getElementById("envelope");
    const messageElement = document.getElementById("message");
    const titleElement = document.getElementById("title");

    function showEnvelopeAnimation() {
        const greetingAudio = document.getElementById('greetingAudio');
        const audioButton = document.getElementById('audioButton');
        envelopeElement.style.display = "block";
        
        function updateButtonState(isPlaying) {
            audioButton.innerHTML = isPlaying ? '🔇 Stop Musik' : '🔊 Putar Musik';
        }

        function toggleAudio() {
            if (greetingAudio.paused) {
                greetingAudio.play().then(() => {
                    updateButtonState(true);
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            } else {
                greetingAudio.pause();
                greetingAudio.currentTime = 0;
                updateButtonState(false);
            }
        }

        setTimeout(() => {
            // Initial confetti burst
            confetti({
                particleCount: 300,
                spread: 150,
                origin: { y: 0.6 }
            });

            envelopeElement.classList.add('show');
            
            // Animate ornaments with GSAP
            gsap.to('.ornament', {
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scale: 1.2,
                yoyo: true,
                repeat: -1
            });

            // Show audio button
            audioButton.style.display = "block";
            audioButton.style.position = "fixed";
            audioButton.style.bottom = "20px";
            audioButton.style.right = "20px";
            audioButton.style.padding = "10px 20px";
            audioButton.style.border = "none";
            audioButton.style.borderRadius = "5px";
            audioButton.style.backgroundColor = "#43cea2";
            audioButton.style.color = "white";
            audioButton.style.cursor = "pointer";

            // Ganti event handler tombol
            audioButton.onclick = toggleAudio;

            // Open envelope after showing
            setTimeout(() => {
                envelopeElement.classList.add('open');
                // Remove auto-play to avoid Chrome blocking
                
                // Show message with animation
                setTimeout(() => {
                    messageElement.style.display = "block";
                    const messageContent = document.querySelector('.message-content');
                    messageContent.style.display = "block";
                    messageContent.classList.add('show');
                    
                    // Celebratory confetti
                    const duration = 5 * 1000;
                    const end = Date.now() + duration;
                    
                    (function frame() {
                        confetti({
                            particleCount: 3,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: ['#43cea2', '#185a9d', '#ffffff']
                        });
                        confetti({
                            particleCount: 3,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: ['#43cea2', '#185a9d', '#ffffff']
                        });
                        
                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                }, 1000);
            }, 1500);
        }, 500);
    }

    function startConfetti() {
        const defaults = {
            spread: 360,
            ticks: 300,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            colors: ['#43cea2', '#185a9d', '#ffffff']
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 30,
                scalar: 1.2,
                shapes: ['circle', 'square']
            });

            confetti({
                ...defaults,
                particleCount: 20,
                scalar: 2,
                shapes: ['star']
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = String(current).padStart(2, '0');
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.style.display = "none";
            titleElement.style.display = "none";
            document.getElementById('particles-js').style.display = "block";
            
            // Initialize particles
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50 },
                    color: { value: ['#43cea2', '#185a9d', '#ffffff'] },
                    shape: { type: ['circle', 'triangle'] },
                    opacity: { value: 0.6 },
                    size: { value: 4 },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        out_mode: 'out'
                    }
                }
            });

            showEnvelopeAnimation();
            clearInterval(interval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        ['days', 'hours', 'minutes', 'seconds'].forEach(unit => {
            const element = document.getElementById(unit);
            const currentValue = parseInt(element.textContent);
            const newValue = eval(unit);
            if (currentValue !== newValue) {
                animateValue(element, currentValue, newValue, 500);
            }
        });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

startCountdown();
