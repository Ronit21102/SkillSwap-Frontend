import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout }  from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute, GuestOnlyRoute } from '@/components/auth/ProtectedRoute'

import LandingPage    from '@/pages/LandingPage'
import LoginPage      from '@/pages/LoginPage'
import SignupPage     from '@/pages/SignupPage'
import OnboardingPage from '@/pages/OnboardingPage'
import SkillSetupPage from '@/pages/SkillSetupPage'
import DashboardPage  from '@/pages/DashboardPage'
import ExplorePage    from '@/pages/ExplorePage'
import SwapsPage      from '@/pages/SwapsPage'
import ChatPage       from '@/pages/ChatPage'
import SchedulePage   from '@/pages/SchedulePage'
import ProfilePage    from '@/pages/ProfilePage'
import SettingsPage   from '@/pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public landing ── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── Auth: only accessible when NOT logged in ── */}
        <Route element={<GuestOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>

        {/* ── Onboarding: after signup, must be authenticated ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/onboarding"    element={<OnboardingPage />} />
            <Route path="/skills/setup"  element={<SkillSetupPage />} />
          </Route>
        </Route>

        {/* ── App: protected pages ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/explore"   element={<ExplorePage />} />
            <Route path="/swaps"     element={<SwapsPage />} />
            <Route path="/chat"      element={<ChatPage />} />
            <Route path="/schedule"  element={<SchedulePage />} />
            <Route path="/profile"   element={<ProfilePage />} />
            <Route path="/settings"  element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

