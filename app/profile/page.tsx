import { ProfileScreen } from "@/components/pickup/profile-screen"

export const metadata = {
  title: "マイページ | PickUp",
  description: "プロフィールと参加履歴",
}

export default function ProfilePage() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
        <ProfileScreen />
      </div>
    </div>
  )
}
