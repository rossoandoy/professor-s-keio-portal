# CHECKLIST — 文書 1・2・3・a との網羅対応

実装計画（PLAN/SPEC/TODO/KNOWLEDGE）が 1・2・3・a の各章をどこまで考慮しているかを一覧化する。実装のたびに状態を更新する。

**状態の凡例**
- **反映済**: PLAN/SPEC/TODO に明記され実装対象になっている
- **一部**: 一部のみ計画に含まれる
- **未反映**: 文書にはあるが計画・実装に未記載
- **後回し**: 意図的に現フェーズでは扱わない

---

## 1. 1_ドキュメント一覧とgitリポジトリ構成.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| 1-1 成果物リスト A–H (1–33) | PLAN/SPEC/TODO | 一部 | A-F は反映済み。G 運用ルール・H AI支援 は後回し（フェーズ4）。 |
| 1-2 ルート構成 docs/, content/, admin/, scripts/ | SPEC, TODO | 反映済 | content/ はフェーズ2b、admin/ はフェーズ2b、scripts/ はフェーズ2c。 |
| 1-2 運用ルール（全角禁止, PR必須, 成果物ZIP） | KNOWLEDGE, TODO | 反映済 | 全角検知はフェーズ2c、成果物ZIP はフェーズ2c。 |
| 1-3 ブランチ/レビュー | KNOWLEDGE | 一部 | PR テンプレート・著作権チェックはフェーズ2c 以降。 |

---

## 2. 2_システム構成・技術アーキテクチャ仕様書.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| 2-2 前提・制約 | KNOWLEDGE | 反映済 | 公開=慶應、手動反映。慶應サーバーURL・SFTP 方式を KNOWLEDGE に追記済み。 |
| 2-3 構成（Editor, CMS, SSOT, CI, Preview, Production, Observability） | PLAN, SPEC | 反映済 | フェーズ2b で CMS、2c で CI/Preview、3 で観測。 |
| 2-4 データフロー | SPEC 6 | 反映済 | コンテンツは GitHub、ビルドで生成。 |
| 2-5 環境（Local, Preview, Production） | PLAN 2c | 反映済 | Preview はフェーズ2c。本番は KNOWLEDGE。 |
| 2-6 RACI | KNOWLEDGE | 一部 | 決定事項として短く記載。 |
| 2-7 セキュリティ（2FA, Branch protection, Secrets） | TODO 2c | 反映済 | CI Secrets はフェーズ2c/3 で使用。 |
| 2-8-1 GA4（Contact, 募集, DOI/Scholar, researchmap, PDF） | SPEC 5, TODO | 反映済 | 全イベントを Priority 1-3 で分類。 |
| 2-8-2 Sentry | TODO フェーズ3 | 反映済 | |
| 2-8-3 品質（リンク, Lighthouse, 全角, 画像上限） | TODO フェーズ2c/3 | 反映済 | リンク/全角はフェーズ2c、Lighthouse はフェーズ2c/3。 |
| 2-9 デプロイ方式 A/B | KNOWLEDGE | 反映済 | 方式A（ZIP+Cyberduck）。慶應マニュアル参照を追記。 |
| 2-10 変更管理（PRテンプレート, 著作権チェック） | — | 後回し | フェーズ2c 以降で検討。 |

---

## 3. 3_環境構築手順書.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| 3-3 ローカル環境・リポジトリ作成 | — | 反映済 | 前提として実施済み。 |
| 3-5 content/ 配置 | TODO フェーズ2b | 反映済 | |
| 3-6 CMS（admin, config, モデル, OAuth, 教授テスト） | PLAN/SPEC/TODO フェーズ2b | 反映済 | config.yml 設計案を SPEC に具体化。OAuth プロキシ方針を追記。 |
| 3-7-1 PRチェック（ビルド, リンク, 全角, 画像, Lighthouse） | TODO フェーズ2c | 反映済 | |
| 3-7-2 成果物ZIP（mainマージ時） | TODO フェーズ2c | 反映済 | build-release.yml で対応。 |
| 3-8 GA4 / Sentry | TODO フェーズ3 | 反映済 | |
| 3-9 プレビュー環境（PRごと） | TODO フェーズ2c | 反映済 | GitHub Pages preview or Cloudflare Pages。 |
| 3-10 本番反映（ZIP, Cyberduck） | KNOWLEDGE | 反映済 | 慶應マニュアル参照追記。SPA fallback を SPEC 7 に追記。 |
| 3-11 親リポジトリ | 実施済み | 反映済 | |
| 3-12 完了条件 | PLAN 各フェーズ | 反映済 | |

---

## 4. a_企画・要件定義書一式（大久保教授hp）.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| a 1 プロジェクト概要・ブランドポジショニング | PLAN 2a | 反映済 | Research Agenda ページで研究哲学を言語化。 |
| a 2-2 KPI（全イベント） | SPEC 5, TODO | 反映済 | 全イベントを Priority 1-3 で分類。cv_download は優先度低下（CV 廃止）。 |
| a 3 ペルソナ・導線 | PLAN 2a | 反映済 | Tier 分けがペルソナ A/B/C に対応。 |
| a 4 サイトマップ（Research Agenda, Policy, Grants, Teaching, Join, News, CV, Contact） | PLAN 2a, TODO | 反映済 | 全ページを Tier 1-3 に割当。CV は廃止→Career に集約。 |
| a 5-1 Research Agenda ページ | PLAN 2a Tier 1 | 反映済 | `/research-agenda` で実装予定。データモデルを SPEC 2-1 に定義。 |
| a 5-2 Contribution Summary（1〜2行） | PLAN 2a Tier 1, SPEC 1-1 | 反映済 | フィールド定義済み。Selected での表示を TODO に記載。 |
| a 5-3 Policy & Advisory Roles | PLAN 2a Tier 2 | 反映済 | `/policy` で実装予定。cvContent.ts 活用。 |
| a 6-1 表示原則（年降順, APA, DOI, Lead） | SPEC, 実装 | 反映済 | |
| a 6-2 カテゴリ（Refereed / Books / Policy / Japanese） | PLAN 2a Tier 2, SPEC | 反映済 | category フィールド追加予定。 |
| a 6-3 自身の名前を太字、Top Journal アイコン | PLAN 2a Tier 1, SPEC 1-3/1-4 | 反映済 | ロジックを SPEC に定義。 |
| a 7-1 Lighthouse Performance 85+ | TODO フェーズ2c/3 | 反映済 | Lighthouse CI をフェーズ2c、最適化をフェーズ3 に。 |
| a 7-3 WCAG 2.1 AA | TODO フェーズ3 | 反映済 | axe-core チェック含む。 |
| a 8 運用（編集フロー, レビュー観点） | KNOWLEDGE | 一部 | CMS 導入後にフロー確定。 |

---

## 更新ルール

- 実装で対応した項目の「状態」を **反映済** に更新する。
- 新規で計画に取り込んだ項目は「対応先」を明記する。
- 定期的に 1・2・3・a を再読し、漏れがないか確認する。
