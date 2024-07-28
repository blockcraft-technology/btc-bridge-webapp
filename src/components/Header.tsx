import { Layout, Menu, Row, Col } from 'antd';
import logo from '../assets/btc-bridge.svg';
import {  Link } from 'react-router-dom';
import { RoutesEnum } from '../core/routes.enum';
import { MenuOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
export const Header = () => {
    return (
        <AntHeader style={{ background: '#141414', padding: 0 }}>
        <Row justify="center">
        <Col xl={16} lg={16} md={18} sm={4} xs={4}>
            <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ height: 60, borderBottom: 0}} overflowedIndicator={<MenuOutlined />} >
              <Link to={RoutesEnum.Home} style={{ paddingTop: 10, paddingBottom: -10}}><img src={logo} alt="Logo" style={{ height: '40px', marginTop: '2px', marginRight: '25px' }} /></Link>
              <Menu.Item key="1">
                <Link to={RoutesEnum.Home}>Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={RoutesEnum.About}>About Project</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </AntHeader>
    )
}
