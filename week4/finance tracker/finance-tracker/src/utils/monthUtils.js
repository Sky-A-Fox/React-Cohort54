// Обновляем calculateMonthData:
export const calculateMonthData = (monthData) => {
  // Budget (totalPlanned)
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

  // Количество категорий
  const categoryCount = monthData.categories?.length || 0;

  return {
    totalPlanned, // ← Бюджет
    totalSpent, // ← Потрачено
    balance, // ← Баланс
    categoryCount,
  };
};
