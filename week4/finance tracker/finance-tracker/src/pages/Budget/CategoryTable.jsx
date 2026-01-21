import styled from "styled-components";
import CategoryRow from "./CategoryRow";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
`;

const TableBody = styled.tbody``;

const NoData = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 16px;
`;

export default function CategoryTable({ categories, onUpdate, onDelete }) {
  if (!categories || categories.length === 0) {
    return <NoData>No categories found. Add some to get started.</NoData>;
  }

  return (
    <Table>
      <TableHeader>
        <HeaderRow>
          <HeaderCell>Category</HeaderCell>
          <HeaderCell>Planned (€)</HeaderCell>
          <HeaderCell>Actual (€)</HeaderCell>
          <HeaderCell>Difference</HeaderCell>
          <HeaderCell>Essential</HeaderCell>
          <HeaderCell>Actions</HeaderCell>
        </HeaderRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
