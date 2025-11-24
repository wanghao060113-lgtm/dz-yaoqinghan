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
})();

