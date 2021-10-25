import React, { useContext } from 'react';
import { Row, Col, Alert } from 'antd';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { AppContext } from '../../Context/AppProvider';
import InviteMemberModal from '../Modals/InviteMemberModal';

export default function ChatRoom() {
  const { selectedRoom } = useContext(AppContext);

  return (
    <Row>
      <Col span={6}>
        <SideBar />
      </Col>
      <Col span={18}>
      {
        selectedRoom ? (
          <>
            <ChatWindow />
            <InviteMemberModal />
          </>
        ) : <Alert message="Hãy chọn phòng" type="info" showIcon style={{ margin: 5 }} closable />
      }
      </Col>
    </Row>
  )
}
