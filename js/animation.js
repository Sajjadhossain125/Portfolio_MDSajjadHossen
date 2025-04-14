 // Initialize when DOM is loaded
 document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      // Load Three.js dynamically if not available
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        initThreeJsBackground();
        initSkillsCube();
        setTimeout(() => {
          animateElements();
        }, 500);
      };
      document.head.appendChild(script);
    } else {
      initThreeJsBackground();
      initSkillsCube();
      setTimeout(() => {
        animateElements();
      }, 500);
    }
  });
  
  // Animate language circles and skill bars
  function animateElements() {
    // Animate language percentages
    const languagePercents = document.querySelectorAll('.language-percent');
    languagePercents.forEach(element => {
      animateCounter(element, parseInt(element.getAttribute('data-value')));
    });
    
    // Animate language circles
    const languageCircles = document.querySelectorAll('.language-circle-progress');
    languageCircles.forEach(circle => {
      const value = parseInt(circle.getAttribute('data-value'));
      const circumference = 2 * Math.PI * 54; // 2πr where r=54
      const dashoffset = circumference * (1 - value / 100);
      
      // Set initial values
      circle.style.strokeDasharray = circumference;
      
      // Trigger animation after a small delay
      setTimeout(() => {
        circle.style.strokeDashoffset = dashoffset;
      }, 200);
    });
    
    // Animate skill percentages
    const skillPercents = document.querySelectorAll('.skill-percent');
    skillPercents.forEach(element => {
      animateCounter(element, parseInt(element.getAttribute('data-value')));
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
      const value = bar.getAttribute('data-value');
      setTimeout(() => {
        bar.style.width = value + '%';
      }, 300 * index);
    });
  }
  
  // Animate counter from 0 to target value
  function animateCounter(element, targetValue) {
    let currentValue = 0;
    const duration = 1500; // milliseconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const valueIncrement = targetValue / totalFrames;
    
    const timer = setInterval(() => {
      currentValue += valueIncrement;
      element.textContent = Math.floor(currentValue) + '%';
      
      if (currentValue >= targetValue) {
        element.textContent = targetValue + '%';
        clearInterval(timer);
      }
    }, frameDuration);
  }
  
  // Three.js Background Animation
  function initThreeJsBackground() {
    const canvas = document.getElementById('hero-background');
    if (!canvas) return;
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 100;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Scale
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Yellow particles material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      color: new THREE.Color('#FFD700'),
      transparent: true,
      opacity: 0.4
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    
    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particles.rotation.x = elapsedTime * 0.03;
      particles.rotation.y = elapsedTime * 0.02;
      
      // Move camera slightly with mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.01;
      
      renderer.render(scene, camera);
    }
    
    animate();
  }
  
  // Initialize the 3D rotating skills cube
  function initSkillsCube() {
    const container = document.getElementById('skills-cube-container');
    if (!container || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create cube with skills on faces
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    
    // Create materials for each face with skills
    const skills = [
      "Python", "ERPNext", "Django", 
      "Flutter", "SQL", "Git"
    ];
    
    const materials = skills.map(skill => {
      return new THREE.MeshBasicMaterial({
        map: createTextTexture(skill, '#222222', '#FFD700'),
        transparent: true,
        opacity: 0.9
      });
    });
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
  
  // Create texture with text for cube faces
  function createTextTexture(text, bgColor, textColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    const context = canvas.getContext('2d');
    
    // Background
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    context.strokeStyle = textColor;
    context.lineWidth = 8;
    context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
    
    // Text
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = textColor;
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }