import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProduct, setSearchProduct] = useState("");
  const { getProducts } = useAPI();

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const filteredProducts = products.filter((product)=>{
        product.title.toLowerCase()
    });
    setProducts(filteredProducts);
  };

  return (

    <div className="flex-1 flex flex-col gap-4 p-4">
      <h1>FakeStore</h1>

      <div>
        <input
          type="text"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductItem key={product} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;