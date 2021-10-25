import React, { useContext } from 'react';
import { Form, Input, Modal } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid }
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    // handle logic
    // Add new room to firestore
    addDocument('rooms', {
      ...form.getFieldsValue(),
      members: [uid]
    });

    // Reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleCancle  = () => {
    // Reset form value
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancle}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name='name'>
            <Input placeholder="Nhập tên phòng"/>
          </Form.Item>
          <Form.Item label="Mô tả" name='description'>
            <Input.TextArea placeholder="Nhập mô tả"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
