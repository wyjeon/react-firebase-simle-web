import React from 'react';
import firebase from 'firebase';
import {
  Button,
  Divider,
  Grid,
  Icon,
  Image,
  Input,
  Label,
  Menu,
} from 'semantic-ui-react';
import Buttons from './Buttons';
import Comments from './Comments';
import VisitorModal from './VisitorModal';

import { auth } from './fb.js';

import img from './img.jpg';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '방문자',
      isModalOpen: false,
      visitors: ['mike'],
    };
  }

  toggleModal = () =>
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });

  render() {
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>WEB - TEST</h1>

        <VisitorModal
          isOpen={this.state.isModalOpen}
          closeModal={this.toggleModal}
          visitorsList={this.state.visitors}
        />

        <Menu widths={3}>
          <Menu.Item name="home" />
          <Menu.Item name={`${this.state.userName}님`} />
          <Menu.Item
            name="login"
            onClick={() => {
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                  /** @type {firebase.auth.OAuthCredential} */
                  var credential = result.credential;

                  // This gives you a Google Access Token. You can use it to access the Google API.
                  var token = credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  // ...
                  this.setState({ userName: user.displayName });
                })
                .catch(error => {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
            }}
          />
        </Menu>

        <Divider horizontal>
          <Icon name="home" />
          My Project
        </Divider>

        <Grid centered>
          <Grid.Row>
            <Image src={img} centered />
          </Grid.Row>
          <Grid.Row>
            <Buttons
              openModal={this.toggleModal}
              visitors={this.state.visitors.length}
            />
          </Grid.Row>
        </Grid>
        <br />

        <Divider horizontal>
          <Icon name="comment alternate" />
          댓글을 달아주세요
        </Divider>

        <Grid centered columns={3}>
          <Grid.Column>
            <Comments userName={this.state.userName} />
          </Grid.Column>
        </Grid>

        <Divider horizontal>
          <Icon name="phone volume" />
          Contact Me
        </Divider>
        <br />

        <Grid centered>
          <Button color="facebook">
            <Icon name="facebook" /> Facebook
          </Button>
          <Button color="instagram">
            <Icon name="instagram" /> Instagram
          </Button>
          <Button
            color="youtube"
            onClick={() => window.open('https://www.youtube.com/')}
          >
            <Icon name="youtube" /> YouTube
          </Button>
        </Grid>
      </>
    );
  }
}

export default App;
