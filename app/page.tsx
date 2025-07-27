import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-4">
          <GradientHeading size="lg" align="center" className="mb-8">
            Print on Items
          </GradientHeading>
          <p className="text-lg text-gray-600 mb-8">
            Create beautiful custom prints for your items
          </p>
        </div>
        <Button variant="gradient" size="lg" className="text-lg font-semibold">
          Get Started
        </Button>
      </div>
    </div>
  );
}
