import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteProducts } from '../infra';
import { favoriteProducts$ } from '../selectors'
import CardComponent from './CardComponents';
import Skeleton from 'react-loading-skeleton';

const MOCK_ARRAY = [1,2,3,4,5,6,7,8];

export default function FavoriteComponent() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(favoriteProducts$);

    useEffect(() => {
        dispatch(fetchFavoriteProducts())
    }, [dispatch])

    const arrayToDisplay = favoriteProducts.length > 0 ? favoriteProducts : MOCK_ARRAY;

    return (
        <div className="m-2">
            <h4 className="fav-heading">My Wishlist</h4>
            <Row>
            {arrayToDisplay.map((product) => (
                <Col sm={12} md={4} lg={3} key={product.id}>
                    {favoriteProducts.length > 0 
                        ? <CardComponent product={product} /> 
                        : <Card className="skeleton-custom-card" key="s1">
                                <Skeleton height="300px" />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Skeleton height={38} />
                                    <Skeleton height={38} />
                                    <Skeleton height={38} />
                                </Card.Body>
                            </Card> 
                    }
                </Col>
            ))}
            </Row>
        </div>
    )
}
