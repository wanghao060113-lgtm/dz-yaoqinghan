# 部署检查清单

## ✅ 部署前检查

### 1. 文件路径检查
- [x] CSS 文件：`styles.css` (相对路径，正确)
- [x] JS 文件：`script.js` (相对路径，正确)
- [x] 音乐文件：`./public/bgm.mp3` (相对路径，正确)
- [x] 照片文件：`./photos/gallery/*.jpg` (相对路径，正确)

### 2. 配置文件检查
- [x] `vercel.json` - 已优化，支持所有静态资源
- [x] `package.json` - 配置正确
- [x] `.gitignore` - 已创建

### 3. 资源文件检查
- [x] `public/bgm.mp3` - 背景音乐文件存在
- [x] `photos/gallery/p1.1.jpg` 等照片文件存在
- [x] 所有 HTML、CSS、JS 文件完整

## 🚀 GitHub 部署步骤

### 1. 创建 GitHub 仓库
```bash
# 在项目目录下执行
git init
git add .
git commit -m "Initial commit: 物理与电子工程学院迎新晚会邀请函"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 2. 启用 GitHub Pages
1. 进入仓库 Settings
2. 找到 Pages 设置
3. 选择 Source: `main` 分支
4. 选择 `/ (root)` 目录
5. 保存后访问：`https://你的用户名.github.io/仓库名`

## ☁️ Vercel 部署步骤

### 方法一：通过 GitHub 导入（推荐）
1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测配置
5. 点击 "Deploy" 完成部署

### 方法二：通过 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录下执行
vercel

# 按照提示完成部署
```

## 📋 部署后验证

### 检查清单
- [ ] 首页正常显示
- [ ] 雪花动画效果正常
- [ ] 背景音乐可以播放
- [ ] 页面切换功能正常
- [ ] 所有照片正常显示
- [ ] 移动端响应式布局正常
- [ ] 所有按钮和链接正常工作

### 常见问题排查

#### 1. 音乐无法播放
- 检查 `public/bgm.mp3` 文件是否存在
- 检查浏览器控制台是否有错误
- 某些浏览器需要用户交互后才能播放音频

#### 2. 照片无法显示
- 检查 `photos/gallery/` 目录下的文件
- 检查文件路径是否正确
- 检查文件格式是否支持（jpg, png, webp）

#### 3. CSS/JS 文件加载失败
- 检查文件路径是否正确
- 检查 `vercel.json` 路由配置
- 清除浏览器缓存后重试

#### 4. 页面样式错乱
- 检查 `styles.css` 是否正确加载
- 检查浏览器兼容性
- 清除浏览器缓存

## 🔧 配置文件说明

### vercel.json
- 使用 `@vercel/static` 构建器处理静态文件
- 配置了静态资源缓存策略
- 支持所有常见图片格式（jpg, jpeg, png, gif, svg, webp）

### .gitignore
- 排除了系统文件和编辑器配置
- 排除了日志和临时文件

## 📝 注意事项

1. **文件大小限制**
   - Vercel 免费版单个文件最大 100MB
   - GitHub Pages 单个文件最大 100MB
   - 建议压缩图片和音频文件

2. **HTTPS 要求**
   - Vercel 和 GitHub Pages 都默认使用 HTTPS
   - 确保所有资源路径使用相对路径或 HTTPS 协议

3. **缓存问题**
   - 部署后如果看不到更新，清除浏览器缓存
   - 或使用无痕模式访问

4. **移动端测试**
   - 建议在真实设备上测试
   - 测试微信和 QQ 内置浏览器

## 🎯 推荐操作

1. **优化资源文件**
   - 压缩图片（使用 TinyPNG 等工具）
   - 压缩音频文件（如果文件较大）

2. **添加自定义域名**（可选）
   - Vercel 支持自定义域名
   - GitHub Pages 也支持自定义域名

3. **监控和统计**（可选）
   - 可以添加 Google Analytics
   - 或使用 Vercel Analytics

