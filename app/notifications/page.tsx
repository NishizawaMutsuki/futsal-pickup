import { NotificationsScreen } from "@/components/pickup/notifications-screen"

export const metadata = {
  title: "通知 | PickUp",
  description: "通知一覧",
}

export default function NotificationsPage() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <NotificationsScreen />
    </div>
  )
}
