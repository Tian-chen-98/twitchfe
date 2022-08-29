import { Layout, Row, Col, Button } from "antd";
import Register from "./Register";
import Login from "./Login";
import React from "react";
import Favorites from "./favorites";

const { Header } = Layout;

function PageHeader({
  loggedIn,
  signoutOnClick,
  signinOnSuccess,
  favoriteItems,
}) {
  return (
    <Header>
      <Row justify="space-between">
        {/* pass to favorites.js and show My Favorite */}
        <Col>{loggedIn && <Favorites favoriteItems={favoriteItems} />}</Col>
        <Col>
          {/* display after loggedin */}
          {loggedIn && (
            <Button shape="round" onClick={signoutOnClick}>
              Logout
            </Button>
          )}
          {/* display before loggedin */}
          {!loggedIn && (
            <>
              <Login onSuccess={signinOnSuccess} />
              <Register />
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}

export default PageHeader;
