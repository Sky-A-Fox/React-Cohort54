import { useState } from "react";
import styled from "styled-components";
import { useFinance } from "../../hooks/useFinance";
import BudgetHeader from "./BudgetHeader";
import BudgetActions from "./BudgetActions";
import BudgetSummary from "./BudgetSummary";
import CategoryTable from "./CategoryTable";
import BudgetTips from "./BudgetTips";
import AddCategoryModal from "./AddCategoryModal";
import LoadMonthModal from "./LoadMonthModal";
import SaveMonthModal from "./SaveMonthModal";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

export default function Budget() {
  const {
    categories,
    updateCategory,
    addCategory,
    deleteCategory,
    totalPlanned,
    totalActual,
    income, // ← Теперь используется!
    saveMonth,
    clearCategories,
    loadMonthData,
    getMonthName,
  } = useFinance();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLoadMonth = (monthData) => {
    if (
      !window.confirm("Load this month? Current categories will be replaced.")
    ) {
      return;
    }

    clearCategories();
    loadMonthData(monthData);
    setShowLoadModal(false);
    alert(
      `✅ Month ${getMonthName(monthData.month)} ${monthData.year} loaded!`
    );
  };

  const handleSaveMonth = (year, month, name) => {
    if (categories.length === 0) {
      alert("Please add some categories before saving the month");
      return;
    }

    saveMonth(year, month, name);
    alert(`✅ Month "${name}" saved!`);
  };

  const filteredCategories = categories.filter((category) => {
    switch (activeFilter) {
      case "essential":
        return category.isEssential;
      case "optional":
        return !category.isEssential;
      default:
        return true;
    }
  });

  // ИСПРАВЛЕНО: Используем income для расчёта баланса
  const overallBalance = (income || 0) - totalActual;

  return (
    <PageContainer>
      <BudgetHeader categoriesCount={categories.length} />

      <BudgetSummary totalPlanned={totalPlanned} totalActual={totalActual} />

      <BudgetActions
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onOpenLoadModal={() => setShowLoadModal(true)}
        onOpenSaveModal={() => setShowSaveModal(true)}
        onOpenAddModal={() => setShowAddModal(true)}
      />

      <CategoryTable
        categories={filteredCategories}
        onUpdate={(id, field, value) => updateCategory(id, field, value)}
        onDelete={deleteCategory}
      />

      <BudgetTips categories={categories} />

      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCategory={addCategory}
      />

      <LoadMonthModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onLoadMonth={handleLoadMonth}
        getMonthName={getMonthName}
        formatCurrency={formatCurrency}
      />

      <SaveMonthModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveMonth}
        currentCategories={categories}
      />
    </PageContainer>
  );
}
