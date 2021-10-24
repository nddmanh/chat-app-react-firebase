import { Avatar, Button, Input, Tooltip, Form } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-item: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-title {
      margin: 0;
      font-weight: bold;
    }

    &-description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function ChatWindow() {
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header-info">
          <p className="header-title">Room 1</p>
          <span className="header-description">Day la room 1</span>
        </div>

        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined/>} type='text'>
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar> A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      
      <ContentStyled>
        <MessageListStyled>
          <Message text="Test" photoURL={null} displayName="manh" createdAt={123123123} />
          <Message text="Test" photoURL={null} displayName="manh" createdAt={123123123} />
          <Message text="Test" photoURL={null} displayName="manh" createdAt={123123123} />
          <Message text="Test" photoURL={null} displayName="manh" createdAt={123123123} />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input placeholder="Nhập tin nhắn..." bordered={false} autoComplete="off" />
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}
