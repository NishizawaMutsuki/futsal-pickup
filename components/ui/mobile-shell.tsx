export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
        {children}
      </div>
    </div>
  )
}
