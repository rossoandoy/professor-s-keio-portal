# PLAN — 実装ロードマップ

実装の段階・マイルストーン・優先順位。参照: 1（成果物リスト）, 3（手順）, a（KGI/KPI）。

---

## 現在のフェーズ

**次に実施: フェーズ1（内容リッチ化）**

---

## フェーズ1: 内容リッチ化

- 論文に **DOI リンク** を追加（要件: a 6-1, 2 の doi_click）
- 論文に **Google Scholar リンク** を追加（KPI: scholar_click）
- 表示形式は APA 準拠・年降順のまま（a 6-1）
- データは当面コード内（TS）のまま。後で CMS 化時に content に移行

**完了条件**: Selected Publications および By topic ページの論文に DOI / Scholar リンクが表示され、クリックで遷移できる。

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

**将来拡張**: a 4 の Research Agenda 単独ページ、Policy & Advisory、Grants、Teaching、Join the Lab、News、CV 等はフェーズ2以降で検討する。

---

## 更新履歴

| 日付 | 変更内容 |
|------|----------|
| （初版） | フェーズ1〜3を定義。フェーズ1を次に実施と明示。 |
