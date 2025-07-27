"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserProfileDropdown } from "@/components/ui/user-profile-dropdown";
import { ArrowLeft, Mail, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile
          </h1>
        </div>
        <UserProfileDropdown />
      </header>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user.firstName?.[0] ||
                      user.emailAddresses[0]?.emailAddress[0] ||
                      "U"}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.fullName || "User"}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.emailAddresses[0]?.emailAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </h3>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">
                      {user.firstName || "Not provided"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">
                      {user.lastName || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">
                    {user.emailAddresses[0]?.emailAddress}
                  </span>
                  {user.emailAddresses[0]?.verification?.status ===
                    "verified" && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User ID
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {user.id}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Sign In
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">
                      {user.lastSignInAt
                        ? new Date(user.lastSignInAt).toLocaleString()
                        : "Never"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Status
                </label>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                  {user.passwordEnabled && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Password Enabled
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
