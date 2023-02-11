import React from "react";
import { Container } from "react-bootstrap";
import StockTable from "./StockTable";

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: Math.random().toString(36).substr(2).toUpperCase(),
      company: ["Apple", "Google", "Tesla", "Orion"][
        Math.floor(Math.random() * 4)
      ],
      quantity: Math.floor(Math.random() * 24),
      isInStock: ["yes", "no", "N/A"][Math.floor(Math.random() * 3)]
    });
  }
}

addProducts(100);

const App = () => {
  return (
    <Container>
      <h1 align="center">Bootstrap Table</h1>
      <hr />
      <StockTable products={products} />
    </Container>
  );
};

export default App;
