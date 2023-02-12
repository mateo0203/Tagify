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
  const buttons = [];
  for (let i = 1; i <= 10; i++) {
    buttons.push(
      <button key={i} className="btn" style={{backgroundColor: "white", color: "black", borderRadius: "5px", padding: "5px 10px", margin: "5px 0", fontWeight: "bold", transition: "background-color 0.2s", boxShadow: "none", outline: "none"}}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "lightgrey";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.outline = "none";
        }}>
        Button {i}
      </button>
    );
  }

  return (
    <div style={{backgroundColor: "white", padding: "20px", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto"}}>
      <h3 style={{color: "black"}}>Playlists</h3>
      <div style={{display: "flex", flexDirection: "column"}}>
        {buttons}
      </div>
      <p style={{color: "black"}}>This is the sidebar content</p>
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
