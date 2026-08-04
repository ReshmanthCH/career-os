export const validateProfileData = (req, res, next) => {
  const {
    college,
    degree,
    branch,
    currentYear,
    graduationYear,
    targetRole,
    placementGoal,
    preferredDomain,
    skills,
    links,
  } = req.body;

  // Basic Details validation
  if (!college || college.trim() === "") {
    return res.status(400).json({ success: false, message: "College name is required." });
  }

  if (!degree || degree.trim() === "") {
    return res.status(400).json({ success: false, message: "Degree is required." });
  }

  if (!branch || branch.trim() === "") {
    return res.status(400).json({ success: false, message: "Branch is required." });
  }

  const validYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];
  if (!currentYear || !validYears.includes(currentYear)) {
    return res.status(400).json({ success: false, message: "Please select a valid current year." });
  }

  const numericGradYear = Number(graduationYear);
  if (!graduationYear || isNaN(numericGradYear) || numericGradYear < 2000 || numericGradYear > 2035) {
    return res.status(400).json({ success: false, message: "Please enter a valid graduation year (e.g. 2026)." });
  }

  // Career Goals validation
  if (!targetRole || targetRole.trim() === "") {
    return res.status(400).json({ success: false, message: "Target role is required." });
  }

  if (!placementGoal || placementGoal.trim() === "") {
    return res.status(400).json({ success: false, message: "Placement goal is required." });
  }

  if (!preferredDomain || preferredDomain.trim() === "") {
    return res.status(400).json({ success: false, message: "Preferred domain is required." });
  }

  // Skills validation
  const validSkills = ["Beginner", "Intermediate", "Advanced"];
  if (skills) {
    for (const key of ["dsa", "programming", "webDev", "coreCS", "aiMl"]) {
      if (skills[key] && !validSkills.includes(skills[key])) {
        return res.status(400).json({
          success: false,
          message: `Invalid skill level for ${key}. Must be Beginner, Intermediate, or Advanced.`,
        });
      }
    }
  }

  // Links URL validation if provided
  if (links) {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;
    for (const [key, value] of Object.entries(links)) {
      if (value && value.trim() !== "" && !urlPattern.test(value.trim())) {
        return res.status(400).json({
          success: false,
          message: `Please enter a valid URL for ${key}.`,
        });
      }
    }
  }

  next();
};
