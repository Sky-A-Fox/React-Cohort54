type ButtonProps = {
  onAdd: () => void;
};

function Button({ onAdd }: ButtonProps) {
  return <button onClick={onAdd}>Add 1!</button>;
}

export default Button;
