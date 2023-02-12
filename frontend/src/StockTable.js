/* eslint max-len: 0 */
/* eslint no-unused-vars: 0 */
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import React from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Select from "react-select";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import filterFactory, {
  Comparator,
  customFilter,
  FILTER_TYPES
} from "react-bootstrap-table2-filter";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

let filters = [];

export default class StockTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      portalReady: false
    };
    this.portal = React.createRef();
  }

  componentDidMount(prevProps) {
    this.setState({ portalReady: true });
  }

  getTextFilter = (onFilter, column) => {
    let ref = React.createRef();
    let clearFilter = () => {
      onFilter();
      if (ref.current) {
        ref.current.value = "";
      }
    };
    filters.push(clearFilter);
    return this.state.portalReady
      ? ReactDOM.createPortal(
          <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
            <FormControl
              ref={ref}
              placeholder={column.text}
              className="filter"
              onChange={(event) => onFilter(event.target.value)}
            />
          </Col>,
          document.getElementById("filter-container")
        )
      : null;
  };

  getCustomFilter = (onFilter, column, products) => {
    let ref = React.createRef();
    let clearFilter = () => {
      onFilter();
      if (ref.current) {
        ref.current.clearValue();
      }
    };
    filters.push(clearFilter);
    let options = [...new Set(products.map((field) => field[column.dataField]))]
      .sort((a, b) => {
        if (typeof a === "number") {
          return a - b;
        } else {
          return a < b ? -1 : 1;
        }
      })
      .map((entry) => ({
        label: entry,
        value: entry
      }));

    return this.state.portalReady
      ? ReactDOM.createPortal(
          <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
            <Select
              ref={ref}
              placeholder={column.text}
              isClearable
              isMulti
              options={options}
              className="filter"
              onChange={(event) => onFilter(event.map((entry) => entry.value))}
            />
          </Col>,
          document.getElementById("filter-container")
        )
      : null;
  };

  showContext = (event, row) => {
    this.setState({ activeRow: row });
    event.preventDefault();
    contextMenu.show({
      id: "context-menu",
      event: event
    });
  };

  render() {
    let { activeRow } = this.state;
    const rowEvents = {
      onClick: (e, row, index) => this.setState({ activeRow: row }),
      onContextMenu: (e, row, index) => {
        this.showContext(e, row);
      }
    };
    const rowStyle = (row) => {
      if (row === this.state.activeRow) {
        return {
          backgroundColor: "lightcyan",
          border: "solid 2px grey",
          color: "purple"
        };
      }
    };
    const columns = [
      {
        sort: true,
        dataField: "title",
        text: "Title",
      },
      {
        sort: true,
        dataField: "artist",
        text: "Artist",
      },
      {
        sort: true,
        dataField: "album",
        text: "Album",
      },
      {
        sort: true,
        dataField: "tags",
        filter: customFilter({
          type: FILTER_TYPES.MULTISELECT
        }),
        filterRenderer: (onFilter, column) =>
          this.getCustomFilter(onFilter, column, this.props.products),
        text: "Tags",

      },
    ];

    return (
      <div>
        <Row style={{ margin: "5px" }}>
          <Col>
            <Button
              className="btn btn-default w-100 shadow-none"
              onClick={() => this.setState({ filter: !this.state.filter })}
            >
              Filter
            </Button>
          </Col>
          <Col sm={{ span: 4, offset: 4 }} className="align-self-center">
            <Button
              hidden={!this.state.filter}
              className="btn btn-info text-white w-100 shadow-none"
              onClick={() => {
                filters.forEach((filter) => filter());
              }}
            >
              Clear Filter
            </Button>
          </Col>
        </Row>
        <legend />

        <Row hidden={!this.state.filter} id="filter-container"></Row>
        <legend />
        <BootstrapTable
          keyField="id"
          columns={columns}
          data={this.props.products}
          rowEvents={rowEvents}
          rowStyle={rowStyle}
          filter={filterFactory()}
        />
        <Menu id="context-menu">
          {activeRow && (
            <>
              <div className="text-center">{activeRow.name}</div>
              <Separator />
              {["Google", "Apple"].includes(activeRow.artist) && (
                <Submenu label="Contact" arrow=">">
                  <Item>Phone</Item>
                  <Item>Email</Item>
                </Submenu>
              )}
              <Item disabled={activeRow.isInStock !== "yes"}>Add Tag</Item>
            </>
          )}
        </Menu>
      </div>
    );
  }
}
