# KNOWLEDGE — 用語・決定事項・参照

用語の定義、プロジェクトの決定事項、および 1・2・3・a との対応。

---

## 1. 用語

| 用語 | 定義 |
|------|------|
| SSOT | Single Source of Truth。コンテンツの正は GitHub リポジトリ（Markdown/JSON 等）。CMS はその編集 UI。 |
| Decap CMS | 旧 Netlify CMS。Git ベースのヘッドレス CMS。GitHub OAuth でログインし、リポジトリにコミット/PR を作成する。 |
| DOI | Digital Object Identifier。学術文献の永続識別子。`https://doi.org/10.xxxx/xxxx` でアクセス。 |
| Scholar リンク | Google Scholar 上の論文ページへの URL。論文ごとに URL を保持する。 |
| 品質ゲート | CI で行うチェック（ビルド成功、リンク切れ、全角ファイル名検出等）。PR マージ前に通過必須。 |
| SPA fallback | React Router のクライアントサイドルーティングで、直接 URL アクセス時に index.html を返す仕組み。慶應サーバーでは `.htaccess` またはルート別コピーで対応。 |

---

## 2. 決定事項

- **論文リンク**: 論文には DOI と Google Scholar の両方を持たせ、ある場合のみ表示する。
- **コンテンツ管理**: Decap CMS で GitHub 連携。教授はブラウザで編集し、PR またはブランチに反映。（フェーズ2b で導入）
- **公開**: 静的ファイルを慶應 Web サーバの `public_html` に配置。当面は成果物 ZIP を手動でアップロード（SFTP / Cyberduck）。
- **慶應サーバー URL**: `http://web.econ.keio.ac.jp/staff/ユーザー名/`（経済学部）
- **デプロイ**: main マージ後に CI で成果物 ZIP を生成。ロールバック用に ZIP を保持する。
- **観測**: GA4 で KPI（doi_click, scholar_click, contact_click 等）を計測。Sentry でフロントエラー監視（フェーズ3）。
- **リポジトリ構成**: 親リポジトリ okubo の配下に、Git サブモジュールで professor-s-keio-portal と okubo-personal-page を配置。他環境では `git clone --recurse-submodules <親URL> okubo` で取得。
- **ナビ構成**（2026-03-26 改訂）:
  - Research (dropdown): Research Themes (/#research) | Research Agenda (/research-agenda)
  - Publications (dropdown): Selected (/#publications) | By Topic (/by-topic)
  - About (dropdown): Career (/#career) | Policy & Advisory (/policy) | Grants (/grants) | Teaching (/teaching)
  - Join the Lab (/join)
  - News (/news)
  - Contact (/#contact)
- **CV 廃止**（2026-03-26 記録）: CV ページ `/cv` はフェーズ1で実装後に廃止。経歴・学歴・委員等はトップの Career セクション (`/#career`) に集約。CV 用データ (`cvContent.ts`) は CareerSection 用に維持。
- **CMS 導入順序**: コンテンツページをコードで先に実装（2a）→ データモデル確定後に CMS 化（2b）。一方向移行で手戻りを防ぐ。
- **CMS OAuth プロキシ**: Cloudflare Workers 等の外部サービスで構築予定（フェーズ2b）。
- **技術スタック**: React 18 + Vite 5 + TypeScript 5 + Tailwind 3 + shadcn/ui。変更なし。

---

## 3. 参照: 1・2・3・a との対応

| 計画内ドキュメント | 参照元（プロジェクト文書） | 対応する章・内容 |
|-------------------|----------------------------|------------------|
| PLAN フェーズ1 | a | 6. Publications 要件（DOI リンク）, 2-2 KPI（scholar_click, doi_click） |
| PLAN フェーズ2a | a | 4. サイトマップ, 5-1 Research Agenda, 5-2 contribution_summary, 5-3 Policy, 6-2 カテゴリ, 6-3 太字/アイコン |
| PLAN フェーズ2b | 2, 3 | 2-3 構成（CMS, GitHub）, 3-6 CMS 導入（admin, config, OAuth） |
| PLAN フェーズ2c | 2, 3 | 3-7 CI 品質ゲート, 3-9 プレビュー環境, 慶應デプロイ（SFTP） |
| PLAN フェーズ3 | 2, a | 2-8 Observability（GA4, Sentry）, a 2-2 KPI, a 7 非機能 |
| PLAN フェーズ4 | 1 | H-31〜33 AI 支援 |
| SPEC Publications モデル | 3, a | 3-6-2 コンテンツモデル, a 5-2 Selected（contribution_summary）, 6-1 表示原則 |
| SPEC Decap | 3 | 3-6-1 管理画面, 3-6-2 コンテンツモデル, 3-6-3 GitHub OAuth |
| SPEC GA4 | 2, a | 2-8-1 KPI 計測, a 2-2 KPI |

### 参照リポジトリ

- **okubo-personal-page**: 構成（Research, Publications, CV, Contact）の参考。親 okubo をクローンするとサブモジュールとして `okubo-personal-page/` が含まれる。

### プロジェクト文書のパス（okubo リポジトリ）

- **1**: `1_ドキュメント一覧とgitリポジトリ構成.md`
- **2**: `2_システム構成・技術アーキテクチャ仕様書.md`
- **3**: `3_環境構築手順書.md`
- **a**: `a_企画・要件定義書一式（大久保教授hp）.md`

### 慶應サーバー参照

- **Webページ公開マニュアル**: https://www.mita.itc.keio.ac.jp/ja/faculty_manual_web_personal_publish_mac_mc.html
- SFTP 接続（Cyberduck 推奨）、全角ファイル名禁止、`public_html` にファイル配置

---

## 4. 更新ルール

- 新しい用語・決定が出たら本 KNOWLEDGE に追記する。
- 1・2・3・a を変更した場合は、上記対応表と SPEC を合わせて更新する。
