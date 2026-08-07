import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { submitOnboarding } from "../services/profileService";

import ProgressBar from "../components/onboarding/ProgressBar";
import WelcomeStep from "../components/onboarding/WelcomeStep";
import BasicDetailsStep from "../components/onboarding/BasicDetailsStep";
import CareerGoalsStep from "../components/onboarding/CareerGoalsStep";
import SkillAssessmentStep from "../components/onboarding/SkillAssessmentStep";
import ProfileLinksStep from "../components/onboarding/ProfileLinksStep";
import ReviewSubmitStep from "../components/onboarding/ReviewSubmitStep";

function Onboarding() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0 = Welcome, 1..5 = Wizard steps
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    branch: "",
    currentYear: "3rd Year",
    graduationYear: new Date().getFullYear() + 1,
    targetRole: "Software Development Engineer (SDE)",
    placementGoal: "Product Based Company (FAANG / Tier-1 Tech / Unicorns)",
    preferredDomain: "Software Engineering (DSA & Problem Solving)",
    dreamCompaniesInput: "",
    skills: {
      dsa: "Intermediate",
      programming: "Intermediate",
      webDev: "Intermediate",
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

  const handleFieldChange = (field, value) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCurrentStep = () => {
    setError("");
    if (step === 1) {
      if (!formData.college.trim()) return "Please enter your college or university name.";
      if (!formData.degree.trim()) return "Please enter your degree.";
      if (!formData.branch.trim()) return "Please enter your branch or department.";
      if (!formData.graduationYear) return "Please enter your expected graduation year.";
    }

    if (step === 2) {
      if (!formData.targetRole.trim()) return "Please select your target engineering role.";
      if (!formData.placementGoal.trim()) return "Please select your placement target.";
      if (!formData.preferredDomain.trim()) return "Please select your preferred development domain.";
    }

    return null;
  };

  const handleNext = () => {
    const err = validateCurrentStep();
    if (err) {
      setError(err);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");

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

      await submitOnboarding(payload);
      await refreshProfile();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Onboarding submission failed:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        {step === 0 ? (
          <WelcomeStep userName={user?.name} onStart={() => setStep(1)} />
        ) : (
          <div>
            <ProgressBar currentStep={step} totalSteps={5} />

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="min-h-[320px]">
              {step === 1 && (
                <BasicDetailsStep formData={formData} onChange={handleFieldChange} />
              )}
              {step === 2 && (
                <CareerGoalsStep formData={formData} onChange={handleFieldChange} />
              )}
              {step === 3 && (
                <SkillAssessmentStep formData={formData} onChange={handleFieldChange} />
              )}
              {step === 4 && (
                <ProfileLinksStep formData={formData} onChange={handleFieldChange} />
              )}
              {step === 5 && (
                <ReviewSubmitStep
                  formData={formData}
                  onEditStep={(stepNum) => setStep(stepNum)}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                />
              )}
            </div>

            {/* Step Action Buttons (Steps 1 to 4) */}
            {step > 0 && step < 5 && (
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  &larr; Previous
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow transition"
                >
                  Next Step &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
