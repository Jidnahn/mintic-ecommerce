import React from "react";
import { Item, Icon, Label, Button } from "semantic-ui-react";

const ProductCard = ({ product: { id, name, description, price, units } }) => {
  return (
    <Item.Group>
      <Item>
        <Item.Image src="https://f4.bcbits.com/img/a1976873474_10.jpg" />

        <Item.Content>
          <Item.Header as="a">{name}</Item.Header>
          <Item.Meta>
            <span className="cinema">${price}</span>
          </Item.Meta>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Button className="primary" animated="vertical">
              <Button.Content hidden>Buy</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
            <Label>{units} left</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default ProductCard;
