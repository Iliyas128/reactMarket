import Card from 'react-bootstrap/Card';
import FilledStarIcon from '../../shared/icons/FilledStarIcon';
import Button from 'react-bootstrap/Button';
import s from './MarketplaceCard.module.css';
import placeholderImage from '../../assets/image/placeholderImage.webp';
import Placeholder from 'react-bootstrap/Placeholder';
import { useEffect, useState } from 'react';


function MarketplaceCard({title, description, price, rating, image}) {
  
  const [imgCard, setImgCard] = useState('');

  useEffect(() => {
    testImage(image);
  }
  , [image]);

  function testImage (url){
    const tester = new Image();
    tester.src = url;
    tester.onerror = () => {
      setImgCard(placeholderImage);
    }
    tester.onload = ()=> {
      setImgCard(url);
    }
  }
  
  
  return (
    <Card className={s.card}>
      {!imgCard 
       ?(
        <Placeholder as={Card.Title} animation="glow">
            <Placeholder className={s.lazyLoad} xs={12} />
          </Placeholder>
       ):
       <Card.Img className={s.img} variant="top" src={imgCard}/>
      }
      <Card.Body>
        <Card.Title className={s.title}>{title}</Card.Title>
        <Card.Text>
          {price}$
        </Card.Text>
        <Card.Text className={s.description}>
          {description}
        </Card.Text>                                            
        <Card.Text className={s.rating}>
          <FilledStarIcon /> {rating}
        </Card.Text>
      <Button style={{width:'100%'}} variant="success">Success</Button>
      </Card.Body>
    </Card>    

  );
}

export default MarketplaceCard;