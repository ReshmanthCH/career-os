import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/layout/DashboardLayout";
import { updateProfile } from "../services/profileService";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const domainOptions = [
    "Web Development (Full Stack / Frontend / Backend)",
    "Artificial Intelligence & Machine Learning",
    "Data Science & Analytics",
    "Cloud Computing & DevOps",
    "Cybersecurity",
    "Mobile App Development",
    "Core Software Engineering",
  ];

  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    branch: "",
    currentYear: "3rd Year",
    graduationYear: 2026,
    targetRole: "",
    placementGoal: "",
    preferredDomain: "Web Development (Full Stack / Frontend / Backend)",
    dreamCompaniesInput: "",
    skills: {
      dsa: "Beginner",
      programming: "Beginner",
      webDev: "Beginner",
      coreCS: "Beginner",
      aiMl: "Beginner",
    },
    links: {
      github: "",
      linkedin: "",
      leetCode: "",
      codeforces: "",
      codeChef: "",
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        college: profile.college || "",
        degree: profile.degree || "",
        branch: profile.branch || "",
        currentYear: profile.currentYear || "3rd Year",
        graduationYear: profile.graduationYear || 2026,
        targetRole: profile.targetRole || "",
        placementGoal: profile.placementGoal || "",
        preferredDomain: profile.preferredDomain || "Web Development (Full Stack / Frontend / Backend)",
        dreamCompaniesInput: Array.isArray(profile.dreamCompanies)
          ? profile.dreamCompanies.join(", ")
          : "",
        skills: profile.skills || {
          dsa: "Beginner",
          programming: "Beginner",
          webDev: "Beginner",
          coreCS: "Beginner",
          aiMl: "Beginner",
        },
        links: profile.links || {
          github: "",
          linkedin: "",
          leetCode: "",
          codeforces: "",
          codeChef: "",
        },
      });
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLinkChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...(prev.links || {}),
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setMessage({ type: "", text: "" });

      const dreamCompanies = formData.dreamCompaniesInput
        ? formData.dreamCompaniesInput.split(",").map((c) => c.trim()).filter(Boolean)
        : [];

      const payload = {
        college: formData.college,
        degree: formData.degree,
        branch: formData.branch,
        currentYear: formData.currentYear,
        graduationYear: formData.graduationYear,
        targetRole: formData.targetRole,
        placementGoal: formData.placementGoal,
        preferredDomain: formData.preferredDomain,
        dreamCompanies,
        skills: formData.skills,
        links: formData.links,
      };

      await updateProfile(payload);
      await refreshProfile();

      setMessage({ type: "success", text: "Profile and platform links updated successfully!" });
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profile && !isEditing) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading profile..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {user?.name?.slice(0, 2).toUpperCase() || "ST"}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{user?.name}</h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {profile?.targetRole || "Student"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {profile?.preferredDomain || "Web Development"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {profile?.currentYear || "Enrolled"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow transition"
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-xl border text-xs ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {isEditing ? (
          /* Profile Edit Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Edit Student Profile</h2>

            {/* Academic Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Academic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">College</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Branch</label>
                  <input
                    type="text"
                    required
                    value={formData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    required
                    value={formData.graduationYear}
                    onChange={(e) => handleChange("graduationYear", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Career Goals & Domain */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Career Goals & Preferred Domain</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Target Role</label>
                  <input
                    type="text"
                    required
                    value={formData.targetRole}
                    onChange={(e) => handleChange("targetRole", e.target.value)}
                    placeholder="e.g. SDE-1, Full Stack Developer"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Engineering Domain</label>
                  <select
                    value={formData.preferredDomain}
                    onChange={(e) => handleChange("preferredDomain", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    {domainOptions.map((dom) => (
                      <option key={dom} value={dom}>
                        {dom}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Placement Goal</label>
                  <input
                    type="text"
                    required
                    value={formData.placementGoal}
                    onChange={(e) => handleChange("placementGoal", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Dream Companies (comma separated)</label>
                  <input
                    type="text"
                    value={formData.dreamCompaniesInput}
                    onChange={(e) => handleChange("dreamCompaniesInput", e.target.value)}
                    placeholder="e.g. Google, Microsoft, Amazon"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Coding & Social Links */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Coding & Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">GitHub Profile / Username</label>
                  <input
                    type="text"
                    value={formData.links.github || ""}
                    onChange={(e) => handleLinkChange("github", e.target.value)}
                    placeholder="e.g. https://github.com/username or username"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={formData.links.linkedin || ""}
                    onChange={(e) => handleLinkChange("linkedin", e.target.value)}
                    placeholder="e.g. https://linkedin.com/in/username"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">LeetCode Profile / Username</label>
                  <input
                    type="text"
                    value={formData.links.leetCode || ""}
                    onChange={(e) => handleLinkChange("leetCode", e.target.value)}
                    placeholder="e.g. https://leetcode.com/u/username or username"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Codeforces Username</label>
                  <input
                    type="text"
                    value={formData.links.codeforces || ""}
                    onChange={(e) => handleLinkChange("codeforces", e.target.value)}
                    placeholder="e.g. tourist or https://codeforces.com/profile/tourist"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CodeChef Profile / Username</label>
                  <input
                    type="text"
                    value={formData.links.codeChef || ""}
                    onChange={(e) => handleLinkChange("codeChef", e.target.value)}
                    placeholder="e.g. https://www.codechef.com/users/username or username"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Edit */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          /* Profile Details View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academics */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Academic Background</h2>
              <div className="text-xs space-y-2 text-gray-700">
                <div><span className="text-gray-500 font-medium">College:</span> {profile?.college}</div>
                <div><span className="text-gray-500 font-medium">Degree & Branch:</span> {profile?.degree} ({profile?.branch})</div>
                <div><span className="text-gray-500 font-medium">Current Status:</span> {profile?.currentYear}</div>
                <div><span className="text-gray-500 font-medium">Graduation Year:</span> {profile?.graduationYear}</div>
              </div>
            </div>

            {/* Career Objectives */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Career Aspirations</h2>
              <div className="text-xs space-y-2 text-gray-700">
                <div><span className="text-gray-500 font-medium">Target Role:</span> {profile?.targetRole}</div>
                <div><span className="text-gray-500 font-medium">Placement Goal:</span> {profile?.placementGoal}</div>
                <div><span className="text-gray-500 font-medium">Preferred Domain:</span> {profile?.preferredDomain}</div>
                <div>
                  <span className="text-gray-500 font-medium">Dream Companies:</span>{" "}
                  {profile?.dreamCompanies?.length > 0 ? profile.dreamCompanies.join(", ") : "None listed"}
                </div>
              </div>
            </div>

            {/* Skill Levels */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Technical Skill Matrix</h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {Object.entries(profile?.skills || {}).map(([key, lvl]) => (
                  <div key={key} className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <p className="text-gray-500 capitalize text-[10px] font-semibold">{key}</p>
                    <p className="font-bold text-indigo-700 mt-0.5">{lvl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Coding & Social Links</h2>
              <div className="space-y-2 text-xs">
                {Object.entries(profile?.links || {}).map(([key, url]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize font-medium text-gray-600">{key}:</span>
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline truncate max-w-[200px]">
                        {url}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Profile;
