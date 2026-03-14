# PLAN — 実装ロードマップ

実装の段階・マイルストーン・優先順位。参照: 1（成果物リスト）, 3（手順）, a（KGI/KPI）。

---

## 現在のフェーズ

**フェーズ1 リッチ化を拡張済み。次はフェーズ2（Decap CMS）の検討。**

---

## フェーズ1: 内容リッチ化（拡張済み）

- 論文に **DOI / Google Scholar リンク** を追加（完了）
- **論文詳細ページ** `/publications/:slug`（要約・引用・DOI/Scholar/PDF/Preprint・引用数表示）（完了）
- **CV ページ** `/cv`：CV PDF ダウンロード ＋ 検索・フィルタ可能な論文 DB（年度・トピック・ジャーナル）（完了）
- **PDF / プレプリント** リンクをデータと一覧・詳細に表示（完了）
- **引用数** は手動フィールドで詳細ページに表示（自動取得は別フェーズ）
- **研究テーマ別特集** `/research/:topicSlug`（A〜G のテーマ別論文一覧）（完了）
- ナビを **Research / Publications / CV / Contact** に統一（完了）
- データは単一ソース `publicationsByTopic`（slug, selected, abstract, pdf_url, preprint_url, citation_count 等）

**完了条件**: 上記が実装され、Selected / By topic / CV から詳細ページへ遷移できる。

---

## フェーズ2: 管理高度化（Decap CMS）

- `admin/index.html` と `admin/config.yml` を追加（3-6）
- コンテンツ格納を `content/`（pages, news, publications）に移行
- ビルドで content を読み込み静的生成（方針は SPEC に記載）
- GitHub OAuth で CMS ログイン（3-6-3）

**完了条件**: 教授が /admin からログインし、News / Pages / Publications を更新でき、PR が作成される。

---

## フェーズ3: 観測・品質

- GA4 計測（doi_click, scholar_click, contact_click 等）（2-8-1, a の KPI）
- CI 品質ゲート（リンクチェック、全角検知等）（3-7-1）

**完了条件**: GA4 で KPI イベントが計測され、CI で品質ゲートが動作する。

---

## 依存関係

```
フェーズ1（リッチ化） → フェーズ2（CMS）
                         → フェーズ3（観測・品質）
```

フェーズ2 では論文フィールドに doi / scholar_url を含め、フェーズ3 でそれらのクリックを計測する。

**将来拡張**: a 4 の Research Agenda 単独ページ、Policy & Advisory、Grants、Teaching、Join the Lab、News 等はフェーズ2以降で検討する。CV はフェーズ1で実装済み（/cv）。

---

## 更新履歴

| 日付 | 変更内容 |
|------|----------|
| （初版） | フェーズ1〜3を定義。フェーズ1を次に実施と明示。 |
