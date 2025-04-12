import Card from 'react-bootstrap/Card';
import FilledStarIcon from '../../shared/icons/FilledStarIcon';
import Button from 'react-bootstrap/Button';
import s from './MarketplaceCard.module.css';
import placeholderImage from '../../assets/image/placeholderImage.webp';

function MarketplaceCard({title, description, price, rating, image}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img className={s.img} variant="top" src={image || placeholderImage}/>
      <Card.Body>
        <Card.Title className={s.title}>{title}</Card.Title>
        <Card.Text>
          {price}$
        </Card.Text>
        <Card.Text className={s.description}>
          {description}
        </Card.Text>                                            
        <Card.Text className={s.rating}>
          <FilledStarIcon /> {rating.rate}
        </Card.Text>
      <Button style={{width:'100%'}} variant="success">Success</Button>
      </Card.Body>
    </Card>
    
  );
}

export default MarketplaceCard;