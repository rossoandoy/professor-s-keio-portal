# コンテンツ管理ガイド / Content Management Guide

本サイトのコンテンツは全て **Pages CMS** で管理できます。
All site content can be managed through **Pages CMS**.

---

## 1. Pages CMS へのアクセス / Accessing Pages CMS

1. ブラウザで **[pagescms.org](https://pagescms.org)** にアクセス
2. **Sign in with GitHub** をクリック
3. GitHub アカウントでログイン
4. リポジトリ一覧から **professor-s-keio-portal** を選択

---

## 2. 編集できるコンテンツ / Editable Content

| コンテンツ | 説明 |
|-----------|------|
| **News / お知らせ** | 新しいお知らせの投稿・編集 |
| **Publications / 業績** | 論文の追加・編集（DOI, Scholar URL, トピック等） |
| **Hero Section** | トップページの名前・肩書・研究ステートメント |
| **Contact / 連絡先** | メール・電話・住所・外部リンク |
| **Research Agenda** | 研究アジェンダの4セクション |
| **Career / 経歴** | 職歴・学歴・学会活動・訪問研究 |
| **Policy & Advisory** | 政府委員会・研究機関での活動 |
| **Navigation** | ナビゲーションメニューの構成 |
| **Research Topics** | 研究テーマ一覧（A〜G） |

---

## 3. お知らせの投稿 / Adding News

1. Pages CMS のサイドバーから **News / お知らせ** を選択
2. **New** ボタンをクリック
3. 以下を入力:
   - **Title (EN)**: 英語タイトル
   - **タイトル (JA)**: 日本語タイトル
   - **Date**: 日付
   - **Slug**: URL用の短い英語名（例: `new-paper-published`）
   - **Tags**: タグ（任意、例: `announcement`, `publication`）
4. 本文を Markdown で記入（英語部分と日本語部分を `---` で区切る）
5. **Save** をクリック → GitHub に直接コミットまたは PR を作成

---

## 4. 論文の追加 / Adding a Publication

1. **Publications / 業績** を選択 → **New**
2. 以下を入力:
   - **Title**: 論文タイトル（英語）
   - **Authors**: 著者名（APA形式、例: `Okubo, T. and Noy, I.`）
   - **Year**: 発表年
   - **Journal**: 誌名
   - **Volume/Pages**: 巻号・ページ（例: `50(2), e70045`）
   - **Slug**: URL用（例: `bonding-social-capital-2026`）
   - **DOI**: DOI番号（例: `10.1111/disa.12345`）
   - **Google Scholar URL**: Scholar 論文ページの URL（任意）
   - **Topic IDs**: 該当トピック（A〜G から選択。複数可）
     - A: International trade, FDI
     - B: Trade, Space, Economic geography
     - C: Trade, Energy, Environment
     - D: Regional Economy, Public policy
     - E: Natural Disaster
     - F: Digital Economy
     - G: Quantitative History
   - **Category**: Refereed / Books / Policy / Japanese
   - **Show in Selected**: トップページの代表作に表示する場合 ON
   - **Top Journal**: トップジャーナル掲載の場合 ON（星アイコン表示）
   - **Contribution Summary**: 1行の貢献要約（任意、Selected に表示）
3. **Save**

---

## 5. サイト設定の編集 / Editing Site Settings

### Hero（トップページ上部）
- 名前、肩書、所属、研究ステートメント、メール、所在地を変更可能
- 日英両方を編集してください

### Contact（連絡先）
- メール、電話、住所、外部リンク（Google Scholar, Scopus 等）を変更可能

### Navigation（ナビメニュー）
- メニュー項目の追加・削除・並び替え
- ドロップダウンの子項目も編集可能

---

## 6. 保存と反映の流れ / Save & Deploy Flow

```
Pages CMS で編集
  ↓
Save → GitHub に自動コミット（または PR 作成）
  ↓
GitHub Actions が自動ビルド
  ↓
GitHub Pages に自動デプロイ（数分で反映）
  ↓
慶應サーバーへは別途手動デプロイ
```

**確認先**: GitHub Pages URL（リポジトリの Settings → Pages に記載）

---

## 7. よくある操作 / Common Tasks

### 新しい論文を追加したい
→ Publications → New → フィールド入力 → Save

### お知らせを投稿したい
→ News → New → タイトル・本文入力 → Save

### 連絡先を変更したい
→ Contact → email/phone/address を編集 → Save

### 研究ステートメントを更新したい
→ Hero Section → statementEn / statementJa を編集 → Save

### ナビメニューに新しい項目を追加したい
→ Navigation → items の最後に新しいエントリを追加 → Save

---

## 8. トラブルシューティング / Troubleshooting

| 問題 | 解決策 |
|------|--------|
| Pages CMS にログインできない | GitHub アカウントでログインしているか確認。リポジトリへのアクセス権限が必要。 |
| 保存後にサイトに反映されない | GitHub Actions のビルドが完了するまで数分待つ。リポジトリの Actions タブで状態を確認。 |
| 編集内容が消えた | GitHub のコミット履歴から復元可能。管理者に連絡。 |
| 日本語が文字化けする | ファイルは UTF-8 で保存されます。通常は問題ありません。 |

---

## 技術参照 / Technical Reference

- **Pages CMS**: https://pagescms.org
- **設定ファイル**: `.pages.yml`（リポジトリルート）
- **コンテンツ格納先**: `content/` ディレクトリ
- **GitHub Actions**: `.github/workflows/deploy-pages.yml`（自動デプロイ）
