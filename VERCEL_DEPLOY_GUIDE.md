# Vercel 部署详细指南

## 📋 准备工作

在开始之前，确保你已经准备好以下信息：

1. ✅ GitHub 仓库已创建（`yioyiu/Dairy`）
2. ✅ 代码已推送到 GitHub
3. ✅ Supabase 项目 URL 和密钥
4. ✅ ZHIPU AI API 密钥

## 🚀 部署步骤（通过网站，最简单）

### 第一步：登录 Vercel

1. 访问 **https://vercel.com**
2. 点击右上角的 **"Sign Up"** 或 **"Log In"**
3. 选择 **"Continue with GitHub"**，使用你的 GitHub 账号登录
   - 这会授权 Vercel 访问你的 GitHub 仓库

### 第二步：导入项目

1. 登录后，在 Dashboard 页面点击 **"Add New..."** 按钮
2. 选择 **"Project"**
3. 在仓库列表中找到 **`yioyiu/Dairy`**
4. 点击仓库旁边的 **"Import"** 按钮

### 第三步：配置项目

Vercel 会自动检测到这是一个 Next.js 项目，通常不需要修改配置。但你可以检查：

- **Framework Preset**: 应该是 `Next.js`（自动检测）
- **Root Directory**: 保持默认（`.`）
- **Build Command**: `npm run build`（自动）
- **Output Directory**: `.next`（自动）
- **Install Command**: `npm install`（自动）

**⚠️ 重要：先不要点击 "Deploy"！**

### 第四步：配置环境变量（关键步骤）

在点击 "Deploy" 之前，需要先配置环境变量：

1. 在项目配置页面，找到 **"Environment Variables"** 部分
2. 点击 **"Add"** 或 **"Add Environment Variable"**
3. 逐个添加以下环境变量：

#### 环境变量列表：

| 变量名 | 说明 | 从哪里获取 |
|--------|------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | Supabase Dashboard → Settings → API → Project API keys → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 | Supabase Dashboard → Settings → API → Project API keys → `service_role` `secret` |
| `ZHIPU_API_KEY` | ZHIPU AI API 密钥 | https://open.bigmodel.cn/ → API Keys |

#### 添加环境变量的步骤：

1. **添加第一个变量**：
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: 你的 Supabase URL（例如：`https://xxxxx.supabase.co`）
   - **Environment**: 选择所有环境（Production, Preview, Development）
   - 点击 **"Add"**

2. **重复上述步骤**，添加其他三个环境变量

3. **确认所有变量都已添加**：
   - `NEXT_PUBLIC_SUPABASE_URL` ✅
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
   - `SUPABASE_SERVICE_ROLE_KEY` ✅
   - `ZHIPU_API_KEY` ✅

### 第五步：部署

1. 确认所有环境变量都已添加
2. 点击页面底部的 **"Deploy"** 按钮
3. 等待构建完成（通常需要 2-5 分钟）

### 第六步：查看部署结果

部署完成后，你会看到：

- ✅ **Success** 消息
- 🌐 **访问链接**（例如：`dairy.vercel.app` 或 `dairy-xxxxx.vercel.app`）
- 📊 **部署详情**（构建日志、性能分析等）

点击链接即可访问你的网站！

## 🔄 自动部署

配置完成后，Vercel 会自动：

- ✅ 每次你推送代码到 GitHub 的 `main` 分支时，自动触发新的部署
- ✅ 每次创建 Pull Request 时，自动创建预览部署
- ✅ 所有部署都有独立的 URL，方便测试

## 🔧 后续配置（可选）

### 自定义域名

1. 在 Vercel Dashboard 中进入你的项目
2. 点击 **"Settings"** → **"Domains"**
3. 输入你的域名（例如：`dairy.yourdomain.com`）
4. 按照提示配置 DNS 记录

### 查看部署日志

如果部署失败：

1. 在项目 Dashboard 中点击失败的部署
2. 查看 **"Build Logs"** 了解错误原因
3. 常见问题：
   - 环境变量未配置
   - 构建错误
   - 依赖安装失败

### 重新部署

如果需要重新部署：

1. 在项目 Dashboard 中
2. 找到之前的部署记录
3. 点击 **"..."** → **"Redeploy"**

## 🐛 常见问题

### 1. 部署失败：环境变量未找到

**解决方案**：确保所有环境变量都已正确添加，并且选择了正确的环境（Production/Preview/Development）

### 2. 网站可以访问但功能不工作

**可能原因**：
- Supabase 环境变量配置错误
- Supabase RLS 策略未正确配置
- CORS 设置问题

**解决方案**：
- 检查 Supabase Dashboard 中的 API 设置
- 确认 RLS 策略允许来自 Vercel 域名的请求

### 3. AI 功能不工作

**可能原因**：
- `ZHIPU_API_KEY` 未正确配置
- API 密钥无效或额度不足

**解决方案**：
- 检查环境变量是否正确
- 在 ZHIPU 控制台验证 API 密钥状态

### 4. 认证功能不工作

**可能原因**：
- Supabase 重定向 URL 未配置

**解决方案**：
1. 在 Supabase Dashboard → Authentication → URL Configuration
2. 添加你的 Vercel 域名到 **Redirect URLs**：
   - `https://your-project.vercel.app/**`
   - `https://your-project.vercel.app/auth/callback`

## 📝 检查清单

部署前确认：

- [ ] GitHub 仓库已创建并推送代码
- [ ] Vercel 账号已创建并连接 GitHub
- [ ] 所有环境变量已配置
- [ ] Supabase 项目已创建并配置
- [ ] ZHIPU API 密钥已获取

部署后验证：

- [ ] 网站可以正常访问
- [ ] 可以正常登录/注册
- [ ] 可以保存记录
- [ ] AI 摘要功能正常
- [ ] 月度回顾功能正常

## 🎉 完成！

部署成功后，你的网站就可以通过 Vercel 提供的免费域名访问了！

**示例 URL**：`https://dairy.vercel.app`

每次你推送代码到 GitHub，Vercel 会自动重新部署，非常方便！

---

## 📞 需要帮助？

- [Vercel 官方文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Supabase 文档](https://supabase.com/docs)

