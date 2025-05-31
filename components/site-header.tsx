import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { ExamSelector } from "@/components/exam-selector"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              StudyTrack
            </span>
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center gap-2">
          <ExamSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}