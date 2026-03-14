# GitHub Pages 設定手順

親リポジトリでは Pages を無効化し、本リポジトリ（professor-s-keio-portal）のみで GitHub Pages を公開するための手順です。

## 望ましい状態

- **公開サイト**: 本リポジトリのみから `https://rossoandoy.github.io/professor-s-keio-portal/` で公開
- **親リポジトリ okubo-hp**: Pages は使わない（無効化）

---

## 1. 親リポジトリ okubo-hp

1. [okubo-hp → Settings → Pages](https://github.com/rossoandoy/okubo-hp/settings/pages) を開く
2. **Build and deployment** の **Source** で **None** を選択
3. **Save** で保存

---

## 2. 本リポジトリ professor-s-keio-portal

1. [professor-s-keio-portal → Settings → Pages](https://github.com/rossoandoy/professor-s-keio-portal/settings/pages) を開く
2. **Build and deployment** の **Source** を **GitHub Actions** に設定
3. **Save** で保存

「Deploy from a branch」のままだと `actions/deploy-pages` がデプロイ先に紐づかず失敗することがあります。

---

## 3. ワークフロー再実行

設定変更後は次のいずれかで再実行してください。

- **Actions** タブで失敗した run を開き **「Re-run all jobs」**
- または本リポジトリで軽い変更をコミットして push（`main` への push でワークフローが走ります）

初回は **Environments** の `github-pages` で承認（Approve and deploy）が必要な場合があります。

---

## 失敗時の確認

- **build** で失敗: ログのエラーに従って対応（例: `npm ci` なら `package-lock.json` を更新してコミット）
- **deploy** で失敗: Settings → Pages → Source が **GitHub Actions** か再確認。承認待ちがないか確認。
