/**
 * Thunderstorm Animation for Home 2
 * Creates a canvas-based rain and lightning effect
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('thunderstorm-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Rain particles
    const raindrops = [];
    const maxDrops = 1000;

    // Lightning variables
    let lightning = 0;
    let lightningIntensity = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Raindrop {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.length = Math.random() * 20 + 10;
            this.speed = Math.random() * 10 + 10;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y += this.speed;
            if (this.y > height) {
                this.y = -this.length;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            // Angle the rain slightly
            ctx.lineTo(this.x - 2, this.y + this.length);
            ctx.stroke();
        }
    }

    // Initialize drops
    for (let i = 0; i < maxDrops; i++) {
        raindrops.push(new Raindrop());
    }

    function updateLightning() {
        if (lightning > 0) {
            lightning--;
            lightningIntensity -= 0.05;
            if (lightningIntensity < 0) lightningIntensity = 0;
        } else {
            // Random chance for lightning
            if (Math.random() < 0.005) {
                lightning = Math.floor(Math.random() * 10) + 5;
                lightningIntensity = 1;
            }
        }
    }

    function animate() {
        // Clear logic with trail effect for lightning
        ctx.fillStyle = `rgba(10, 10, 15, ${0.3 + (1 - lightningIntensity) * 0.1})`;
        // Background color logic: Dark stormy blue/black
        // When lightning strikes, the opacity of the "clearing" rectangle changes or we overlay white

        // Base clear
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#0f172a'; // Zinc-900 like color base
        ctx.fillRect(0, 0, width, height);

        // Lightning Flash overlay
        if (lightningIntensity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${lightningIntensity * 0.3})`;
            ctx.fillRect(0, 0, width, height);
        }

        // Update and draw rain
        raindrops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        updateLightning();
        requestAnimationFrame(animate);
    }

    animate();
});
