type CountProps = {
  count: number;
};

function Count({ count }: CountProps) {
  return <h2>{count}</h2>;
}

export default Count;
