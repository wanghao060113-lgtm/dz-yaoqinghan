# 2025届物理与电子工程学院迎新晚会电子邀请函

## 项目简介

这是一个 H5 电子邀请函项目，采用单页应用（SPA）架构，支持在手机 QQ/微信中打开浏览。

## 项目结构

```
电子邀请函/
├── index.html          # 主页面（单页应用，包含第一页和第二页内容）
├── invite.html         # 第二页（备用）
├── styles.css          # 全局样式文件
├── script.js           # JavaScript 文件（雪花效果和音乐管理）
├── package.json        # 项目配置文件
├── vercel.json         # Vercel 部署配置
├── public/
│   └── bgm.mp3         # 背景音乐文件
├── assets/audio/       # 空目录（备用）
├── css/                # 空目录（备用）
└── js/                 # 空目录（备用）
```

## 功能特点

- ✅ 单页应用（SPA）架构，音乐持续播放不中断
- ✅ 点击第一页按钮时立即开始播放音乐
- ✅ 雪花粒子效果（使用 ❄ 字符）
- ✅ 响应式设计，完美适配手机端（QQ/微信）
- ✅ 右上角音乐开关按钮，可控制播放/暂停
- ✅ 支持 Vercel 和 GitHub Pages 部署

## 部署说明

### Vercel 部署

1. 将项目推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置域名（如：romantic-hao.fun）
4. 部署完成

### GitHub Pages 部署

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为源
4. 访问 `https://username.github.io/repository-name`

## 技术栈

- HTML5
- CSS3（渐变、动画、玻璃拟态效果）
- JavaScript（ES5，兼容性好）
- 单页应用（SPA）架构

## 浏览器兼容性

- ✅ Chrome/Edge（最新版）
- ✅ Safari（iOS/ macOS）
- ✅ 微信内置浏览器
- ✅ QQ 内置浏览器
- ✅ Firefox（最新版）

## 注意事项

1. 背景音乐文件 `public/bgm.mp3` 需要自行添加
2. 音频路径使用绝对路径 `/public/bgm.mp3` 以确保在 Vercel 上正确访问
3. 项目采用单页应用架构，不进行页面跳转，确保音乐持续播放

## 许可证

MIT License

