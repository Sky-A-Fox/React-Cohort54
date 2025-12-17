interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductsListProps {
  products: Product[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          {/* <p>{product.price} €</p> */}
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
