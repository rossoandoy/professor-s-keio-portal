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

---

## 2. 決定事項

- **論文リンク**: 論文には DOI と Google Scholar の両方を持たせ、ある場合のみ表示する。
- **コンテンツ管理**: Decap CMS で GitHub 連携。教授はブラウザで編集し、PR またはブランチに反映。
- **公開**: 静的ファイルを慶應 Web サーバの `public_html` に配置。当面は成果物 ZIP を手動でアップロード。
- **デプロイ**: main マージ後に CI で成果物 ZIP を生成。ロールバック用に ZIP を保持する。
- **観測**: GA4 で KPI（doi_click, scholar_click, contact_click 等）を計測。Sentry でフロントエラー監視（フェーズ3）。
- **リポジトリ構成**: 親リポジトリ okubo の配下に、Git サブモジュールで professor-s-keio-portal と okubo-personal-page を配置。他環境では `git clone --recurse-submodules <親URL> okubo` で取得。
- **ナビ構成**: Research（/#research）, Publications（Selected, By topic）, CV（/cv）, Contact（/#contact）。参照: okubo-personal-page の構成。

---

## 3. 参照: 1・2・3・a との対応

| 計画内ドキュメント | 参照元（プロジェクト文書） | 対応する章・内容 |
|-------------------|----------------------------|------------------|
| PLAN フェーズ1 | a | 6. Publications 要件（DOI リンク）, 2-2 KPI（scholar_click, doi_click） |
| PLAN フェーズ2 | 2, 3 | 2-3 構成（CMS, GitHub）, 3-6 CMS 導入（admin, config, OAuth） |
| PLAN フェーズ3 | 2, a | 2-8 Observability（GA4, Sentry）, a 2-2 KPI |
| SPEC Publications モデル | 3, a | 3-6-2 コンテンツモデル（year, authors, title, venue, category, doi_or_url）, a 5-2 Selected（contribution_summary）, 6-1 表示原則 |
| SPEC Decap | 3 | 3-6-1 管理画面, 3-6-2 コンテンツモデル, 3-6-3 GitHub OAuth |
| SPEC GA4 | 2, a | 2-8-1 KPI 計測, a 2-2 KPI |

### 参照リポジトリ

- **okubo-personal-page**: 構成（Research, Publications, CV, Contact）の参考。親 okubo をクローンするとサブモジュールとして `okubo-personal-page/` が含まれる。

### プロジェクト文書のパス（okubo リポジトリ / ワークスペース想定）

- **1**: `1_ドキュメント一覧とgitリポジトリ構成.md`
- **2**: `2_システム構成・技術アーキテクチャ仕様書.md`
- **3**: `3_環境構築手順書.md`
- **a**: `a_企画・要件定義書一式（大久保教授hp）.md`

---

## 4. 更新ルール

- 新しい用語・決定が出たら本 KNOWLEDGE に追記する。
- 1・2・3・a を変更した場合は、上記対応表と SPEC を合わせて更新する。
