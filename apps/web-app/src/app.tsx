import { Route, Routes } from 'react-router-dom';
import AuthLayout from './authLayout';
import MainLayout from './mainLayout';
import LoginPage from './pages/login';

import DarkThroneClient from '@darkthrone/client-library';
import RegisterPage from './pages/register';

const client = new DarkThroneClient();

export function App() {
  return (
    <Routes>
      <Route element={<AuthLayout client={client} />}>
        <Route path="/login" element={<LoginPage client={client} />} />
        <Route path="/register" element={<RegisterPage client={client} />} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
        {/* <Route path="/reset-password" element={<div>Reset Password</div>} />
        <Route path="/verify-email" element={<div>Verify Email</div>} /> */}
      </Route>

      <Route element={<MainLayout client={client} />}>
        {/* Home */}
        <Route path="/overview" element={<div>Overview</div>} />
        {/* <Route path="/news" element={<div>News</div>} />
        <Route path="/levels" element={<div>Levels</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/faq" element={<div>FAQ</div>} />
        <Route path="/support" element={<div>Support</div>} /> */}

        {/* Battle */}
        {/* <Route path="/attack" element={<div>Training</div>} />
        <Route path="/training" element={<div>Training</div>} />
        <Route path="/mercenaries" element={<div>Mercenaries</div>} />
        <Route path="/upgrades" element={<div>Upgrades</div>} />
        <Route path="/war-history" element={<div>War History</div>} /> */}

        {/* Structures */}
        {/* <Route path="/bank" element={<div>Bank</div>} />
        <Route path="/armory" element={<div>Armory</div>} />
        <Route path="/upgrades" element={<div>Upgrades</div>} />
        <Route path="/housing" element={<div>Housing</div>} />
        <Route path="/repair" element={<div>Repair</div>} /> */}

        {/* Alliances */}
        {/* <Route path="/my-alliances" element={<div>My Alliances</div>} />
        <Route path="/alliance-listing" element={<div>Alliance Listing</div>} /> */}

        {/* Community */}
        {/* <Route path="/downloads" element={<div>Downloads</div>} />
        <Route path="/friends" element={<div>Friends</div>} />
        <Route path="/rankings" element={<div>Rankings</div>} />
        <Route path="/forum" element={<div>Forum</div>} />
        <Route path="/messaging" element={<div>Messaging</div>} />
        <Route path="/recruiter" element={<div>Recruiter</div>} /> */}

      </Route>
    </Routes>
  );
}

export default App;
