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
| 1-1 成果物リスト A–H (1–33) | PLAN/SPEC/TODO | 一部 | Publications, CMS, GA4, CI は対応。7 非機能・8 運用・13–15 UI・16–19 CMS運用詳細・24–26 リリース・27–30 運用・31–33 AI は未タスク化または後回し。 |
| 1-2 ルート構成 docs/, content/, admin/, scripts/ | SPEC, TODO | 一部 | scripts/（check-filenames, check-links）は TODO フェーズ3 にリンクチェック・全角検知あり。スクリプト配置は未明記。 |
| 1-2 運用ルール（全角禁止, PR必須, 成果物ZIP） | KNOWLEDGE, 3 | 反映済 | 成果物ZIP は慶應用 workflow で別途対応。 |
| 1-3 ブランチ/レビュー | KNOWLEDGE | 一部 | PR テンプレート・著作権チェックは TODO に未記載。後回し可。 |

---

## 2. 2_システム構成・技術アーキテクチャ仕様書.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| 2-2 前提・制約 | KNOWLEDGE | 反映済 | 公開=慶應、手動反映。 |
| 2-3 構成（Editor, CMS, SSOT, CI, Preview, Production, Observability） | PLAN, SPEC | 反映済 | フェーズ2でCMS、フェーズ3で観測。 |
| 2-4 データフロー | SPEC 5 | 反映済 | コンテンツは GitHub、ビルドで生成。 |
| 2-5 環境（Local, Preview, Production） | — | 一部 | 本番は KNOWLEDGE。Preview（PRごと）は 3-9 にあり TODO に未タスク化。 |
| 2-6 RACI | — | 未反映 | KNOWLEDGE に「決定事項」として短く追記可能。 |
| 2-7 セキュリティ（2FA, Branch protection, Secrets） | 3 | 一部 | 3-3-2 でリポジトリ設定。CI Secrets はフェーズ3で使用。 |
| 2-8-1 GA4（Contact, 募集, DOI/Scholar, researchmap, PDF） | SPEC 4 | 一部 | scholar_click, doi_click, contact_click は SPEC にあり。researchmap_click, pdf_click は SPEC に追記済み。 |
| 2-8-2 Sentry | TODO フェーズ3 | 反映済 | 任意で記載済み。 |
| 2-8-3 品質（リンク, Lighthouse, 全角, 画像上限） | TODO フェーズ3 | 反映済 | 画像上限は任意。 |
| 2-9 デプロイ方式 A/B | KNOWLEDGE | 反映済 | |
| 2-10 変更管理（PRテンプレート, 著作権チェック） | — | 未反映 | 後回し可。 |

---

## 3. 3_環境構築手順書.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| 3-3 ローカル環境・リポジトリ作成 | 3 | 反映済 | 前提として実施済み。 |
| 3-5 content/ 配置 | TODO フェーズ2 | 反映済 | |
| 3-6 CMS（admin, config, モデル, OAuth, 教授テスト） | PLAN/SPEC/TODO フェーズ2 | 反映済 | |
| 3-7-1 PRチェック（ビルド, リンク, 全角, 画像, Lighthouse） | TODO フェーズ3 | 反映済 | 画像・Lighthouse は任意。 |
| 3-7-2 成果物ZIP（mainマージ時） | TODO フェーズ3 | 一部 | 慶應用「成果物ZIP 生成 workflow」を TODO に追記済み。 |
| 3-8 GA4 / Sentry | TODO フェーズ3 | 反映済 | |
| 3-9 プレビュー環境（PRごと） | — | 未反映 | 後回し可。 |
| 3-10 本番反映（ZIP, Cyberduck） | KNOWLEDGE | 反映済 | |
| 3-11 親リポジトリ | 実施済み | 反映済 | |
| 3-12 完了条件 | PLAN 各フェーズ | 反映済 | |

---

## 4. a_企画・要件定義書一式（大久保教授hp）.md

| 章・内容 | 対応先 | 状態 | 備考 |
|----------|--------|------|------|
| a 2-2 KPI（全イベント） | SPEC 4, TODO | 一部 | joinus_view, cv_download, research_theme_scroll_depth 等は SPEC に追記済み。実装優先度はフェーズ3で判断。 |
| a 4 サイトマップ（Research Agenda, Policy, Join the Lab, News, CV 等） | 現モック, PLAN | 一部 | モックは Research, Publications, By topic, Career, Contact。将来拡張は PLAN に記載。 |
| a 5-1 Research Agenda ページ | — | 後回し | 別フェーズで検討。 |
| a 5-2 Contribution Summary（1〜2行） | SPEC 1-1, TODO | 反映済 | フィールドあり。表示は TODO に任意で追記。 |
| a 5-3 Policy & Advisory Roles | — | 後回し | コンテンツ・ブロックとして後で対応。 |
| a 6-1 表示原則（年降順, APA, DOI, Lead） | SPEC, 実装 | 反映済 | |
| a 6-2 カテゴリ | SPEC category | 反映済 | |
| a 6-3 自身の名前を太字、Top Journal アイコン | — | 未反映 | 必要に応じて SPEC/TODO に追記。 |
| a 7 非機能（Lighthouse 85, WCAG 2.1 AA） | TODO | 一部 | Lighthouse は任意。WCAG は未タスク化。 |
| a 8 運用（編集フロー, レビュー観点） | KNOWLEDGE | 一部 | 運用は文書レベル。 |

---

## 更新ルール

- 実装で対応した項目の「状態」を **反映済** に更新する。
- 新規で計画に取り込んだ項目は「対応先」を明記する。
- 定期的に 1・2・3・a を再読し、漏れがないか確認する。
