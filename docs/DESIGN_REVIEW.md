# デザインレビュー（CV 頁廃止・ナビ整合後）

Codex MCP が利用できないため、手動でチェックリストに基づきレビューした結果を記録する。

## 実施した変更

- CV ページ（/cv）を廃止。CvPage.tsx を削除。
- ナビをトップページ構成と一致させた: **Research | Publications（Selected, By topic）| Career | Contact**。CV を Career（/#career）に差し替え。
- 「Search all」のリンク先を /cv から /by-topic に変更。
- サイトマップから CV 項目を削除（Career は Home 内のアンカーとして記載済み）。

## チェックリスト

| 項目 | 結果 |
|------|------|
| グローバルナビとトップページのセクション構成が一致しているか | 一致。Research, Publications, Career, Contact がナビとトップの並びと対応。 |
| 同じ情報が複数ルートでバラけていないか | 経歴はトップの Career セクションのみ。論文検索は By topic に集約。 |
| 主要な導線（Research, Publications, Career, Contact）が明確か | ナビとトップのアンカーで明確。 |
| 一般的な IA の観点で問題がないか | トップが単一ページで完結し、Publications はドロップダウンで Selected / By topic に分岐。問題なし。 |

## 補足

- Codex MCP で追加レビューする場合は、上記変更後のコードベースに対してナビ・導線・アクセシビリティの観点で依頼すること。
- PDF ダウンロードは計画どおり設けていない。
