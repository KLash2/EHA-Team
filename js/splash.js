document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const progress = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-percentage');
    const video = document.querySelector('.splash-video');
    const mainContent = document.querySelector('.video-background');
    const navbar = document.querySelector('.navbar');
    const particles = document.querySelector('#particles-js');

    // Hide main content initially
    mainContent.style.display = 'none';
    navbar.style.display = 'none';
    particles.style.display = 'none';

    // Start video playback
    video.play();

    let startTime = Date.now();
    const duration = 13000; // 13 seconds

    // Set initial video opacity
    video.style.opacity = '1';

    function updateProgress() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        let percentage = Math.min((elapsed / duration) * 100, 100);
        
        // Add random glitch effect to the percentage
        if (Math.random() < 0.1) {
            percentage += (Math.random() * 2 - 1) * 5;
            percentage = Math.max(0, Math.min(100, percentage));
        }

        progress.style.width = `${percentage}%`;
        progressText.textContent = `System Loading... ${Math.floor(percentage)}%`;

        // Add glitch effect to the text occasionally
        if (Math.random() < 0.05) {
            progressText.style.textShadow = '2px 2px #ff0000, -2px -2px #00ff00';
            setTimeout(() => {
                progressText.style.textShadow = '';
            }, 100);
        }

        // Gradually reduce video opacity as loading progresses
        if (elapsed > duration * 0.8) {
            const fadeProgress = (elapsed - duration * 0.8) / (duration * 0.2);
            video.style.opacity = Math.max(0.5, 1 - fadeProgress);
        }

        if (elapsed < duration) {
            requestAnimationFrame(updateProgress);
        } else {
            // Add final glitch effect
            splashScreen.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                // Add scale animation to splash screen
                splashScreen.style.transform = 'scale(0.8)';
                splashScreen.style.opacity = '0';
                splashScreen.style.transition = 'all 1s ease-in-out';

                // Show main content with fade in
                mainContent.style.display = 'block';
                mainContent.style.opacity = '0';
                navbar.style.display = 'block';
                navbar.style.opacity = '0';
                particles.style.display = 'block';
                
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    navbar.style.opacity = '1';
                    mainContent.style.transition = 'opacity 1s ease-in-out';
                    navbar.style.transition = 'opacity 1s ease-in-out';
                }, 100);

                // Remove splash screen after animation
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 1000);
            }, 500);
        }
    }

    // Start progress animation
    updateProgress();
}));