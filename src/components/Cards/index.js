import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToCart,
  fetchCart,
  markAndRemoveFavorite,
  updateProductInCart,
  viewedProduct,
} from "../../services";
import {
  setSuccessMessage,
  productsInCart$,
  products$,
  updateProducts,
  user$,
  setSelectedModal,
  setProductToBePurchase,
} from "../../store";
import { AddButton } from "../common/AddButton";
import { BuyButton } from "../common/BuyButton";
import { CustomRating } from "../common/Rating";
import { isEmpty } from "lodash";
import { MODALS } from "../../constants";
import "./card.css";

export const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);
  const products = useSelector(products$);
  const history = useHistory();
  const currentUser = useSelector(user$);

  const productDetailsInCart = productsInCart?.find(
    (e) => e.name === product.name
  );

  const handleAddCart = () => {
    if (isEmpty(currentUser)) {
      history.push("/login");
    } else {
      const isProductAlreadyInCart = productsInCart?.some(
        (item) => item.name === product.name
      );

      if (isProductAlreadyInCart) {
        const data = {
          id: productDetailsInCart.id,
          product: {
            ...productDetailsInCart,
            count: productDetailsInCart.count + 1,
          },
        };
        dispatch(updateProductInCart(data)).then(() => dispatch(fetchCart()));
      } else {
        const updatedProduct = { ...product, count: 1 };
        const productDetails = {
          createdAt: product.createdAt,
          name: product.name,
          avatar: product.avatar,
          description: product.description,
          price: product.price,
          rating: product.rating,
          category: product.category,
        };
        dispatch(viewedProduct(productDetails));
        dispatch(addToCart(updatedProduct)).then(() => {
          dispatch(fetchCart());
        });
      }

      dispatch(setSuccessMessage("Item added to cart!"));
    }
  };

  const handleBuy = () => {
    if (isEmpty(currentUser)) {
      history.push("/login");
    } else {
      dispatch(setProductToBePurchase(product));
      dispatch(setSelectedModal(MODALS.BUY_PRODUCT));
    }
  };

  const handleMarkAndRemoveFavorite = (product) => {
    const successMessage = product?.isFav
      ? "Item added to wishlist"
      : "Item removed from wishlist";

    dispatch(markAndRemoveFavorite({ id: product.id, product })).then(() => {
      dispatch(
        updateProducts(products.map((e) => (e.id === product.id ? product : e)))
      );

      dispatch(setSuccessMessage(successMessage));
    });
  };

  return (
    <Card className="custom-card" key={product.id}>
      <Card.Img
        variant="top"
        src={product.avatar}
        width="80px"
        height="300px"
        className="p-3 curson-pointer"
        onClick={() => history.push(`/products/${product.id}`)}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="heading truncate">{product.name}</Card.Title>
        <div className="fav-container">
          {isEmpty(currentUser) || !product?.isFav ? (
            <FaRegHeart
              className="fav-icon"
              onClick={() => {
                isEmpty(currentUser)
                  ? history.push("/login")
                  : handleMarkAndRemoveFavorite({ ...product, isFav: true });
              }}
            />
          ) : (
            <FaHeart
              className="fav-icon"
              onClick={() =>
                handleMarkAndRemoveFavorite({ ...product, isFav: false })
              }
            />
          )}
        </div>
        <Card.Text className="ellipsis desc">{product.description}</Card.Text>
        <div className="star-container">
          <Card.Text className="desc">Price: $ {product.price}</Card.Text>
          <CustomRating rating={product.rating} readonly={true} />
        </div>
        <div className="d-flex flex-row justify-content-between">
          <AddButton
            onClick={handleAddCart}
            isDisabled={productDetailsInCart?.count === 5}
          />
          <BuyButton onClick={handleBuy} />
        </div>
      </Card.Body>
    </Card>
  );
};
