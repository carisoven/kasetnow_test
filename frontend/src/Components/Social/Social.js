import React, { useEffect, Fragment } from "react";
import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import "./Social.css";
import $ from "jquery";

const Social = () => {
  //Fix size UI
  useEffect(() => {
    $(document).ready(function () {
      var height = $(window).height();
      $(".sidemenusocial").css("height", height);
      $(".cardmenu").css("height", height);
    });
  }, []);

  return (
    <Fragment>
      <div className="socialpage">
        <Row>
          <Card className="cardmenu">
            <Button style={{margin:"5px"}}>Name Of User</Button>
            <Button style={{margin:"5px"}}>Feed</Button>
            <Button style={{margin:"5px"}}>Group</Button>
            <Button style={{margin:"5px"}}>Message</Button>
          </Card>
          <Col>
            <Card className="cardpost">
              <CardTitle>Hello</CardTitle>
              <CardText>dsklfjlksdjflsdjlf</CardText>
              <Button>Button</Button>
            </Card>
            <Card className="cardpost">
              <CardTitle>Hello</CardTitle>
              <CardText>dsklfjlksdjflsdjlf</CardText>
              <Button>Button</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default Social;
