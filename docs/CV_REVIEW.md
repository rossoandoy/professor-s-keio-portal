# CV 頁・教授フィードバック反映 レビュー

## 教授フィードバック反映チェックリスト

| 項目 | 内容 | 確認 |
|------|------|------|
| 英語: 学歴 | 学歴セクションを表示しない（学歴不問） | 英語版 CvPage および CareerSection では `educationJa` を表示しておらず、EN では Editorial Service と Visiting Positions のみ表示 |
| 英語: 経歴 | 最小限の職歴＋研究・実績（論文・Editorial・Visiting）を前面に | Academic Positions（短いリスト）、Editorial Service、Selected Visiting Positions を表示 |
| 日本語: 詳細 | 政府委員・外部委員、学会・編集、学歴を記載（慶應教員紹介風） | 職歴・学歴・学会・編集活動・政府委員・外部活動を表示 |
| CV と Publication の切り分け | 画面・見出しで明確に分離 | CV ページ上部に「経歴・活動」ブロック、区切り線のうえ「Publications」見出しで検索可能論文一覧を分離 |
| PDF ダウンロード | 正しいファイルを指す | `/cv.pdf`（public/cv.pdf = Okubo_CV 2026FebR.pdf のコピー）を参照 |

## サイトマップ・IA

| 項目 | 確認 |
|------|------|
| サイトマップと実ルートの一致 | /sitemap で Home, Publications（Selected, By topic, detail）, Research themes, CV, Contact を一覧化 |
| ナビ・フッターの用語 | Research, Publications（Selected・By topic）, CV, Contact で統一。フッターに「サイトマップ」リンク |

## データ・コンポーネント

- CV 関連データは `src/data/cvContent.ts` に集約。CareerSection と CvPage の両方が参照。
- EN では `educationJa` を参照せず、学歴ブロックを描画しない。

## Codex / 手動レビュー

実装完了後、上記チェックリストに基づき Codex MCP または手動で確認すること。問題があれば本ドキュメントの「確認」列を更新する。
