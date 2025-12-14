
type GuaranteeProps = {
  img: string;
  title: string;
  description: string;
};

function Guarantee({ img, title, description }: GuaranteeProps) {
  return (
    <div className="guarantee">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Guarantee;
