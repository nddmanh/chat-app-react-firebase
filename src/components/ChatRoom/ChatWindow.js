import { Avatar, Button, Input, Tooltip, Form, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import useFirestore from '../../hooks/useFirestore';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

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
  const { selectedRoom, setIsInviteMemberVisible } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }
  
  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['message']);

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const usersCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members
    };
  }, [selectedRoom.members]);

  const members = useFirestore('users', usersCondition);

  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore('messages', condition);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header-info">
          <p className="header-title">{selectedRoom.name}</p>
          <span className="header-description">{selectedRoom.description}</span>
        </div>

        <ButtonGroupStyled>
          <Button
            icon={<UserAddOutlined/>}
            type='text'
            onClick={() => setIsInviteMemberVisible(true)}
          >
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            {members.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ''
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      
      <ContentStyled>
        <MessageListStyled>
          {messages.map((mes) => (
            <Message
              key={mes.id}
              text={mes.text}
              photoURL={mes.photoURL}
              displayName={mes.displayName}
              createdAt={mes.createdAt}
            />
          ))}
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name="message">
            <Input
              ref={inputRef}
              onChange={handleInputChange}
              onPressEnter={handleOnSubmit}
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}
