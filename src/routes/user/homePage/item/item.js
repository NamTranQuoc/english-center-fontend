import React from "react";
import {Card, Col, Row} from "antd";
import ItemFirst from "./ItemFirst";
import ItemSecond from "./ItemSecond";
import ItemThird from "./ItemThird";

function ItemCard(props) {
    return (
        <Card title={props.title} headStyle={{textAlign: "center", fontSize: "30px", backgroundColor: "#e38110"}}>
            <div className="gx-price-tables gx-pt-circle">
                <Row justify="center">
                    {props.item.map((item, index) => {
                        const f = index % 3;
                        switch (f) {
                            case 0:
                                return <Col xl={8} lg={8} md={8} xs={16}>
                                    <ItemFirst props={item}/>
                                </Col>
                            case 1:
                                return <Col xl={8} lg={8} md={8} xs={16}>
                                    <ItemSecond props={item}/>
                                </Col>
                            default:
                                return <Col xl={8} lg={8} md={8} xs={16}>
                                    <ItemThird props={item}/>
                                </Col>
                        }
                    })}
                </Row>
            </div>
        </Card>
    );
};

export default ItemCard;
