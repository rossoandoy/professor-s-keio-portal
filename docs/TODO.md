# TODO — 実行タスク一覧

状態: 未着手 / 進行中 / 完了。実装中に随時更新する。

---

## フェーズ1: 内容リッチ化

- [x] 論文データ（Selected / By topic）に `doi` フィールドを追加する
- [x] 論文データに `scholar_url` フィールドを追加する
- [x] PublicationsSection で DOI リンクを表示する（ありの場合のみ）
- [x] PublicationsSection で Google Scholar リンクを表示する（ありの場合のみ）
- [x] By topic ページの論文カードに DOI / Scholar リンクを表示する
- [ ] （任意）Selected で contribution_summary を表示する
- [ ] （任意）GA4 の scholar_click / doi_click はフェーズ3 に回す

---

## フェーズ2: 管理高度化（Decap CMS）

- [ ] `content/` ディレクトリを作成（pages, news, publications）
- [ ] `admin/index.html` を追加
- [ ] `admin/config.yml` を追加（collections: pages, news, publications）
- [ ] 既存の論文データを content 用フォーマット（Markdown/JSON）に移行する
- [ ] ビルドで content を読み込み、静的サイトに組み込む
- [ ] GitHub OAuth を設定し、教授が /admin からログインできるようにする
- [ ] 教授が News を 1 件追加し、PR が作成されることを確認する

---

## フェーズ3: 観測・品質

- [ ] GA4 プロパティを作成し、測定 ID を取得する
- [ ] サイトに GA4 タグを組み込む
- [ ] doi_click, scholar_click, contact_click を実装する
- [ ] CI にリンクチェックを追加する
- [ ] CI に全角ファイル名検出を追加する
- [ ] （任意）Lighthouse / 画像サイズ上限チェック
- [ ] Sentry を導入する（任意）
- [ ] （必要なら）GA4 に joinus_view, cv_download, research_theme_scroll_depth を追加する
- [ ] （必要なら）慶應用 成果物ZIP 生成 workflow（main マージ時に dist を ZIP で Artifacts）を追加する

---

## 更新ルール

- 着手したタスクは「進行中」としてコメントまたは別行でメモする。
- 完了したタスクは `- [x]` に変更する。
- フェーズ切り替え時に PLAN のマイルストーンを更新し、必要なら SPEC を追記する。
