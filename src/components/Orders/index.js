import React, { Fragment } from "react";
import { Accordion, Card, Col, Row, Image } from "react-bootstrap";
import "bootstrap-daterangepicker/daterangepicker.css";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { CustomDateRange } from "../common/DateRangePicker";
import { Icons } from "../../resources";

export const OrdersComponent = ({
  handleCallback,
  products,
  isOrdersLoading,
}) => {
  return (
    <div className="order-container">
      <Row>
        <Col sm={12} md={6}>
          <h5 className="d-flex align-items-center">Previous Orders</h5>
        </Col>
        <Col sm={12} md={6} className="filter-container">
          <h5>Filter by Date : </h5>
          <div className="date-picker-input">
            <CustomDateRange handleCallback={handleCallback} />
          </div>
        </Col>
      </Row>
      <Accordion>
        {products.includes(1) && !isOrdersLoading ? (
          <div className="no-found-image">
            <Image src={Icons.noResult} alt="No Result Found" />
          </div>
        ) : (
          products.map((order) => {
            return isOrdersLoading ? (
              <Skeleton height="54.2px" className="mb-20" key={order} />
            ) : (
              <Accordion.Item
                eventKey={order.id}
                key={order.id}
                className="custom-accordion-item"
              >
                <Accordion.Header className="orders-toggle-button">
                  <div className="custom-accordion-header">
                    <span>{`Order Id : ${order.id}`}</span>
                    <span>{`Order On : ${moment(order.orderAt).format(
                      "MMM Do YYYY"
                    )}`}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <h5 className="orders-card-heading">Items :</h5>
                  <Card>
                    <Card.Body>
                      {order?.orderItems?.map((item, i) => (
                        <Fragment key={item.id}>
                          <Row className="mb-3" key={item.id}>
                            <Col>
                              <Image
                                src={item.avatar}
                                alt={item.name}
                                className="cart-image"
                              />
                            </Col>
                            <Col>
                              <p className="info">{item.name}</p>
                              <p className="info">Price: Rs. {item.price}</p>
                              <p className="info">
                                Quantity: {item?.quantity || 1}
                              </p>
                              <p>{item.description}</p>
                            </Col>
                          </Row>
                          {order.orderItems.length - 1 !== i && <hr />}
                        </Fragment>
                      ))}
                    </Card.Body>
                  </Card>
                  <div className="orders-price-container">
                    <p>Price: </p>
                    <p className="info">Rs. {order.totalAmount}</p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        )}
      </Accordion>
    </div>
  );
};
