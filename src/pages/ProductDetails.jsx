import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Button, Container, Image, Spinner } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import s from './ProductDetails.module.css';
import { PatchCheckFill, PalleteFillIcon, TagFillIcon, BoxFillIcon } from '../shared/Icons';

function ProductDetails() {

const [searchParams] = useSearchParams();
const navigate = useNavigate();
const params = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
    if(params.id) {
    fetchProductById(params.id);
    }
}, [params]);
async function fetchProductById(id){
    setLoading(true);
    try{
        const response = await axios.get(`https://fakestoreapi.in/api/products/${id}`);
        setProduct(response.data.product);
    }
    catch(err){
        console.log(err);
    }
    finally{
        setLoading(false);
    }
}
    function goToBack() {
    const backPage = searchParams.get('backPage');
    navigate(`/?page=${backPage}`);
    }   
    return(
        <Container fluid="lg" className='pt-4 pb-4'>
            <Button className='mb-4' onClick={goToBack} variant='secondary' size="sm">Back</Button>
            {loading ?(
                <div className={s.spinnerContainer}>
                <Spinner animation="border" variant="primary" />
            </div>
            ):
            !product
            ? <h1>Product not found</h1>
            : (
                <div className={s.container}>
                            {/* TODO: Проверку на изображение */}
                            <Image className={s.image} src={product.image} rounded />
                            <div className={s.productInformation}>
                                <Badge bg="info">{product.category}</Badge>
                                <h1 className={s.title}>{product.title}</h1>
                                <p>{product.description}</p>
                                {product?.brand && <p><PatchCheckFill /> <b>Brand:</b> <span className={s.brand}>{product.brand}</span></p>}
                                {product?.model && <p><BoxFillIcon /> <b>Model:</b> {product.model}</p>}
                                {product?.color && <p><PalleteFillIcon /> <b>Color:</b> {product.color}</p>}
                                <p>
                                    <TagFillIcon />
                                    <b>Price:</b>
                                    {' '}<span className={product?.discount ? s.discount : ''}>{product.price}$</span>
                                    {' '}{product?.discount &&
                                        <span className={s.priceWithDiscount}>
                                            {product.priceWithDiscount}$
                                            <Badge className={s.badge} pill bg="success">
                                                -{product?.discount}%
                                            </Badge>
                                        </span>
                                    }
                                </p>
                            </div>
                        </div>
            )
        }            
        </Container>
    )
}
export default ProductDetails;