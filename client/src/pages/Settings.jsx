import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "../hooks/useAuth";

function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyProgress: true,
  });
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage("Settings saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Account Settings</h1>
            <p className="text-xs text-gray-500 mt-1">Manage your account preferences & system configuration.</p>
          </div>
        </div>

        {savedMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
            {savedMessage}
          </div>
        )}

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            User Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-500 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                disabled
                value={user?.name || ""}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Preferences Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Notification Preferences
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) =>
                  setNotifications((prev) => ({ ...prev, emailAlerts: e.target.checked }))
                }
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Receive placement roadmap & career email alerts</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyProgress}
                onChange={(e) =>
                  setNotifications((prev) => ({ ...prev, weeklyProgress: e.target.checked }))
                }
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Weekly skill progress & readiness digest</span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
