import React from "react";

function ProfileLinksStep({ formData, onChange }) {
  const linkFields = [
    { id: "github", label: "GitHub Profile / URL", placeholder: "https://github.com/username or username", autoConnect: true },
    { id: "linkedin", label: "LinkedIn Profile URL", placeholder: "https://linkedin.com/in/username", autoConnect: false },
    { id: "leetCode", label: "LeetCode Handle / URL", placeholder: "https://leetcode.com/u/username or username", autoConnect: true },
    { id: "codeforces", label: "Codeforces Handle / URL", placeholder: "https://codeforces.com/profile/username or username", autoConnect: true },
    { id: "codeChef", label: "CodeChef Handle / URL", placeholder: "https://codechef.com/users/username or username", autoConnect: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 4: Coding & Social Profiles</h3>
        <p className="text-xs text-gray-500 mt-1">
          Provide your platform links or handles below. Any provided coding profiles will be <span className="font-bold text-indigo-600">automatically connected & synced then and there</span> upon completing onboarding!
        </p>
      </div>

      <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start space-x-2 text-xs text-indigo-900">
        <span className="text-base">⚡</span>
        <p>
          <strong className="font-semibold">Instant Auto-Sync:</strong> You don't need to manually connect GitHub, LeetCode, Codeforces, or CodeChef later—CareerOS will auto-import your statistics as soon as you finish onboarding.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {linkFields.map((field) => {
          const currentVal = formData.links?.[field.id] || "";

          return (
            <div key={field.id}>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {field.label}
                </label>
                {field.autoConnect && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ⚡ Auto-Connects & Synced
                  </span>
                )}
              </div>
              <input
                type="text"
                value={currentVal}
                onChange={(e) =>
                  onChange("links", { ...formData.links, [field.id]: e.target.value })
                }
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileLinksStep;
