import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { X } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #333;
      background: #f8f9fa;
      border-radius: 4px;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #333;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #e9ecef;
  }

  input {
    width: 18px;
    height: 18px;
    margin: 0;
  }
`;

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [newCategory, setNewCategory] = useState({
    name: "",
    planned: "",
    isEssential: false,
  });

  if (!isOpen) return null;

  const handleSave = () => {
    const name = newCategory.name.trim();
    if (!name) {
      alert("Please enter category name");
      return;
    }

    const plannedAmount = parseFloat(newCategory.planned) || 0;

    onAddCategory(name, plannedAmount, newCategory.isEssential);
    setNewCategory({ name: "", planned: "", isEssential: false });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Add New Category</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </ModalHeader>

        <FormGroup>
          <Input
            label="Category Name"
            placeholder="e.g., Groceries, Rent, Entertainment"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Planned Amount (€)"
            type="number"
            min="0"
            step="10"
            placeholder="0"
            value={newCategory.planned}
            onChange={(e) =>
              setNewCategory((prev) => ({
                ...prev,
                planned: e.target.value,
              }))
            }
          />
        </FormGroup>

        <FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={newCategory.isEssential}
              onChange={(e) =>
                setNewCategory((prev) => ({
                  ...prev,
                  isEssential: e.target.checked,
                }))
              }
            />
            Essential Expense (required spending like rent, food, utilities)
          </CheckboxLabel>
        </FormGroup>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Add Category
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
