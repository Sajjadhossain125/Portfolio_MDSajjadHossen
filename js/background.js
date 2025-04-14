// Three.js Background Animation
function initThreeJsBackground() {
    const canvas = document.getElementById('background-canvas');
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
    const particlesCount = 1500;
    
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
      size: 0.3,
      sizeAttenuation: true,
      color: new THREE.Color('#FFD700'),
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create floating lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.2
    });
    
    const linesCount = 20;
    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePoints = [];
      
      const radius = 20 + Math.random() * 10;
      const segments = 50;
      
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        linePoints.push(
          new THREE.Vector3(
            Math.cos(theta) * radius,
            Math.sin(theta) * radius,
            (Math.random() - 0.5) * 20
          )
        );
      }
      
      lineGeometry.setFromPoints(linePoints);
      const line = new THREE.Line(lineGeometry, linesMaterial);
      line.userData = {
        rotationSpeed: (Math.random() - 0.5) * 0.001,
        rotationAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize()
      };
      
      scene.add(line);
    }
    
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
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.03;
      
      // Move camera slightly with mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.01;
      
      // Rotate lines
      scene.children.forEach(child => {
        if (child instanceof THREE.Line) {
          const axis = child.userData.rotationAxis;
          const speed = child.userData.rotationSpeed;
          child.rotateOnAxis(axis, speed);
        }
      });
      
      renderer.render(scene, camera);
    }
    
    animate();
  }
  
  // Initialize interactive elements
  function initInteractions() {
    // Make skill items interactive
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#FCD34D';
        item.style.color = '#1F1F23';
      });
      
      item.addEventListener('mouseleave', () => {
        if (item.textContent !== 'Ubuntu') {
          item.style.backgroundColor = '#2A2A2E';
          item.style.color = 'white';
        }
      });
    });
    
    // Add scroll animations
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY > sectionTop - 600) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    });
    
    // Initialize sections with opacity 0
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger scroll once to initialize visible sections
    window.dispatchEvent(new Event('scroll'));
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initThreeJsBackground();
    initInteractions();
  });