/* components/RestaurantList/index.js */
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Container,
} from "reactstrap";

function Dishes({ restId, query }) {
  const [restaurantId, setRestaurantId] = useState();
  const { addItem } = useContext(AppContext);

  const GET_RESTAURANT_DISHES = gql`
    query ($restaurantId: ID!) {
      restaurant(id: $restaurantId) {
        data {
          id
          attributes {
            name
            dishes {
              data {
                id
                attributes {
                  name
                  description
                  price
                  image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { restaurantId: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;
  console.log(restId);
  let restaurant = data.restaurant;
  // console.log(restaurant.data.attributes.dishes.data[0]);

  if (restId > 0) {
    return (
      <>
        {restaurant.data.attributes.dishes.data.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={{ res }.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 150, width: 150 }}
                src={`http://localhost:1337${res.attributes.image.data.attributes.url}`}
              />
              <CardBody>
                <CardTitle>{res.attributes.name}</CardTitle>
                <CardText>{res.attributes.description}</CardText>
                <CardText>{res.attributes.price}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="secondary"
                  outline
                  onClick={() => addItem({ res })}
                >
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
        {/* {restaurant.data.attributes.dishes.data.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 150, width: 150 }}
                src={`http://localhost:1337${res.attributes.image.data.attributes.url}`}
              />
              <CardBody>
                <CardTitle>{res.attributes.name}</CardTitle>
                <CardText>{res.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button color="secondary" outline onClick={() => addItem(res)}>
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))} */}
      </>
    );
  } else {
    return <h1> No Dishes</h1>;
  }
}
export default Dishes;
