import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans">
        <header className="bg-gray-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">SteveHealthify</h1>
            <nav className="space-x-4 text-sm">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/settings" className="hover:underline">
                Settings
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-gray-800 text-center text-sm text-gray-400 py-4">
          © 2025 SteveHealthify. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}
