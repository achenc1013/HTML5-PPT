document.addEventListener('DOMContentLoaded', function() {
    initCodeFlowBackground();
    initFloatingElements();
    initTypingEffect();
    initParticleEffects();
    initCyberTrail();
});

// 代码流动背景效果
function initCodeFlowBackground() {
    const codeFlowContainer = document.querySelector('.matrix-code-rain');
    
    // 如果没有容器则创建
    if (!codeFlowContainer) {
        const container = document.createElement('div');
        container.className = 'matrix-code-rain';
        container.id = 'codeRain';
        document.body.appendChild(container);
    } else {
        // 清空容器
        codeFlowContainer.innerHTML = '';
    }
    
    // 创建代码列
    for (let i = 0; i < 50; i++) {
        createCodeColumn(codeFlowContainer);
    }
}

// 创建单个代码列
function createCodeColumn(container) {
    const column = document.createElement('div');
    column.className = 'code-column';
    
    // 随机代码内容
    const codeLength = Math.floor(Math.random() * 30) + 20;
    let codeContent = '';
    
    for (let i = 0; i < codeLength; i++) {
        const randomChar = getRandomCodeChar();
        codeContent += `<span class="code-char" style="animation-delay: ${Math.random() * 5}s">${randomChar}</span>`;
    }
    
    column.innerHTML = codeContent;
    
    // 随机位置和动画
    const leftPos = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    column.style.left = `${leftPos}%`;
    column.style.animationDuration = `${duration}s`;
    column.style.animationDelay = `${delay}s`;
    
    container.appendChild(column);
}

// 获取随机代码字符
function getRandomCodeChar() {
    const codeChars = '01{}[]()<>/*-+!&|~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return codeChars.charAt(Math.floor(Math.random() * codeChars.length));
}

// 初始化浮动元素
function initFloatingElements() {
    // 创建技术图标浮动元素
    const techIcons = [
        'html5', 'css3', 'js', 'vue', 'react', 'node',
        'db', 'cloud', 'security', 'network', 'ai', 'iot'
    ];
    
    const containers = document.querySelectorAll('.tech-background');
    
    containers.forEach(container => {
        // 为每个容器创建6-10个随机技术图标
        const numIcons = Math.floor(Math.random() * 5) + 6;
        
        for (let i = 0; i < numIcons; i++) {
            const icon = document.createElement('div');
            const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
            
            icon.className = `floating-tech tech-${randomIcon}`;
            icon.innerHTML = `<i class="tech-icon ${randomIcon}"></i>`;
            
            // 随机位置
            const posX = Math.random() * 80 + 10;
            const posY = Math.random() * 80 + 10;
            
            // 随机大小
            const size = Math.random() * 30 + 20;
            
            // 随机动画参数
            const duration = Math.random() * 30 + 20;
            const delay = Math.random() * 10;
            
            icon.style.left = `${posX}%`;
            icon.style.top = `${posY}%`;
            icon.style.width = `${size}px`;
            icon.style.height = `${size}px`;
            icon.style.animationDuration = `${duration}s`;
            icon.style.animationDelay = `${delay}s`;
            
            container.appendChild(icon);
        }
    });
}

// 打字效果
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        
        let index = 0;
        const typingSpeed = parseInt(element.getAttribute('data-speed')) || 50;
        
        function typeNextChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // 添加光标闪烁效果
                element.classList.add('typing-done');
                
                // 如果需要重复打字效果
                if (element.hasAttribute('data-repeat')) {
                    setTimeout(() => {
                        element.textContent = '';
                        index = 0;
                        typeNextChar();
                    }, 2000);
                }
            }
        }
        
        // 延迟开始
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        setTimeout(typeNextChar, delay);
    });
}

// 粒子效果
function initParticleEffects() {
    const containers = document.querySelectorAll('.particle-container');
    
    containers.forEach(container => {
        // 创建20-40个粒子
        const numParticles = Math.floor(Math.random() * 20) + 20;
        
        for (let i = 0; i < numParticles; i++) {
            createParticle(container);
        }
    });
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机大小
    const size = Math.random() * 6 + 2;
    
    // 随机颜色
    const colors = ['rgba(0, 255, 255, ', 'rgba(0, 191, 255, ', 'rgba(0, 128, 255, ', 'rgba(0, 255, 217, '];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.5 + 0.3;
    
    // 随机位置
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // 随机动画参数
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = `${randomColor}${opacity})`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    
    // 动画结束后重新创建
    particle.addEventListener('animationend', () => {
        container.removeChild(particle);
        createParticle(container);
    });
}

