'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import { Button } from './button'
import { ChevronDown, User, LogOut } from 'lucide-react'

interface UserProfileDropdownProps {
  className?: string
}

export function UserProfileDropdown({ className = '' }: UserProfileDropdownProps) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0] || 'U'}
            </div>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user.fullName || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => {
              // Navigate to profile page - you can customize this route
              window.location.href = '/profile'
              setIsOpen(false)
            }}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
} 