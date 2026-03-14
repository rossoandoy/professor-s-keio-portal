# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

### GitHub Pages でプレビューする

1. このリポジトリを GitHub に push する（または親リポジトリ [okubo-hp](https://github.com/rossoandoy/okubo-hp) に push する）。
2. リポジトリの **Settings → Pages** を開く。
3. **Source** で **GitHub Actions** を選ぶ。
4. `main` に push すると `.github/workflows/deploy-pages.yml` が動き、ビルド結果が GitHub Pages にデプロイされる。
5. 公開 URL: `https://<ユーザー名>.github.io/<リポジトリ名>/`  
   - 例: リポジトリが `professor-s-keio-portal` なら `https://rossoandoy.github.io/professor-s-keio-portal/`  
   - 親リポジトリ `okubo-hp` にソースを push している場合は `https://rossoandoy.github.io/okubo-hp/`

### CV PDF

CV ページの「Download CV (PDF)」は `public/cv.pdf` を参照します。最新の PDF（例: Okubo_CV 2026FebR.pdf）を `public/cv.pdf` として配置してください。親リポジトリに PDF がある場合はコピーして使います。

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
