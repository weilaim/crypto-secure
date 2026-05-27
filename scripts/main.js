/**
 * CryptoSecure - 主脚本
 * 负责 Three.js 背景初始化和 Chart.js 图表
 */

// Three.js 粒子背景
function initThreeBackground() {
    const canvas = document.getElementById('three-bg');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 25;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x00D4FF,
        transparent: true,
        opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 浮动线框八面体
    const octaGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const octaMaterial = new THREE.MeshBasicMaterial({
        color: 0x7C3AED,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const octa = new THREE.Mesh(octaGeometry, octaMaterial);
    octa.position.set(2.5, 0.5, -3);
    scene.add(octa);

    const octa2Geometry = new THREE.IcosahedronGeometry(0.8, 1);
    const octa2Material = new THREE.MeshBasicMaterial({
        color: 0x00D4FF,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const octa2 = new THREE.Mesh(octa2Geometry, octa2Material);
    octa2.position.set(-3, -1, -2);
    scene.add(octa2);

    camera.position.z = 6;

    // 鼠标视差
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        octa.rotation.y += 0.003;
        octa.rotation.x += 0.002;
        octa2.rotation.y -= 0.002;
        octa2.rotation.z += 0.001;

        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // 窗口调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Chart.js 价格图表
function initPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    // 生成模拟数据
    const labels = [];
    const data = [];
    let price = 65000;
    for (let i = 0; i < 30; i++) {
        labels.push('');
        price += (Math.random() - 0.45) * 1500;
        data.push(price);
    }

    const gradientFill = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
    gradientFill.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
    gradientFill.addColorStop(1, 'rgba(0, 212, 255, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: '#00D4FF',
                backgroundColor: gradientFill,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#00D4FF',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(10, 15, 28, 0.9)',
                    titleColor: '#F8FAFC',
                    bodyColor: '#94A3B8',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: () => '',
                        label: (context) => '$' + context.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                x: { display: false },
                y: {
                    display: false,
                    beginAtZero: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// 图表 tab 切换
function initChartTabs() {
    const tabs = document.querySelectorAll('.chart-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 数字滚动动画
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target) || 0;
                const suffix = el.dataset.suffix || '';
                // 简化动画逻辑
                el.style.opacity = 1;
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    initPriceChart();
    initChartTabs();
    animateCounters();
});