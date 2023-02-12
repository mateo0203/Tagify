import React from "react";
import './style.css'; // Import the CSS file
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import StockTable from "./StockTable";
import Sidebar from "./Conmponents/Sidebar"
import API from "./API";

const products = [];

function MainContent(props) {

  const products = [];

  function addProducts() {
    const titlestring = "Title"
    const artiststring = "Artist"
    const albumstring = "Album"
    const tagsstring = "Tag"
    for (let i = 0; i < props.tracks.length; i++) {
      console.log(props.tracks)
      products.push({
        title: props.tracks[i][0],
        artist: props.tracks[i][1],
        album: props.tracks[i][2],
        tags: (tagsstring + " " + String(i)),
      });
    }
  }
  
  addProducts(100);

  return (
    <Container className="custom-background">
      <h1 className="mt-3 text-center custom-font">Tagify</h1>
      <hr />
      <StockTable products={products} />
    </Container>
  );
}


const App = () => {
  const [tracks, setTracks] = useState([]);

  const CallBack = (songs) => {
      setTracks(songs);
  }
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar handleCallback={CallBack}/>
        </Col>
        <Col xs={10}>
          <MainContent tracks={tracks} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
