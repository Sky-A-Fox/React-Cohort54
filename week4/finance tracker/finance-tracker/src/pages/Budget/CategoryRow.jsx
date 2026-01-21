import styled from "styled-components";
import { Check, X, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button";

const Row = styled.tr`
  &:hover {
    background: #58697a;

    .actions-cell button {
      opacity: 1;
    }
  }
`;

const Cell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
`;

const Input = styled.input`
  width: 100px;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  text-align: right;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const EssentialBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => (props.isEssential ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.isEssential ? "#155724" : "#721c24")};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ColorIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.color};
  margin-right: 10px;
  display: inline-block;
`;

const CategoryName = styled.span`
  font-weight: 500;
  color: #e1e423;
`;

const ActionsCell = styled(Cell)`
  display: flex;
  gap: 8px;

  button {
    opacity: ${(props) => (props.isEditing ? 1 : 0.6)};
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export default function CategoryRow({ category, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    planned: category.planned,
    actual: category.actual,
  });

  const difference = category.planned - category.actual;
  const isOverBudget = category.actual > category.planned;

  const handleSave = () => {
    onUpdate(category.id, "planned", editedValues.planned);
    onUpdate(category.id, "actual", editedValues.actual);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValues({
      planned: category.planned,
      actual: category.actual,
    });
    setIsEditing(false);
  };

  const handleToggleEssential = () => {
    onUpdate(category.id, "isEssential", !category.isEssential);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete category "${category.name}"? This action cannot be undone.`
      )
    ) {
      onDelete(category.id);
    }
  };

  return (
    <Row>
      <Cell>
        <ColorIndicator color={category.color} />
        <CategoryName>{category.name}</CategoryName>
      </Cell>

      <Cell>
        {isEditing ? (
          <Input
            type="number"
            value={editedValues.planned}
            onChange={(e) =>
              setEditedValues((prev) => ({
                ...prev,
                planned: Number(e.target.value),
              }))
            }
          />
        ) : (
          `€${category.planned}`
        )}
      </Cell>

      <Cell>
        {isEditing ? (
          <Input
            type="number"
            value={editedValues.actual}
            onChange={(e) =>
              setEditedValues((prev) => ({
                ...prev,
                actual: Number(e.target.value),
              }))
            }
          />
        ) : (
          `€${category.actual}`
        )}
      </Cell>

      <Cell
        style={{ color: isOverBudget ? "#dc3545" : "#28a745", fontWeight: 500 }}
      >
        €{Math.abs(difference)} {isOverBudget ? "over" : "under"}
      </Cell>

      <Cell>
        <EssentialBadge
          isEssential={category.isEssential}
          onClick={handleToggleEssential}
        >
          {category.isEssential ? <Check size={12} /> : <X size={12} />}
          {category.isEssential ? "Essential" : "Optional"}
        </EssentialBadge>
      </Cell>

      <ActionsCell isEditing={isEditing}>
        {isEditing ? (
          <>
            <Button variant="success" size="small" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsEditing(true)}
              title="Edit category"
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={handleDelete}
              title="Delete category"
            >
              <Trash2 size={14} />
            </Button>
          </>
        )}
      </ActionsCell>
    </Row>
  );
}
