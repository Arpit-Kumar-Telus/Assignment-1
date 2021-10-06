import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart, fetchCart, fetchFavoriteProducts, markFavorite, removeFavorite, viewedProduct } from "../../services";
import { favoriteProducts$, setAlert } from "../../store";
import { AddButton } from "../common/AddButton";
import { BuyButton } from "../common/BuyButton";
import { CustomRating } from "../common/Rating";

export const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(favoriteProducts$);

  const handleAddCart = (product) => {
    dispatch(viewedProduct(product))
    dispatch(addToCart(product)).then(() => {
      dispatch(fetchCart());
      dispatch(setAlert("Item added to cart!"));
    })
  }

  const isFavorite = useMemo(() => favoriteProducts.some((item) => item.id === product.id), [favoriteProducts, product]);

  const handleMarkFavorite = () => dispatch(markFavorite(product)).then(() => dispatch(fetchFavoriteProducts()))
  
  const handleRemoveFavorite = () => dispatch(removeFavorite(product.id)).then(() => dispatch(fetchFavoriteProducts()))

  return (
    <Card className="custom-card" key={product.id}>
      <Card.Img variant="top" src={product.avatar} width="80px" height="300px" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="star-container">
          <Card.Title className="truncate">{product.name}</Card.Title>
          {
            isFavorite 
              ? <FaHeart className="fav-icon" onClick={handleRemoveFavorite} />
              : <FaRegHeart className="fav-icon" onClick={handleMarkFavorite} />
          }
        </div>
        <div className="star-container">
          <Card.Text className="f-12">Price: ₹ {product.price}</Card.Text>
          <CustomRating rating={product.rating} readonly={true} />
        </div>
        <div className="d-flex flex-row justify-content-between">
          <AddButton onClick={() => handleAddCart(product)} />
          <BuyButton />
        </div>
      </Card.Body>
    </Card>
  );
};
