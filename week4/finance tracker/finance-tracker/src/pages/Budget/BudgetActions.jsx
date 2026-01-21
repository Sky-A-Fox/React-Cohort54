import styled from "styled-components";
import Button from "../../components/common/Button";
import { FolderOpen, Calendar, Plus } from "lucide-react";

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.$active ? "#667eea" : "#dee2e6")};
  background: ${(props) => (props.$active ? "#667eea15" : "white")};
  color: ${(props) => (props.$active ? "#667eea" : "#6c757d")};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.$active ? "#667eea15" : "#f8f9fa")};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;

    button {
      flex: 1;
      min-width: 140px;
    }
  }
`;

export default function BudgetActions({
  categories,
  activeFilter,
  onFilterChange,
  onOpenLoadModal,
  onOpenSaveModal,
  onOpenAddModal,
}) {
  return (
    <ActionsBar>
      <FilterButtons>
        <FilterTab
          $active={activeFilter === "all"}
          onClick={() => onFilterChange("all")}
        >
          All ({categories.length})
        </FilterTab>
        <FilterTab
          $active={activeFilter === "essential"}
          onClick={() => onFilterChange("essential")}
        >
          Essential ({categories.filter((c) => c.isEssential).length})
        </FilterTab>
        <FilterTab
          $active={activeFilter === "optional"}
          onClick={() => onFilterChange("optional")}
        >
          Optional ({categories.filter((c) => !c.isEssential).length})
        </FilterTab>
      </FilterButtons>

      <ActionButtons>
        <Button
          variant="secondary"
          onClick={onOpenLoadModal}
          title="Load previously saved months"
        >
          <FolderOpen size={18} />
          Load Month
        </Button>

        <Button
          variant="success"
          onClick={onOpenSaveModal}
          disabled={categories.length === 0}
          title={
            categories.length === 0
              ? "Add categories first"
              : "Save current month to history"
          }
        >
          <Calendar size={18} />
          Save Month
        </Button>

        <Button variant="primary" onClick={onOpenAddModal}>
          <Plus size={18} />
          Add Category
        </Button>
      </ActionButtons>
    </ActionsBar>
  );
}
