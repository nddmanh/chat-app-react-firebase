import React from 'react'
import { Button, Avatar, Typography } from 'antd'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UseInfo() {
  return (
    <WrapperStyled>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text className='username'>Xin chào</Typography.Text>
      </div>
      <Button ghost>Đăng xuất</Button>
    </WrapperStyled>
  )
}
