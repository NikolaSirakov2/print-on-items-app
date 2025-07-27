"use client";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { UserProfileDropdown } from "@/components/ui/user-profile-dropdown";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
  console.log(user);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with user profile dropdown */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Print on Items
          </h1>
        </div>
        <UserProfileDropdown />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8 max-w-md mx-auto">
          <div className="space-y-4">
            <GradientHeading size="lg" align="center" className="mb-8">
              Print on Items
            </GradientHeading>
            <p className="text-lg text-gray-600 mb-8">
              Create beautiful custom prints for your items
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            className="text-lg font-semibold"
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
