import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Loader } from "semantic-ui-react";
import gql from "graphql-tag";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.listarProductos);
    }
  }, [data]);

  const available = products && products.filter((product) => product.units > 0);

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <h1 style={{ marginTop: 20 }}>Available products</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          available &&
          available.map((product) => (
            <Grid.Column key={product.id} style={{ marginBottom: 20 }}>
              <ProductCard product={product} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_PRODUCTS_QUERY = gql`
  {
    listarProductos {
      id
      name
      description
      price
      units
    }
  }
`;

export default Home;
