import MarketplaceCard from "../MarketplaceCard/MarketplaceCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { useSearchParams} from 'react-router';

function MarketplaceCards() {

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);
  const [products, setProducts] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams();
  const [currentPage,setCurrentPage] = useState(+searchParams.get('page') || 1);
  

  async function getProducts(page){
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?page=${page}=1&limit=8`);
      const productsData = response.data;
      setProducts(productsData);
    }
    catch(error) {
      console.log(error);
      alert('Error while fetchiong data');
    }
  }

  function changePages(i){
    setCurrentPage(i);
    setSearchParams({page: i});
  }
  const paginationItems = [];
  for (let i = 1; i <= 10; i++) {
    paginationItems.push(
      <Pagination.Item onClick={changePages(i)} key={i} active={i === currentPage}>
        {i}
      </Pagination.Item>
    );
  }
  
  return (
    <Container fluid="xl">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <MarketplaceCard 
            title = {product.title} 
            description={product.description} 
            price={product.price} 
            image={product.image}
            rating={product.rating}/>
          </Col>
        ))}
      </Row>
      <Pagination size="lg">
        {paginationItems}
      </Pagination>
    </Container>
  );
}
export default MarketplaceCards;