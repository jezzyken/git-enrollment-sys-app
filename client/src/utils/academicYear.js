export const getCurrentAcademicYear = () => {
  const currentYear = new Date().getFullYear();
  return `${currentYear}-${currentYear + 1}`;
};