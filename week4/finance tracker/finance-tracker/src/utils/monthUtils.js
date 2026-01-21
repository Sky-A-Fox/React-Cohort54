// Обновляем calculateMonthData: - update calculateMonthData:
export const calculateMonthData = (monthData) => {
  const totalPlanned =
    monthData.summary?.totalPlanned ||
    monthData.categories?.reduce((sum, cat) => sum + (cat.planned || 0), 0) ||
    0;

  // Spent (totalSpent)
  let totalSpent = 0;
  if (monthData.summary?.totalSpent !== undefined) {
    totalSpent = monthData.summary.totalSpent;
  } else if (monthData.categories && monthData.categories.length > 0) {
    totalSpent = monthData.categories.reduce((sum, cat) => {
      return sum + (cat.actual || 0);
    }, 0);
  }

  // Balance = Budget - Spent
  const balance = totalPlanned - totalSpent;

  // Количество категорий - number of categories
  const categoryCount = monthData.categories?.length || 0;

  return {
    totalPlanned, // ← Бюджет - budget
    totalSpent, // ← Потрачено - spent
    balance, // ← Баланс - balance
    categoryCount,
  };
};
