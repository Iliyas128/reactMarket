import MarketplaceCard from "../MarketplaceCard/MarketplaceCard";
import s from './MarketplaceCards.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { useSearchParams } from "react-router";


function MarketplaceCards() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(+searchParams.get('page') || 1);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  async function getProducts(page) {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://fakestoreapi.in/api/products?page=${page}&limit=8`);
      const productsData = response.data.products;
      setProducts(productsData);
      console.log(productsData);
    }
    catch(error) {
      console.log(error);
      alert('Error while fetchiong data');
    }
    finally {
      setIsLoading(false);
    }
  }

  function changePages(i){
    setCurrentPage(i);
    setSearchParams({ page: i });
  }
  const paginationItem=[];
  for(let i = 1; i<=10; i++){
    paginationItem.push(
      <Pagination.Item onClick={() => changePages(i)} key={i} active={i === currentPage}>
          {i}
      </Pagination.Item>
    )
  }

  return (
    <Container fluid="xl">
      {
        isLoading ===true
        ? <div className={s.spinnerContainer}><Spinner animation="border" variant="primary" /></div>
        : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <MarketplaceCard 
            title = {product.title} 
            description={product.description} 
            price={product.price} 
            rating={product.discount}
            image={product.image}
            id = {product.id}/>
          </Col>
        ))}
      </Row>
        )
      }
      <Pagination className={s.marketPagination}>
        {paginationItem}
      </Pagination>
    </Container>
  );
}
export default MarketplaceCards;