import React from "react";

function SectionAnalysis({ sectionAnalysis, formattingChecks }) {
  const sections = [
    { label: "Full Name & Header", present: sectionAnalysis?.hasName ?? true },
    { label: "Education Section", present: sectionAnalysis?.hasEducation ?? true },
    { label: "Technical Skills Matrix", present: sectionAnalysis?.hasSkills ?? true },
    { label: "Projects & Architecture", present: sectionAnalysis?.hasProjects ?? true },
    { label: "Work Experience / Internships", present: sectionAnalysis?.hasExperience ?? false },
    { label: "Certifications & Achievements", present: sectionAnalysis?.hasCertifications ?? false },
    { label: "Email Address", present: sectionAnalysis?.hasContactInfo?.email ?? true },
    { label: "Phone Contact Number", present: sectionAnalysis?.hasContactInfo?.phone ?? false },
    { label: "LinkedIn URL Profile", present: sectionAnalysis?.hasContactInfo?.linkedin ?? false },
    { label: "GitHub Codebase URL", present: sectionAnalysis?.hasContactInfo?.github ?? false },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          ATS Section Audit Checklist
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">
          Format: {formattingChecks?.resumeLength || "1 Page"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {sections.map((sec) => (
          <div
            key={sec.label}
            className={`p-3 rounded-xl border flex items-center justify-between ${
              sec.present
                ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                : "bg-gray-50 border-gray-200 text-gray-400"
            }`}
          >
            <span className="font-semibold">{sec.label}</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                sec.present
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {sec.present ? "Detected" : "Missing"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionAnalysis;
