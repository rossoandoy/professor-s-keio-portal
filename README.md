# Professor Toshihiro Okubo — Keio Portal

大久保敏弘教授（慶應義塾大学 経済学部）の研究ポータルサイト。

**公開 URL**: https://rossoandoy.github.io/professor-s-keio-portal/

---

## 技術スタック

- React 18 + TypeScript + Vite 5 (SWC)
- Tailwind CSS 3 + shadcn/ui (Radix UI)
- React Router v6 / TanStack React Query / Framer Motion
- テスト: Vitest + Testing Library
- CMS: [Pages CMS](https://pagescms.org) (外部サービス、`.pages.yml` で設定)
- CI/CD: GitHub Actions → GitHub Pages 自動デプロイ

## 開発

```bash
npm ci          # 依存関係インストール
npm run dev     # 開発サーバー (localhost:8080)
npm run build   # 本番ビルド → dist/ + sitemap.xml 生成
npm run lint    # ESLint
npm run test    # Vitest
```

## ビルド (慶應サーバー向け)

```bash
npm run build:keio   # ビルド + SPA fallback生成 + sitemap.xml
```

慶應サーバー (`public_html`) は SPA リライトに対応していないため、`scripts/generate-keio-fallbacks.mjs` が全ルートに `index.html` をコピーする。ビルド成果物は `dist/` に出力される。

## コンテンツ管理

コンテンツは `content/` ディレクトリに格納され、ビルド時に Vite glob import で読み込まれる。

```
content/
  publications/   # 論文 (Markdown frontmatter, 89件)
  news/           # お知らせ (Markdown frontmatter)
  pages/          # Career, Policy, Research Topics, Research Agenda (JSON)
  settings/       # Hero, Contact, Navigation (JSON)
```

### Pages CMS でブラウザから編集

1. [pagescms.org](https://pagescms.org) にアクセス → GitHub ログイン
2. `professor-s-keio-portal` を選択
3. Publications / News / Hero / Contact 等を編集 → Save

詳細: [docs/CMS_GUIDE.md](docs/CMS_GUIDE.md)

## デプロイ

### GitHub Pages (自動)

`main` に push すると GitHub Actions が自動でビルド・デプロイ。

- `.github/workflows/deploy-pages.yml` — ビルド + GitHub Pages デプロイ
- `.github/workflows/build-release.yml` — ビルド + 成果物 ZIP 生成
- `.github/workflows/pr-check.yml` — PR 時の品質チェック

### 慶應サーバー (手動)

1. `npm run build:keio` または GitHub Actions の成果物 ZIP をダウンロード
2. `dist/` の中身を Cyberduck で `public_html` にアップロード

## プロジェクト構成

```
src/
  App.tsx              # ルート定義
  components/          # セクション・UI コンポーネント
  pages/               # ページコンポーネント
  lib/contentLoader.ts # content/ からのデータ読み込み
  contexts/            # LanguageContext (日英切替)
content/               # コンテンツデータ (JSON + Markdown)
public/admin/          # (未使用) CMS は Pages CMS に移行済み
scripts/
  generate-keio-fallbacks.mjs  # 慶應サーバー向け SPA fallback
  generate-sitemap.mjs         # sitemap.xml 生成
  check-nonascii-paths.mjs     # 全角ファイル名検出
  check-internal-links.mjs     # 内部リンクチェック
docs/                  # 計画書・仕様書・ガイド
.pages.yml             # Pages CMS 設定
```

## 親リポジトリ

[rossoandoy/okubo-hp](https://github.com/rossoandoy/okubo-hp) — 企画・仕様ドキュメントとサブモジュール管理
