document.addEventListener('DOMContentLoaded', function() {
    // 全局变量
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isAnimating = false;
    
    // 导航按钮
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    // 进度指示器
    const progressBar = document.querySelector('.progress-bar');
    const progressIndicator = document.querySelector('.progress');
    const slideCounter = document.querySelector('.slide-counter');
    
    // 初始化
    function init() {
        // 设置初始幻灯片
        slides[0].classList.add('active');
        updateProgress();
        createProgressDots();
        
        // 添加事件监听器
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // 键盘导航
        document.addEventListener('keydown', handleKeyDown);
        
        // 初始化交互元素
        initInteractiveElements();
        
        // 启动背景动画
        initBackgroundAnimations();
        
        // 初始化按钮状态
        updateButtonState();
        
        // 更新计数器
        updateSlideCounter();
        
        // 初始化技能雷达图
        initSkillRadarChart();
        
        // 初始化贡献图表
        initContributionChart();
        
        // 初始化第5页的滚动功能
        initScrollFunctionality();
        
        // 初始化第7页的滚动功能
        initSlide7ScrollFunctionality();
        
        // 初始化时间轴插图
        initTimelineIllustrations();
    }
    
    // 更新幻灯片计数器
    function updateSlideCounter() {
        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
        }
    }
    
    // 下一张幻灯片
    function nextSlide() {
        if (isAnimating || currentSlide >= totalSlides - 1) return;
        
        isAnimating = true;
        slides[currentSlide].classList.add('slide-out-left');
        slides[currentSlide].classList.remove('active');
        
        currentSlide++;
        slides[currentSlide].classList.add('active', 'slide-in-right');
        
        setTimeout(() => {
            slides[currentSlide - 1].classList.remove('slide-out-left');
            slides[currentSlide].classList.remove('slide-in-right');
            isAnimating = false;
            updateProgress();
            updateButtonState();
            updateSlideCounter();
        }, 800);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        if (isAnimating || currentSlide <= 0) return;
        
        isAnimating = true;
        slides[currentSlide].classList.add('slide-out-right');
        slides[currentSlide].classList.remove('active');
        
        currentSlide--;
        slides[currentSlide].classList.add('active', 'slide-in-left');
        
        setTimeout(() => {
            slides[currentSlide + 1].classList.remove('slide-out-right');
            slides[currentSlide].classList.remove('slide-in-left');
            isAnimating = false;
            updateProgress();
            updateButtonState();
            updateSlideCounter();
        }, 800);
    }
    
    // 键盘导航
    function handleKeyDown(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    }
    
    // 更新进度条
    function updateProgress() {
        if (progressIndicator) {
            const progress = (currentSlide / (totalSlides - 1)) * 100;
            progressIndicator.style.width = `${progress}%`;
        }
        
        // 更新点状指示器
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index <= currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 创建进度点
    function createProgressDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'progress-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === 0) dot.classList.add('active');
            
            // 添加点击事件
            dot.addEventListener('click', () => {
                if (isAnimating) return;
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        const progressContainer = document.querySelector('.progress-bar');
        if (progressContainer) {
            progressContainer.appendChild(dotsContainer);
        }
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        if (index === currentSlide) return;
        
        isAnimating = true;
        const direction = index > currentSlide ? 'next' : 'prev';
        
        slides[currentSlide].classList.remove('active');
        
        if (direction === 'next') {
            slides[currentSlide].classList.add('slide-out-left');
            slides[index].classList.add('active', 'slide-in-right');
        } else {
            slides[currentSlide].classList.add('slide-out-right');
            slides[index].classList.add('active', 'slide-in-left');
        }
        
        setTimeout(() => {
            slides[currentSlide].classList.remove('slide-out-left', 'slide-out-right');
            slides[index].classList.remove('slide-in-left', 'slide-in-right');
            currentSlide = index;
            isAnimating = false;
            updateProgress();
            updateButtonState();
            updateSlideCounter();
        }, 800);
    }
    
    // 更新按钮状态
    function updateButtonState() {
        // 首页禁用上一页按钮
        if (prevBtn) {
            if (currentSlide === 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }
        }
        
        // 最后一页禁用下一页按钮
        if (nextBtn) {
            if (currentSlide === totalSlides - 1) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        }
    }
    
    // 初始化交互元素
    function initInteractiveElements() {
        // 目录项点击事件
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            const targetSlide = parseInt(item.getAttribute('data-slide'));
            if (!isNaN(targetSlide)) {
                item.addEventListener('click', () => {
                    goToSlide(targetSlide - 1); // 转换为0基索引
                });
            }
            
            // 鼠标悬停效果
            const menuIcon = item.querySelector('.menu-item-icon');
            item.addEventListener('mouseenter', () => {
                if (menuIcon) menuIcon.classList.add('pulse');
            });
            
            item.addEventListener('mouseleave', () => {
                if (menuIcon) menuIcon.classList.remove('pulse');
            });
        });
        
        // 为成就项添加悬停效果
        const achievementItems = document.querySelectorAll('.achievement-item');
        achievementItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hovered');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('hovered');
            });
        });
        
        // 为标签添加点击效果
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
            });
        });
    }
    
    // 背景动画初始化
    function initBackgroundAnimations() {
        // 数据粒子随机移动
        animateDataParticles();
        
        // 浮动技术元素随机移动
        animateTechElements();
        
        // 确保代码雨背景已经初始化
        if (typeof initCodeFlowBackground === 'function') {
            initCodeFlowBackground();
        }
    }
    
    // 数据粒子动画
    function animateDataParticles() {
        const particles = document.querySelectorAll('.data-particle');
        
        particles.forEach(particle => {
            // 随机初始位置
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            // 设置初始位置
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;
            
            // 随机动画持续时间
            const duration = 10 + Math.random() * 20;
            particle.style.animationDuration = `${duration}s`;
            
            // 随机延迟
            const delay = Math.random() * 10;
            particle.style.animationDelay = `${delay}s`;
        });
    }
    
    // 浮动技术元素动画
    function animateTechElements() {
        const techElements = document.querySelectorAll('.floating-tech');
        
        techElements.forEach(element => {
            // 随机初始位置
            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 80 + 10;
            
            // 设置初始位置
            element.style.left = `${startX}%`;
            element.style.top = `${startY}%`;
            
            // 随机动画持续时间
            const duration = 20 + Math.random() * 30;
            element.style.animationDuration = `${duration}s`;
            
            // 随机延迟
            const delay = Math.random() * 15;
            element.style.animationDelay = `${delay}s`;
            
            // 随机旋转
            const rotate = Math.random() * 360;
            element.style.transform = `rotate(${rotate}deg)`;
        });
    }
    
    // 初始化技能雷达图
    function initSkillRadarChart() {
        const skillRadarCanvas = document.getElementById('skillRadar');
        
        if (skillRadarCanvas) {
            const ctx = skillRadarCanvas.getContext('2d');
            
            // 定义雷达图数据
            const skillData = {
                labels: ['渗透测试', '代码审计', '安全运维', '漏洞挖掘', '安全开发', '网页设计', '云计算'],
                datasets: [{
                    label: '技能熟练度',
                    data: [90, 85, 75, 80, 70, 85, 65],
                    backgroundColor: 'rgba(0, 255, 200, 0.2)',
                    borderColor: 'rgba(0, 255, 200, 1)',
                    pointBackgroundColor: 'rgba(0, 255, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 255, 200, 1)'
                }]
            };
            
            // 配置选项
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 255, 200, 0.3)'
                        },
                        grid: {
                            color: 'rgba(0, 255, 200, 0.3)'
                        },
                        pointLabels: {
                            color: 'rgba(0, 255, 200, 1)',
                            font: {
                                size: 14,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'rgba(0, 255, 200, 0.7)',
                            font: {
                                size: 10
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            };
            
            // 创建雷达图
            new Chart(ctx, {
                type: 'radar',
                data: skillData,
                options: chartOptions
            });
        }
    }
    
    // 初始化贡献图表
    function initContributionChart() {
        const contributionCanvas = document.getElementById('contributionChart');
        
        if (contributionCanvas) {
            const ctx = contributionCanvas.getContext('2d');
            
            // 定义贡献图表数据
            const contributionData = {
                labels: ['修复PR', '新功能PR', 'Bug报告', 'CVE申请'],
                datasets: [{
                    label: '贡献数量',
                    data: [3, 1, 5, 2],
                    backgroundColor: [
                        'rgba(0, 255, 200, 0.7)',
                        'rgba(255, 0, 255, 0.7)',
                        'rgba(0, 255, 0, 0.7)',
                        'rgba(255, 255, 0, 0.7)'
                    ],
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    borderWidth: 1
                }]
            };
            
            // 配置选项
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 255, 200, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(0, 255, 200, 0.7)',
                            font: {
                                size: 9
                            },
                            maxTicksLimit: 4
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 255, 200, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(0, 255, 200, 0.7)',
                            font: {
                                size: 9
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 20, 40, 0.8)',
                        titleColor: 'rgba(0, 255, 200, 1)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: 'rgba(0, 255, 200, 0.5)',
                        borderWidth: 1
                    }
                }
            };
            
            // 创建图表
            new Chart(ctx, {
                type: 'bar',
                data: contributionData,
                options: chartOptions
            });
        }
    }
    
    // 处理第5页的滚动功能
    function initScrollFunctionality() {
        // 获取第5页的容器
        const slide5 = document.getElementById('slide5');
        
        if (slide5) {
            const timelineContainer = slide5.querySelector('.timeline-container');
            
            if (timelineContainer) {
                // 创建粒子容器
                const particlesContainer = document.createElement('div');
                particlesContainer.className = 'scroll-particles-container';
                timelineContainer.appendChild(particlesContainer);
                
                // 当在第5页使用鼠标滚轮时，阻止事件冒泡，使其只在容器内滚动
                timelineContainer.addEventListener('wheel', function(e) {
                    // 检查是否已经到达滚动边界
                    const atTop = this.scrollTop === 0;
                    const atBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
                    
                    // 如果在边界，且用户继续向该方向滚动，则允许事件冒泡（可能触发页面切换）
                    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                        return;
                    }
                    
                    // 创建滚动粒子
                    createScrollParticles(e, particlesContainer);
                    
                    // 否则，阻止事件冒泡，保持在容器内滚动
                    e.stopPropagation();
                }, { passive: false });
                
                // 使用触摸事件处理移动设备上的滚动
                let touchStartY = 0;
                let lastTouchY = 0;
                
                timelineContainer.addEventListener('touchstart', function(e) {
                    touchStartY = e.touches[0].clientY;
                    lastTouchY = touchStartY;
                }, { passive: true });
                
                timelineContainer.addEventListener('touchmove', function(e) {
                    const touchY = e.touches[0].clientY;
                    const scrollUp = touchY > touchStartY;
                    const scrollDown = touchY < touchStartY;
                    const atTop = this.scrollTop === 0;
                    const atBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
                    
                    // 根据触摸移动创建粒子
                    if (Math.abs(touchY - lastTouchY) > 10) {
                        createScrollParticles({
                            clientX: e.touches[0].clientX,
                            clientY: e.touches[0].clientY,
                            deltaY: lastTouchY - touchY
                        }, particlesContainer);
                        lastTouchY = touchY;
                    }
                    
                    // 如果在边界，且用户继续向该方向滚动，则允许事件冒泡
                    if ((atTop && scrollUp) || (atBottom && scrollDown)) {
                        return;
                    }
                    
                    // 否则，阻止默认行为，保持在容器内滚动
                    e.stopPropagation();
                }, { passive: false });
            }
        }
    }
    
    // 处理第7页的滚动功能
    function initSlide7ScrollFunctionality() {
        // 获取第7页的容器
        const slide7 = document.getElementById('slide7');
        
        if (slide7) {
            const strategyContainer = slide7.querySelector('.strategy-container');
            
            if (strategyContainer) {
                // 创建粒子容器
                const particlesContainer = document.createElement('div');
                particlesContainer.className = 'scroll-particles-container';
                strategyContainer.appendChild(particlesContainer);
                
                // 当在第7页使用鼠标滚轮时，阻止事件冒泡，使其只在容器内滚动
                strategyContainer.addEventListener('wheel', function(e) {
                    // 检查是否已经到达滚动边界
                    const atTop = this.scrollTop === 0;
                    const atBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
                    
                    // 如果在边界，且用户继续向该方向滚动，则允许事件冒泡（可能触发页面切换）
                    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                        return;
                    }
                    
                    // 创建赛博风格的滚动粒子 - 第7页特殊效果
                    createCyberScrollParticles(e, particlesContainer);
                    
                    // 否则，阻止事件冒泡，保持在容器内滚动
                    e.stopPropagation();
                }, { passive: false });
                
                // 使用触摸事件处理移动设备上的滚动
                let touchStartY = 0;
                let lastTouchY = 0;
                
                strategyContainer.addEventListener('touchstart', function(e) {
                    touchStartY = e.touches[0].clientY;
                    lastTouchY = touchStartY;
                }, { passive: true });
                
                strategyContainer.addEventListener('touchmove', function(e) {
                    const touchY = e.touches[0].clientY;
                    const scrollUp = touchY > touchStartY;
                    const scrollDown = touchY < touchStartY;
                    const atTop = this.scrollTop === 0;
                    const atBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
                    
                    // 根据触摸移动创建粒子
                    if (Math.abs(touchY - lastTouchY) > 10) {
                        createCyberScrollParticles({
                            clientX: e.touches[0].clientX,
                            clientY: e.touches[0].clientY,
                            deltaY: lastTouchY - touchY
                        }, particlesContainer);
                        lastTouchY = touchY;
                    }
                    
                    // 如果在边界，且用户继续向该方向滚动，则允许事件冒泡
                    if ((atTop && scrollUp) || (atBottom && scrollDown)) {
                        return;
                    }
                    
                    // 否则，阻止默认行为，保持在容器内滚动
                    e.stopPropagation();
                }, { passive: false });
            }
        }
    }
    
    // 创建滚动粒子
    function createScrollParticles(event, container) {
        // 获取鼠标位置
        const x = event.clientX;
        const y = event.clientY;
        
        // 确定粒子数量（基于滚动速度）
        const particleCount = Math.min(Math.abs(Math.round(event.deltaY / 10)), 8);
        
        // 创建粒子
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'scroll-particle';
                
                // 随机大小
                const size = Math.random() * 15 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // 位置（在鼠标周围随机偏移）
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;
                particle.style.left = `${x + offsetX}px`;
                particle.style.top = `${y + offsetY}px`;
                
                // 随机颜色（渐变色调，保持绿色/青色主题）
                const hue = Math.random() * 40 + 160; // 160-200 范围的色相（青色到绿色）
                particle.style.background = `radial-gradient(circle at center, hsla(${hue}, 100%, 70%, 0.8), hsla(${hue}, 100%, 60%, 0))`;
                
                // 添加到容器
                container.appendChild(particle);
                
                // 动画结束后移除粒子
                setTimeout(() => {
                    if (particle.parentNode === container) {
                        container.removeChild(particle);
                    }
                }, 1500);
            }, i * 50); // 错开粒子生成时间
        }
    }
    
    // 创建赛博风格的滚动粒子
    function createCyberScrollParticles(event, container) {
        // 获取鼠标位置
        const x = event.clientX;
        const y = event.clientY;
        
        // 确定粒子数量（基于滚动速度）
        const particleCount = Math.min(Math.abs(Math.round(event.deltaY / 10)), 10);
        
        // 创建不同类型的粒子
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                // 随机选择粒子类型：圆形、方形、三角形、数字、符号等
                const particleTypes = ['circle', 'square', 'triangle', 'number', 'symbol'];
                const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
                
                const particle = document.createElement('div');
                particle.className = 'scroll-particle';
                
                // 随机大小，比第5页粒子稍大
                const size = Math.random() * 20 + 8;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // 位置（在鼠标周围随机偏移，范围更大）
                const offsetX = (Math.random() - 0.5) * 60;
                const offsetY = (Math.random() - 0.5) * 60;
                particle.style.left = `${x + offsetX}px`;
                particle.style.top = `${y + offsetY}px`;
                
                // 根据类型设置样式
                switch (type) {
                    case 'circle':
                        particle.style.borderRadius = '50%';
                        break;
                    case 'square':
                        particle.style.borderRadius = '0';
                        break;
                    case 'triangle':
                        particle.style.borderRadius = '0';
                        particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                        break;
                    case 'number':
                        particle.style.borderRadius = '0';
                        particle.style.color = 'rgba(0, 255, 200, 0.8)';
                        particle.style.fontSize = `${size}px`;
                        particle.style.fontFamily = 'monospace';
                        particle.style.lineHeight = '1';
                        particle.style.display = 'flex';
                        particle.style.alignItems = 'center';
                        particle.style.justifyContent = 'center';
                        particle.innerHTML = Math.floor(Math.random() * 10);
                        break;
                    case 'symbol':
                        particle.style.borderRadius = '0';
                        particle.style.color = 'rgba(0, 255, 200, 0.8)';
                        particle.style.fontSize = `${size}px`;
                        particle.style.fontFamily = 'monospace';
                        particle.style.lineHeight = '1';
                        particle.style.display = 'flex';
                        particle.style.alignItems = 'center';
                        particle.style.justifyContent = 'center';
                        const symbols = ['$', '#', '&', '*', '@', '%', '^', '<', '>', '{', '}'];
                        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                        break;
                }
                
                // 随机颜色（更多的色彩变化，包括紫色和粉色）
                const hues = [160, 180, 200, 280, 320]; // 青色、绿色、紫色、粉色
                const hue = hues[Math.floor(Math.random() * hues.length)];
                if (type === 'circle' || type === 'square' || type === 'triangle') {
                    particle.style.background = `radial-gradient(circle at center, hsla(${hue}, 100%, 70%, 0.8), hsla(${hue}, 100%, 60%, 0))`;
                    // 添加边框效果，增强赛博风格
                    particle.style.border = `1px solid hsla(${hue}, 100%, 70%, 0.8)`;
                    particle.style.boxShadow = `0 0 5px hsla(${hue}, 100%, 70%, 0.8)`;
                }
                
                // 添加随机旋转
                const rotation = Math.random() * 360;
                particle.style.transform = `rotate(${rotation}deg)`;
                
                // 随机动画持续时间
                const duration = 1 + Math.random() * 1;
                particle.style.animationDuration = `${duration}s`;
                
                // 添加到容器
                container.appendChild(particle);
                
                // 动画结束后移除粒子
                setTimeout(() => {
                    if (particle.parentNode === container) {
                        container.removeChild(particle);
                    }
                }, duration * 1000);
            }, i * 40); // 错开粒子生成时间
        }
    }
    
    // 初始化时间轴插图
    function initTimelineIllustrations() {
        const slide5 = document.getElementById('slide5');
        if (!slide5) return;
        
        const timelineItems = slide5.querySelectorAll('.timeline-item');
        
        // 为每个时间轴项目添加插图
        timelineItems.forEach((item, index) => {
            const illustration = document.createElement('div');
            illustration.className = 'timeline-illustration';
            
            // 根据索引决定插图类型
            if (index === 0) {
                illustration.classList.add('illustration-penetration');
            } else if (index === 1) {
                illustration.classList.add('illustration-development');
            } else if (index === 2) {
                illustration.classList.add('illustration-contribution');
            }
            
            // 添加到时间轴项目
            item.appendChild(illustration);
            
            // 添加鼠标悬停效果
            item.addEventListener('mouseenter', () => {
                illustration.style.animationPlayState = 'running';
                illustration.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 200, 0.8))';
            });
            
            item.addEventListener('mouseleave', () => {
                illustration.style.filter = 'drop-shadow(0 0 8px rgba(0, 255, 200, 0.5))';
            });
        });
    }
    
    // 启动幻灯片
    init();
}); 