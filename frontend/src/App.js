import React from "react";
import './style.css'; // Import the CSS file
import { Container, Row, Col } from "react-bootstrap";
import StockTable from "./StockTable";

const products = [];

function addProducts(quantity) {
  const titlestring = "Title"
  const artiststring = "Artist"
  const albumstring = "Album"
  const tagsstring = "Tag"
  for (let i = 0; i < quantity; i++) {
    products.push({
      title: (titlestring + " " + String(i)),
      artist: (artiststring + " " + String(i)),
      album: (albumstring + " " + String(i)),
      tags: (tagsstring + " " + String(i)),
    });
  }
}


addProducts(100);


const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar/>
        </Col>
        <Col xs={10}>
          <MainContent />
        </Col>
      </Row>
    </Container>
  );
}

function Sidebar() {
  return (
    <div className="bg-white p-3">
      <h3>Playlists</h3>
      <p>This is the sidebar content</p>
    </div>
  );
}


function MainContent() {
  return (
    <Container className="custom-background">
      <h1 className="mt-3 text-center custom-font">Tagify</h1>
      <hr />
      <StockTable products={products} />
    </Container>
  );
}

export default App;