// 赛博朋克鼠标拖尾效果
function initCyberTrail() {
    // 创建拖尾容器
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cyber-trail-container';
    document.body.appendChild(trailContainer);
    
    // 鼠标跟踪数组
    const trail = [];
    const trailLength = 20; // 拖尾长度
    let mouseX = 0;
    let mouseY = 0;
    let isClicking = false;
    
    // 存储所有创建的粒子元素，用于清理
    const allParticles = [];
    
    // 定期清理超时的粒子
    setInterval(() => {
        const now = Date.now();
        while (allParticles.length > 0 && allParticles[0].expireTime < now) {
            const particle = allParticles.shift();
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        }
    }, 1000);
    
    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 移动时偶尔创建额外粒子
        if (Math.random() < 0.1) {
            // 只在有效区域内创建闪光粒子，避开边缘
            if (mouseX > 50 && mouseX < window.innerWidth - 50 && 
                mouseY > 50 && mouseY < window.innerHeight - 50) {
                createTrailSparkle(mouseX, mouseY);
            }
        }
    });
    
    // 鼠标点击事件 - 创建爆炸效果
    document.addEventListener('mousedown', (e) => {
        isClicking = true;
        // 只在有效区域内创建爆炸效果，避开边缘
        if (e.clientX > 50 && e.clientX < window.innerWidth - 50 && 
            e.clientY > 50 && e.clientY < window.innerHeight - 50) {
            createClickBurst(e.clientX, e.clientY);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isClicking = false;
    });
    
    // 创建初始拖尾粒子
    for (let i = 0; i < trailLength; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-trail-particle';
        particle.style.opacity = '0'; // 初始不可见
        trailContainer.appendChild(particle);
        trail.push({
            element: particle,
            x: 0,
            y: 0,
        });
    }
    
    // 更新拖尾位置
    function updateTrail() {
        // 更新第一个粒子到鼠标位置
        trail[0].x = mouseX;
        trail[0].y = mouseY;
        
        // 更新其他粒子，跟随前一个粒子
        for (let i = 1; i < trail.length; i++) {
            const dx = trail[i-1].x - trail[i].x;
            const dy = trail[i-1].y - trail[i].y;
            
            // 点击时粒子加速移动
            const speedFactor = isClicking ? 0.35 : 0.2;
            
            trail[i].x += dx * speedFactor;
            trail[i].y += dy * speedFactor;
            
            // 设置粒子位置
            const particle = trail[i].element;
            
            // 只有鼠标移动后才显示粒子
            if (mouseX > 0 || mouseY > 0) {
                particle.style.opacity = '1';
                particle.style.left = trail[i].x + 'px';
                particle.style.top = trail[i].y + 'px';
                
                // 根据距离调整大小和透明度
                const scale = 1 - (i / trail.length) * 0.8;
                const opacity = 1 - (i / trail.length) * 0.9;
                
                particle.style.transform = `scale(${scale})`;
                particle.style.opacity = opacity;
            }
        }
        
        requestAnimationFrame(updateTrail);
    }
    
    // 创建闪光粒子
    function createTrailSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cyber-trail-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // 随机位置偏移
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        
        // 随机大小
        const size = 3 + Math.random() * 6;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        trailContainer.appendChild(sparkle);
        
        // 记录这个粒子和它的过期时间
        allParticles.push({
            element: sparkle,
            expireTime: Date.now() + 1000
        });
        
        // 动画
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0)`;
                sparkle.style.opacity = 0;
            }
        }, 10);
        
        // 移除元素
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // 鼠标点击爆炸效果
    function createClickBurst(x, y) {
        const burstCount = 15;
        
        for (let i = 0; i < burstCount; i++) {
            const burst = document.createElement('div');
            burst.className = 'cyber-trail-burst';
            burst.style.left = x + 'px';
            burst.style.top = y + 'px';
            
            // 随机角度和距离
            const angle = (Math.PI * 2) * (i / burstCount);
            const distance = 30 + Math.random() * 70;
            const speedX = Math.cos(angle) * distance;
            const speedY = Math.sin(angle) * distance;
            
            // 随机大小
            const size = 5 + Math.random() * 10;
            burst.style.width = size + 'px';
            burst.style.height = size + 'px';
            
            trailContainer.appendChild(burst);
            
            // 记录这个粒子和它的过期时间
            allParticles.push({
                element: burst,
                expireTime: Date.now() + 1000
            });
            
            // 动画
            setTimeout(() => {
                if (burst.parentNode) {
                    burst.style.transform = `translate(${speedX}px, ${speedY}px) scale(0)`;
                    burst.style.opacity = 0;
                }
            }, 10);
            
            // 移除元素
            setTimeout(() => {
                if (burst.parentNode) {
                    burst.parentNode.removeChild(burst);
                }
            }, 1000);
        }
    }
    
    // 开始动画
    updateTrail();
    
    // 页面可见性变化时清理所有粒子
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 清理所有粒子
            allParticles.forEach(particle => {
                if (particle.element && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            });
            allParticles.length = 0;
            
            // 重置拖尾位置
            for (let i = 0; i < trail.length; i++) {
                trail[i].x = 0;
                trail[i].y = 0;
                const particle = trail[i].element;
                particle.style.opacity = '0';
            }
        }
    });
}

// 3D 图表效果初始化
function init3DCharts() {
    const chartContainers = document.querySelectorAll('.chart-3d');
    
    chartContainers.forEach(container => {
        const type = container.getAttribute('data-chart-type') || 'bar';
        const values = container.getAttribute('data-values').split(',').map(v => parseInt(v));
        
        switch(type) {
            case 'bar':
                create3DBarChart(container, values);
                break;
            case 'pie':
                create3DPieChart(container, values);
                break;
            default:
                create3DBarChart(container, values);
        }
    });
}

// 创建3D柱状图
function create3DBarChart(container, values) {
    const maxValue = Math.max(...values);
    const chart = document.createElement('div');
    chart.className = 'chart-bars';
    
    values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        
        const height = (value / maxValue) * 100;
        bar.style.height = `${height}%`;
        
        // 3D 效果
        const barFront = document.createElement('div');
        barFront.className = 'bar-front';
        
        const barTop = document.createElement('div');
        barTop.className = 'bar-top';
        
        const barSide = document.createElement('div');
        barSide.className = 'bar-side';
        
        // 随机色调（保持蓝绿色系）
        const hue = 180 + Math.random() * 40;
        barFront.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.7)`;
        barTop.style.backgroundColor = `hsla(${hue}, 100%, 60%, 0.7)`;
        barSide.style.backgroundColor = `hsla(${hue}, 100%, 40%, 0.7)`;
        
        bar.appendChild(barFront);
        bar.appendChild(barTop);
        bar.appendChild(barSide);
        
        // 添加数值标签
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = value;
        bar.appendChild(label);
        
        chart.appendChild(bar);
    });
    
    container.appendChild(chart);
}

// 创建3D饼图
function create3DPieChart(container, values) {
    const chart = document.createElement('div');
    chart.className = 'pie-chart';
    
    const total = values.reduce((acc, val) => acc + val, 0);
    let startAngle = 0;
    
    values.forEach((value, index) => {
        const slice = document.createElement('div');
        slice.className = 'pie-slice';
        
        const angle = (value / total) * 360;
        const endAngle = startAngle + angle;
        
        // 随机色调（保持蓝绿色系）
        const hue = 180 + Math.random() * 40;
        slice.style.background = `conic-gradient(hsla(${hue}, 100%, 50%, 0.7) ${startAngle}deg, hsla(${hue}, 100%, 50%, 0.7) ${endAngle}deg, transparent ${endAngle}deg)`;
        
        chart.appendChild(slice);
        
        startAngle = endAngle;
    });
    
    container.appendChild(chart);
} 