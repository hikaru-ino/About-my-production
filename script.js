const typingTarget = document.querySelector(".typing-text");

if (typingTarget) {
  const text = typingTarget.dataset.text || typingTarget.textContent.trim();
  const speed = 42;
  let index = 0;

  typingTarget.textContent = "";
  typingTarget.classList.add("is-typing");

  const typeNextCharacter = () => {
    typingTarget.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(typeNextCharacter, speed);
      return;
    }

    typingTarget.classList.remove("is-typing");
    typingTarget.classList.add("is-complete");
  };

  window.setTimeout(typeNextCharacter, 450);
}

const particleSketch = (p) => {
  const particles = [];
  const connectionDistance = 135;
  const palette = [
    [72, 240, 182],
    [255, 110, 199],
    [255, 212, 71],
    [185, 183, 217],
  ];

  class Particle {
    constructor() {
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p5.Vector.random2D().mult(p.random(0.35, 1.1));
      this.size = p.random(3, 7);
      this.color = p.random(palette);
    }

    update() {
      this.position.add(this.velocity);

      if (this.position.x < 0 || this.position.x > p.width) {
        this.velocity.x *= -1;
      }

      if (this.position.y < 0 || this.position.y > p.height) {
        this.velocity.y *= -1;
      }

      this.position.x = p.constrain(this.position.x, 0, p.width);
      this.position.y = p.constrain(this.position.y, 0, p.height);
    }

    draw() {
      p.noStroke();
      p.fill(this.color[0], this.color[1], this.color[2], 220);
      const pixelSize = Math.round(this.size);
      p.rect(
        Math.round(this.position.x),
        Math.round(this.position.y),
        pixelSize,
        pixelSize
      );
    }
  }

  const setParticleCount = () => {
    const targetCount = p.constrain(Math.floor((p.width * p.height) / 18000), 32, 90);

    while (particles.length < targetCount) {
      particles.push(new Particle());
    }

    while (particles.length > targetCount) {
      particles.pop();
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("particle-canvas");
    p.pixelDensity(1);
    setParticleCount();
  };

  p.draw = () => {
    p.clear();

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      particle.update();

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = p.dist(
          particle.position.x,
          particle.position.y,
          other.position.x,
          other.position.y
        );

        if (distance < connectionDistance) {
          const alpha = p.map(distance, 0, connectionDistance, 140, 0);
          p.stroke(255, 243, 176, alpha);
          p.strokeWeight(1);
          p.line(
            Math.round(particle.position.x),
            Math.round(particle.position.y),
            Math.round(other.position.x),
            Math.round(other.position.y)
          );
        }
      }

      particle.draw();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    setParticleCount();
  };
};

if (window.p5) {
  new p5(particleSketch);
}
