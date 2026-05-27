# CryptoSecure

机构级数字资产安全平台着陆页。

## 项目结构

```
crypto-secure/
├── index.html           # 首页（主入口）
├── pages/                # 子页面
│   ├── security.html     # 安全特性详情页
│   ├── wallet.html       # 钱包集成页
│   ├── trust.html        # 信任认证页
│   └── about.html        # 关于我们页
├── components/           # 公共组件
│   ├── nav.html          # 导航栏
│   └── footer.html       # 页脚
├── styles/               # 样式文件
│   ├── base.css          # 变量、重置、通用样式
│   ├── nav.css           # 导航栏样式
│   ├── footer.css        # 页脚样式
│   ├── components.css    # 通用组件样式
│   └── pages.css         # 页面专属样式
├── scripts/              # 脚本文件
│   └── main.js           # 主脚本（Three.js 初始化等）
├── README.md             # 项目说明
└── CLAUDE.md             # 项目配置
```

## 页面说明

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | 主入口，包含 Hero、实时价格图表、安全/钱包/信任模块预览 |
| 安全 | `pages/security.html` | 6 大安全特性详细介绍 |
| 钱包 | `pages/wallet.html` | 支持的钱包列表及功能特性 |
| 信任 | `pages/trust.html` | 行业认证详情及公开审计报告 |
| 关于 | `pages/about.html` | 公司介绍、价值观、联系方式 |

## 技术栈

- **HTML5 + CSS3** — 语义化标签，CSS Grid/Flexbox 布局
- **Three.js** — 3D 粒子背景 + 浮动线框几何体
- **Chart.js** — 实时价格图表可视化
- **Google Fonts** — Space Grotesk（标题）+ Inter（正文）

## 设计系统

- **配色**：深色主题 `#0A0F1C` + 霓虹青 `#00D4FF` + 紫色 `#7C3AED`
- **玻璃态**：`backdrop-filter: blur(20px)` + 半透明背景
- **字体**：Space Grotesk（标题）、Inter（正文）
- **动效**：鼠标视差、悬浮动效、脉冲动画

## 本地运行

直接用浏览器打开 `index.html` 即可预览。

> 注意：组件动态加载（nav.html / footer.html）需要通过 HTTP 服务访问，不能直接通过文件路径（`file://`）打开，否则 fetch 会失败。
>
> 可使用以下方式启动本地服务：
> ```bash
> # Python 3
> python -m http.server 8000
>
> # Node.js
> npx serve
>
> # 或使用 VSCode Live Server 插件
> ```

## 添加新页面

1. 在 `pages/` 目录下创建新 HTML 文件（如 `pricing.html`）
2. 在页面顶部添加样式引用（使用 `../` 路径）：
   ```html
   <link rel="stylesheet" href="../styles/base.css">
   <link rel="stylesheet" href="../styles/nav.css">
   <!-- 其他样式 -->
   ```
3. 在 `<body>` 中添加导航和页脚占位符：
   ```html
   <div id="nav-placeholder"></div>
   <!-- 页面内容 -->
   <div id="footer-placeholder"></div>
   ```
4. 在页面底部添加组件加载脚本：
   ```html
   <script src="../scripts/main.js"></script>
   <script>
       fetch('../components/nav.html')
           .then(res => res.text())
           .then(html => {
               document.getElementById('nav-placeholder').outerHTML = html;
           });
       fetch('../components/footer.html')
           .then(res => res.text())
           .then(html => {
               document.getElementById('footer-placeholder').outerHTML = html;
           });
   </script>
   ```
5. 在 `components/nav.html` 的导航链接中添加新页面入口

## 后续页面规划

- [ ] 定价页面（pricing.html）
- [ ] 博客/新闻页面
- [ ] 支持页面
- [ ] 注册/登录页面