import type { Metadata } from "next"
import { MobileShell } from "@/components/ui/mobile-shell"
import { LegalPageLayout } from "@/components/pickup/legal-page-layout"

export const metadata: Metadata = {
  title: "利用規約 - PickUp",
}

export default function TermsPage() {
  return (
    <MobileShell>
      <LegalPageLayout title="利用規約">
        <p className="text-xs text-muted-foreground mb-6">最終更新日: 2026年3月4日</p>

        <section>
          <h2>第1条（適用）</h2>
          <p>
            本規約は、PickUp（以下「本サービス」）の利用条件を定めるものです。
            ユーザーは本規約に同意の上、本サービスを利用するものとします。
          </p>
        </section>

        <section>
          <h2>第2条（利用登録）</h2>
          <p>
            本サービスの利用を希望する方は、所定の方法により利用登録を行うものとします。
            登録情報は正確かつ最新の情報を提供してください。
          </p>
        </section>

        <section>
          <h2>第3条（禁止事項）</h2>
          <p>ユーザーは以下の行為をしてはなりません。</p>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>他のユーザーへの暴力、脅迫、嫌がらせ行為</li>
            <li>虚偽の情報を登録する行為</li>
            <li>マッチへの無断欠席を繰り返す行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーの個人情報を不正に収集する行為</li>
            <li>反社会的勢力に関連する行為</li>
          </ul>
        </section>

        <section>
          <h2>第4条（マッチの参加・キャンセル）</h2>
          <p>
            マッチへの参加申込後のキャンセルは、開催24時間前まで無料で行えます。
            24時間を切ってからのキャンセルは、キャンセル率に記録されます。
            無断欠席が続く場合、アカウントの利用制限を行う場合があります。
          </p>
        </section>

        <section>
          <h2>第5条（免責事項）</h2>
          <p>
            本サービスは、ユーザー間のマッチングの場を提供するものであり、
            マッチ中に発生した怪我・事故・トラブルについて、運営は一切の責任を負いません。
            ユーザーは自己の責任においてマッチに参加するものとします。
          </p>
          <p>
            参加費の授受はユーザー間で直接行われるものであり、
            運営はその取引に関与しません。
          </p>
        </section>

        <section>
          <h2>第6条（アカウントの停止・削除）</h2>
          <p>
            運営は、ユーザーが本規約に違反した場合、事前の通知なくアカウントの利用停止
            または削除を行うことができます。
          </p>
        </section>

        <section>
          <h2>第7条（サービスの変更・終了）</h2>
          <p>
            運営は、ユーザーへの事前通知をもって、本サービスの内容を変更または
            提供を終了することができます。
          </p>
        </section>

        <section>
          <h2>第8条（準拠法・管轄裁判所）</h2>
          <p>
            本規約の解釈は日本法に準拠するものとし、紛争が生じた場合は
            東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>
      </LegalPageLayout>
    </MobileShell>
  )
}
