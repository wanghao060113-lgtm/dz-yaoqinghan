(function() {
    'use strict';

    // ============================================
    // 雪花粒子效果（HTML元素方式）
    // ============================================
    var snowContainer = null;
    var snowflakes = [];
    var animationId = null;
    var isRunning = false;
    var particleCount = 50;

    function Snowflake(element) {
        this.element = element;
        this.reset();
    }

    Snowflake.prototype.reset = function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 100;
        this.size = 12 + Math.random() * 10;
        this.speed = 1 + Math.random() * 2;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.swing = 0.3 + Math.random() * 0.4;
        this.swingOffset = Math.random() * Math.PI * 2;
    };

    Snowflake.prototype.update = function() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.swingOffset += 0.01;
        this.x += Math.sin(this.y * 0.01 + this.swingOffset) * this.swing;

        if (this.y > window.innerHeight + 20) {
            this.reset();
            this.y = -20;
        }

        if (this.x < -20) {
            this.x = window.innerWidth + 20;
        } else if (this.x > window.innerWidth + 20) {
            this.x = -20;
        }

        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.fontSize = this.size + 'px';
        this.element.style.opacity = this.opacity;
        this.element.style.transform = 'rotate(' + this.rotation + 'deg)';
    };

    function initSnow() {
        snowContainer = document.getElementById('snow');
        if (!snowContainer) {
            return false;
        }

        function resizeSnow() {
            var width = window.innerWidth;
            
            if (width < 480) {
                particleCount = 30;
            } else if (width < 768) {
                particleCount = 40;
            } else {
                particleCount = 50;
            }
            
            if (snowflakes.length === 0) {
                createSnowflakes();
            }
        }
        
        resizeSnow();
        window.addEventListener('resize', resizeSnow);
        
        return true;
    }

    function createSnowflakes() {
        snowflakes = [];
        snowContainer.innerHTML = '';
        
        for (var i = 0; i < particleCount; i++) {
            var flakeElement = document.createElement('span');
            flakeElement.className = 'snowflake';
            flakeElement.textContent = '❄';
            snowContainer.appendChild(flakeElement);
            
            var flake = new Snowflake(flakeElement);
            flake.y = Math.random() * window.innerHeight;
            snowflakes.push(flake);
        }
    }

    function animate() {
        if (!isRunning || !snowContainer) {
            return;
        }

        for (var i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
        }

        animationId = requestAnimationFrame(animate);
    }

    function startSnow() {
        if (isRunning) {
            return;
        }

        if (!initSnow()) {
            return;
        }

        if (snowflakes.length === 0) {
            createSnowflakes();
        }

        isRunning = true;
        animate();
    }

    function stopSnow() {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (isRunning) {
                stopSnow();
            }
        } else {
            if (!isRunning && snowContainer) {
                startSnow();
            }
        }
    });

    // ============================================
    // 音乐播放管理
    // ============================================
    var bgmAudio = null;
    var isMusicInitialized = false;
    var isActivated = false;
    var musicButton = null;

    function createMusicButton() {
        if (musicButton) {
            return;
        }

        musicButton = document.createElement('button');
        musicButton.className = 'music-play-btn';
        musicButton.innerHTML = '🎵';
        musicButton.title = '点击暂停/播放音乐';
        musicButton.style.cssText = 'position: fixed; top: 1rem; right: 1rem; width: 44px; height: 44px; border-radius: 50%; background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(59, 130, 246, 0.2); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); z-index: 1000; cursor: pointer; font-size: 1.2rem; display: block; -webkit-tap-highlight-color: transparent;';
        
        musicButton.addEventListener('click', function(e) {
            if (!bgmAudio) {
                return;
            }
            
            // 阻止事件冒泡
            if (e) {
                e.stopPropagation();
            }
            
            if (bgmAudio.paused) {
                bgmAudio.play().then(function() {
                    musicButton.innerHTML = '🎵';
                    musicButton.title = '点击暂停音乐';
                }).catch(function() {
                    console.log('播放失败');
                });
            } else {
                bgmAudio.pause();
                musicButton.innerHTML = '🔇';
                musicButton.title = '点击播放音乐';
            }
        });
        
        // 监听播放状态变化，更新按钮图标
        bgmAudio.addEventListener('play', function() {
            if (musicButton) {
                musicButton.innerHTML = '🎵';
                musicButton.title = '点击暂停音乐';
            }
        });
        
        bgmAudio.addEventListener('pause', function() {
            if (musicButton) {
                musicButton.innerHTML = '🔇';
                musicButton.title = '点击播放音乐';
            }
        });

        document.body.appendChild(musicButton);
    }

    function initMusic() {
        if (isMusicInitialized) {
            return;
        }

        bgmAudio = document.getElementById('bgmAudio');
        if (!bgmAudio) {
            return;
        }

        isMusicInitialized = true;
        bgmAudio.volume = 0.6;
        
        // 只在第二页创建按钮
        if (document.querySelector('.page-invite')) {
            createMusicButton();
            
            // 直接检查 sessionStorage
            var activated = sessionStorage.getItem('musicActivated') === 'true';
            
            if (activated) {
                // 尝试播放的函数
                function tryPlay() {
                    if (!bgmAudio) return;
                    
                    bgmAudio.volume = 0.6;
                    var playPromise = bgmAudio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function() {
                            console.log('音乐播放成功');
                            if (musicButton) {
                                musicButton.innerHTML = '🎵';
                                musicButton.title = '点击暂停音乐';
                            }
                        }).catch(function(error) {
                            console.log('自动播放失败:', error);
                            if (musicButton) {
                                musicButton.innerHTML = '🔇';
                                musicButton.title = '点击播放音乐';
                            }
                        });
                    }
                }
                
                // 立即尝试播放（多次重试）
                tryPlay();
                setTimeout(tryPlay, 100);
                setTimeout(tryPlay, 300);
                setTimeout(tryPlay, 500);
                setTimeout(tryPlay, 800);
                setTimeout(tryPlay, 1000);
                
                // 监听音频加载事件
                bgmAudio.addEventListener('canplay', tryPlay, { once: true });
                bgmAudio.addEventListener('loadeddata', tryPlay, { once: true });
                
                // 页面可见时也尝试播放
                document.addEventListener('visibilitychange', function() {
                    if (!document.hidden && bgmAudio && bgmAudio.paused) {
                        tryPlay();
                    }
                });
            } else {
                // 未激活，按钮显示暂停状态
                if (musicButton) {
                    musicButton.innerHTML = '🔇';
                    musicButton.title = '点击播放音乐';
                }
            }
        }
    }

    function activateAndPlay() {
        isActivated = true;
        
        // 如果已经在第二页，直接播放
        if (document.querySelector('.page-invite')) {
            bgmAudio = document.getElementById('bgmAudio');
            if (bgmAudio) {
                bgmAudio.volume = 0.6;
                bgmAudio.play().catch(function() {
                    console.log('播放失败');
                });
            }
        }
    }

    // 导出全局函数供第一页调用
    window.BGMAudioManager = {
        activateAndPlay: activateAndPlay
    };

    // ============================================
    // 初始化
    // ============================================
    function init() {
        startSnow();
        
        if (document.querySelector('.page-invite')) {
            initMusic();
            
            // 如果已激活，立即尝试播放（不等待 initMusic 完成）
            var activated = sessionStorage.getItem('musicActivated') === 'true';
            if (activated) {
                setTimeout(function() {
                    var bgmAudio = document.getElementById('bgmAudio');
                    if (bgmAudio) {
                        bgmAudio.volume = 0.6;
                        bgmAudio.play().then(function() {
                            console.log('init中播放成功');
                        }).catch(function(error) {
                            console.log('init中播放失败:', error);
                        });
                    }
                }, 50);
            }
        }
    }

    // 立即执行，不等待 DOMContentLoaded
    if (document.querySelector('.page-invite')) {
        var activated = sessionStorage.getItem('musicActivated') === 'true';
        if (activated) {
            // 立即尝试播放
            setTimeout(function() {
                var bgmAudio = document.getElementById('bgmAudio');
                if (bgmAudio) {
                    bgmAudio.volume = 0.6;
                    bgmAudio.play().catch(function() {});
                }
            }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.startSnow = startSnow;

    // ============================================
    // 页面切换系统
    // ============================================
    var currentPage = 1;

    function goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > 5) {
            return;
        }

        var currentPageEl = document.querySelector('.page.active');
        var targetPageEl = document.getElementById('page' + pageNumber);

        if (!targetPageEl) {
            return;
        }

        // 如果目标页就是当前页，不执行切换
        if (currentPageEl && currentPageEl.id === 'page' + pageNumber) {
            return;
        }

        // 淡出当前页
        if (currentPageEl) {
            currentPageEl.style.opacity = '0';
            setTimeout(function() {
                currentPageEl.classList.remove('active');
                currentPageEl.style.display = 'none';
            }, 300);
        } else {
            // 如果没有当前页，直接隐藏所有页
            var allPages = document.querySelectorAll('.page');
            for (var i = 0; i < allPages.length; i++) {
                allPages[i].classList.remove('active');
                allPages[i].style.display = 'none';
            }
        }

        // 显示目标页
        setTimeout(function() {
            targetPageEl.style.display = 'flex';
            targetPageEl.style.opacity = '0';
            setTimeout(function() {
                targetPageEl.classList.add('active');
                targetPageEl.style.opacity = '1';
            }, 50);
        }, 300);

        // 更新body类名以匹配页面背景
        var mainBody = document.getElementById('mainBody');
        if (mainBody) {
            if (pageNumber === 1) {
                mainBody.className = 'page-index';
            } else {
                mainBody.className = '';
            }
        }

        currentPage = pageNumber;
        updateProgressDots(pageNumber);
        updateNavigationButtons(pageNumber);

        // 初始化音乐（从第2页开始）
        if (pageNumber >= 2) {
            initMusic();
        }
    }

    function updateProgressDots(pageNumber) {
        var dots = document.querySelectorAll('.dot');
        var progressText = document.querySelector('.progress-text');

        for (var i = 0; i < dots.length; i++) {
            if (i + 1 === pageNumber) {
                dots[i].classList.add('active');
            } else {
                dots[i].classList.remove('active');
            }
        }

        if (progressText) {
            progressText.textContent = pageNumber + ' / 5';
        }
    }

    function updateNavigationButtons(pageNumber) {
        // 可以根据需要更新导航按钮状态
        // 这里暂时不需要特殊处理
    }

    // ============================================
    // 标签页切换系统
    // ============================================
    function switchTab(tabName) {
        // 更新标签头部
        var headers = document.querySelectorAll('.tab-header');
        for (var i = 0; i < headers.length; i++) {
            if (headers[i].getAttribute('data-tab') === tabName) {
                headers[i].classList.add('active');
            } else {
                headers[i].classList.remove('active');
            }
        }

        // 更新标签内容
        var contents = document.querySelectorAll('.tab-content');
        for (var j = 0; j < contents.length; j++) {
            if (contents[j].id === tabName) {
                contents[j].classList.add('active');
            } else {
                contents[j].classList.remove('active');
            }
        }
    }

    // ============================================
    // 表演人员详情弹窗系统
    // ============================================
    var programData = {
        'miracle': {
            title: '《奇迹启航·家有青春》',
            type: '跨界舞蹈盛宴',
            count: '待定',
            cast: ['名单待定，敬请期待']
        },
        'choir': {
            title: '合唱《夜空中最亮的星》',
            type: '大合唱',
            count: '待定',
            cast: ['名单待定，敬请期待']
        },
        'cheerleading': {
            title: '啦啦操《星芒跃动》',
            type: '啦啦操',
            count: '待定',
            cast: ['名单待定，敬请期待']
        },
        'dubbing': {
            title: '配音《大学生生存图鉴》',
            type: '配音表演',
            count: '待定',
            cast: ['名单待定，敬请期待']
        }
    };

    function showCastDetail(programId) {
        var data = programData[programId];
        if (!data) {
            return;
        }

        var modal = document.getElementById('castModal');
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');

        if (!modal || !modalTitle || !modalBody) {
            return;
        }

        modalTitle.textContent = data.title;
        modalBody.innerHTML = '<p style="margin-bottom: 1rem; color: #64748b;"><strong>节目类型：</strong>' + data.type + '</p>' +
                              '<p style="margin-bottom: 1rem; color: #64748b;"><strong>参演人数：</strong>' + data.count + '</p>' +
                              '<h4 style="margin: 1.5rem 0 1rem; color: #1e3a8a; font-size: 1.1rem;">参演人员：</h4>' +
                              '<div class="cast-list">';

        for (var i = 0; i < data.cast.length; i++) {
            modalBody.innerHTML += '<div class="cast-item">' + data.cast[i] + '</div>';
        }

        modalBody.innerHTML += '</div>';
        modal.style.display = 'flex';
    }

    function closeCastModal() {
        var modal = document.getElementById('castModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        var modal = document.getElementById('castModal');
        if (modal && event.target === modal) {
            closeCastModal();
        }
    });

    // ============================================
    // 照片画廊系统
    // ============================================
    var photoGalleryData = {
        'opening': {
            title: '开场舞《Talk that talk》排练照片',
            photos: []
        },
        'chorus': {
            title: '小合唱《青春纪念册》排练照片',
            photos: []
        },
        'cheerleading': {
            title: '啦啦操《青春飞扬》排练照片',
            photos: []
        }
    };

    function showPhotoGallery(programType) {
        var data = photoGalleryData[programType];
        if (!data) {
            return;
        }

        var modal = document.getElementById('photoModal');
        var modalTitle = document.getElementById('photoModalTitle');
        var modalBody = document.getElementById('photoModalBody');

        if (!modal || !modalTitle || !modalBody) {
            return;
        }

        modalTitle.textContent = data.title;
        modalBody.innerHTML = '';

        if (data.photos.length === 0) {
            modalBody.innerHTML = '<div style="text-align: center; padding: 3rem; color: #64748b;"><div style="font-size: 3rem; margin-bottom: 1rem;">📸</div><p>照片整理中，敬请期待...</p></div>';
        } else {
            modalBody.innerHTML = '<div class="photo-gallery">';
            for (var i = 0; i < data.photos.length; i++) {
                modalBody.innerHTML += '<div class="photo-item"><img src="' + data.photos[i] + '" alt="排练照片" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';"><div class="photo-placeholder-in-gallery" style="display:none;"><div style="font-size: 2rem; margin-bottom: 0.5rem;">🎭</div><span>照片加载失败</span></div></div>';
            }
            modalBody.innerHTML += '</div>';
        }

        modal.style.display = 'flex';
    }

    function closePhotoModal() {
        var modal = document.getElementById('photoModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        var modal = document.getElementById('photoModal');
        if (modal && event.target === modal) {
            closePhotoModal();
        }
    });

    // ============================================
    // 导出全局函数
    // ============================================
    window.goToPage = goToPage;
    window.switchTab = switchTab;
    window.showCastDetail = showCastDetail;
    window.closeCastModal = closeCastModal;
    window.showPhotoGallery = showPhotoGallery;
    window.closePhotoModal = closePhotoModal;

    // ============================================
    // 更新音乐初始化逻辑（适配6页SPA）
    // ============================================
    function initMusicForAllPages() {
        bgmAudio = document.getElementById('bgmAudio');
        if (!bgmAudio) {
            return;
        }

        if (!isMusicInitialized) {
            isMusicInitialized = true;
            bgmAudio.volume = 0.6;
        }

        // 确保音乐按钮存在（从第2页开始显示）
        if (currentPage >= 2 && !musicButton) {
            createMusicButton();
        }

        var activated = sessionStorage.getItem('musicActivated') === 'true';
        if (activated && currentPage >= 2) {
            function tryPlay() {
                if (!bgmAudio) return;
                
                bgmAudio.volume = 0.6;
                var playPromise = bgmAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        if (musicButton) {
                            musicButton.innerHTML = '🎵';
                            musicButton.title = '点击暂停音乐';
                        }
                    }).catch(function(error) {
                        if (musicButton) {
                            musicButton.innerHTML = '🔇';
                            musicButton.title = '点击播放音乐';
                        }
                    });
                }
            }
            
            tryPlay();
            setTimeout(tryPlay, 100);
            setTimeout(tryPlay, 300);
        }
    }

    // 更新goToPage函数，添加音乐初始化
    var originalGoToPage = goToPage;
    goToPage = function(pageNumber) {
        originalGoToPage(pageNumber);
        if (pageNumber >= 2) {
            setTimeout(initMusicForAllPages, 100);
        }
    };

    // 更新全局函数
    window.goToPage = goToPage;

    // 初始化时也检查音乐
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (currentPage >= 2) {
                initMusicForAllPages();
            }
        });
    } else {
        if (currentPage >= 2) {
            initMusicForAllPages();
        }
    }
})();

