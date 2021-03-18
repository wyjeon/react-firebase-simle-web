import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { db } from './fb';

class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
    };
  }

  render() {
    return (
      <>
        <Button
          as="div"
          labelPosition="right"
          onClick={() =>
            this.setState(prevState => {
              return {
                likes: prevState.likes + 1,
              };
            })
          }
        >
          <Button color="red">
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {this.state.likes}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button basic color="blue" onClick={() => this.props.openModal()}>
            <Icon name="vine" />
            Visitors
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {this.props.visitors}
          </Label>
        </Button>
      </>
    );
  }
}

export default Buttons;
