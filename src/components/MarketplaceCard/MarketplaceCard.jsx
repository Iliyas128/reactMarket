import Card from 'react-bootstrap/Card';
import {FilledStarIcon} from '../../shared/Icons';
import Button from 'react-bootstrap/Button';
import s from './MarketplaceCard.module.css';
import placeholderImage from '../../assets/image/placeholderImage.png';
import Placeholder from 'react-bootstrap/Placeholder';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function MarketplaceCard({ title, description, price, rating, image, id }) {
  const [imgCard, setImgCard] = useState('');
  const navigate = useNavigate();
  const [searchParams]= useSearchParams();

  useEffect(() => {
    if (!image) {
      setImgCard(placeholderImage);
      return;
    }
    testImage(image)
    .then((url) => setImgCard(url))
    .catch(() => {
      setImgCard(placeholderImage);
    });
  }, [image]);

  function testImage(url) {
    return new Promise((resolve, reject) => {
    const tester = new Image();
    tester.src = url;

    tester.onload = () => 
      resolve(url); // Устанавливаем URL изображения, если оно успешно загрузилось
    tester.onerror = () => 
      reject(); // Устанавливаем placeholder, если изображение не загрузилось    
  });
  }

  function gotoProductPage() {
    const currentPage = searchParams.get('page');
    navigate(`/product/${id}?backPage=${currentPage}`);

  }
  return (
    <Card className={s.card}>
      {!imgCard ? (
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder className={s.lazyLoad} xs={12} />
        </Placeholder>
      ) : (
        <Card.Img className={s.img} variant="top" src={imgCard} />
      )}
      <Card.Body>
        <Card.Title className={s.title}>{title}</Card.Title>
        <Card.Text>{price}$</Card.Text>
        <Card.Text className={s.description}>{description}</Card.Text>
        <Card.Text className={s.rating}>
          <FilledStarIcon /> {rating}
        </Card.Text>
        <Button onClick={gotoProductPage} style={{ width: '100%' }} variant="success">
          Order now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MarketplaceCard;