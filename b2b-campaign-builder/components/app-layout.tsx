import type React from "react";
import { Header } from "@/components/header";
import { StepSidebar } from "@/components/step-sidebar";
import { StepSidebarSkeleton } from "@/components/step-sidebar-skeleton";

interface AppLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  showSidebar?: boolean;
  isLoading?: boolean;
}

export function AppLayout({
  children,
  currentStep = 0,
  showSidebar = true,
  isLoading = false,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row">
        {showSidebar && currentStep > 0 && (
          <div className="w-full md:w-80 md:border-r bg-white md:h-[calc(100vh-64px)] md:sticky md:top-16">
            <StepSidebar currentStep={currentStep} isLoading={isLoading} />
          </div>
        )}

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
