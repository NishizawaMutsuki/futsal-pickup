# デプロイガイド

## 現在の構成

GitHub → Vercel（自動デプロイ）

`main` ブランチにpushすると自動でビルド・デプロイされる。

## ローカル開発

```bash
cd projects/futsal-pickup
npm install
npm run dev
# → http://localhost:5173
```

## 手動ビルド・確認

```bash
npm run build
npx vite preview
# → http://localhost:4173
```

## 環境変数（今後の拡張用）

Vercelダッシュボード > Settings > Environment Variables で設定。

```
# Phase 2以降
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
NEXTAUTH_SECRET=
```

## カスタムドメイン

Vercelダッシュボード > Settings > Domains で追加可能。
- 無料: `futsal-pickup-xxx.vercel.app`
- カスタム: `pickup.yourdomain.com`
