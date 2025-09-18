const applyRules = (lead, offer) => {
  let score = 0;

  // Role relevance (20 points)
  const idealUseCases = Array.isArray(offer.ideal_use_cases)
    ? offer.ideal_use_cases.join(" ")
    : offer.ideal_use_cases || "";

  const roleKeywords = idealUseCases.split(" ");
  const roleMatch = roleKeywords.some((keyword) =>
    lead.role.toLowerCase().includes(keyword.toLowerCase())
  );
  if (roleMatch) score += 20;

  // Industry match (20 points)
  const valueProps = Array.isArray(offer.value_props)
    ? offer.value_props.join(" ")
    : offer.value_props || "";

  if (lead.industry.toLowerCase() === valueProps.toLowerCase()) score += 20;

  // Data completeness (10 points)
  const requiredFields = [
    "name",
    "role",
    "company",
    "industry",
    "linkedin_bio",
  ];
  const completeness = requiredFields.every(
    (field) => lead[field] && lead[field].trim() !== ""
  );
  if (completeness) score += 10;

  return score;
};

export default applyRules;
