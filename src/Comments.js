import React from 'react';
import { Comment, Form, Button, Header } from 'semantic-ui-react';
import moment from 'moment';
import { db } from './fb.js';

function SingleComment(detail) {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{detail.info.userName}</Comment.Author>
        <Comment.Metadata>
          <div>{detail.info.time}</div>
        </Comment.Metadata>
        <Comment.Text>{detail.info.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action
            onClick={() => {
              if (
                detail.info.userName === detail.userName &&
                detail.userName !== '방문자'
              ) {
                db.collection('comments')
                  .doc(detail.info.id)
                  .delete()
                  .then(res => alert('삭제되었습니다.'));
              } else {
                alert('본인만 삭제할 수 있습니다.');
              }
            }}
          >
            삭제
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      inputContent: '',
      inputTime: '',
      userName: '',
      commentList: [],
    };
  }

  componentDidMount = () => {
    db.collection('comments')
      .get()
      .then(ss => {
        let comments = [];
        ss.forEach(doc => {
          comments.push(Object.assign(doc.data(), { id: doc.id }));
        });
        return comments;
      })
      .then(res => {
        this.setState({ commentList: res });
      });
  };

  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {this.state.commentList.map(comments => (
          <SingleComment info={comments} userName={this.props.userName} />
        ))}

        <Form reply>
          <Form.TextArea
            value={this.state.inputContent}
            placeholder="댓글을 입력하세요"
            onChange={e =>
              this.setState({
                inputContent: e.target.value,
              })
            }
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            onClick={() => {
              if (this.state.inputContent !== '') {
                this.setState(
                  prevState => {
                    let newComment = {
                      content: this.state.inputContent,
                      time: moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초'),
                      userName: this.props.userName,
                    };

                    return {
                      commentList: [...prevState.commentList, newComment],
                      inputContent: '',
                    };
                  },
                  () =>
                    db
                      .collection('comments')
                      .add(
                        this.state.commentList[
                          this.state.commentList.length - 1
                        ]
                      )
                );
              } else {
                alert('내용을 입력하세요');
              }
            }}
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default Comments;
