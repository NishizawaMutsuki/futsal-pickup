import type { Metadata } from "next"
import { MobileShell } from "@/components/ui/mobile-shell"
import { LegalPageLayout } from "@/components/pickup/legal-page-layout"

export const metadata: Metadata = {
  title: "プライバシーポリシー - PickUp",
}

export default function PrivacyPage() {
  return (
    <MobileShell>
      <LegalPageLayout title="プライバシーポリシー">
        <p className="text-xs text-muted-foreground mb-6">最終更新日: 2026年3月4日</p>

        <section>
          <h2>1. 収集する情報</h2>
          <p>本サービスでは、以下の情報を収集します。</p>
          <ul>
            <li>アカウント情報（メールアドレス、表示名、プロフィール画像）</li>
            <li>利用情報（マッチへの参加履歴、レビュー、評価）</li>
            <li>端末情報（ブラウザの種類、アクセス日時）</li>
          </ul>
        </section>

        <section>
          <h2>2. 情報の利用目的</h2>
          <p>収集した情報は以下の目的で利用します。</p>
          <ul>
            <li>本サービスの提供・運営・改善</li>
            <li>ユーザーの本人確認</li>
            <li>マッチのマッチング精度の向上</li>
            <li>通知の配信（マッチリマインダー、新着情報等）</li>
            <li>不正利用の防止</li>
            <li>統計データの作成（個人を特定できない形式）</li>
          </ul>
        </section>

        <section>
          <h2>3. 情報の第三者提供</h2>
          <p>
            ユーザーの個人情報を、本人の同意なく第三者に提供することはありません。
            ただし、法令に基づく場合はこの限りではありません。
          </p>
          <p>
            マッチの参加者には、表示名とプロフィール画像が共有されます。
            メールアドレスは他のユーザーには公開されません。
          </p>
        </section>

        <section>
          <h2>4. 情報の管理</h2>
          <p>
            ユーザーの個人情報は、適切な安全管理措置を講じて保護します。
            データはSupabase（クラウドデータベース）に保存され、
            通信はSSL/TLSにより暗号化されます。
          </p>
        </section>

        <section>
          <h2>5. Cookieの使用</h2>
          <p>
            本サービスでは、認証状態の維持とユーザー体験の向上のため
            Cookieを使用します。ブラウザの設定でCookieを無効にすることも可能ですが、
            サービスの一部機能が利用できなくなる場合があります。
          </p>
        </section>

        <section>
          <h2>6. アクセス解析</h2>
          <p>
            本サービスでは、Vercel Analyticsを使用してアクセス状況を分析しています。
            これにより収集されるデータは匿名化されており、個人を特定することはできません。
          </p>
        </section>

        <section>
          <h2>7. 情報の開示・訂正・削除</h2>
          <p>
            ユーザーは、自身の個人情報の開示・訂正・削除を求めることができます。
            アカウント削除をご希望の場合は、プロフィール画面からお手続きいただくか、
            運営までご連絡ください。
          </p>
        </section>

        <section>
          <h2>8. ポリシーの変更</h2>
          <p>
            本ポリシーの内容は、法令の変更やサービス内容の変更に伴い、
            ユーザーへの通知をもって変更する場合があります。
          </p>
        </section>

        <section>
          <h2>9. お問い合わせ</h2>
          <p>
            個人情報の取り扱いに関するお問い合わせは、アプリ内の問い合わせ機能
            または運営チームまでご連絡ください。
          </p>
        </section>
      </LegalPageLayout>
    </MobileShell>
  )
}
