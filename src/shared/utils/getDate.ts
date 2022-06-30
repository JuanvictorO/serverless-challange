export function getDate(date: Date) {
  const today = new Date();
  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();

  const conditionMonth = today.getMonth() - birthDate.getMonth();

  if (conditionMonth < 0 || (conditionMonth === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
