import { Col, ConfigProvider, Layout, Row, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { RoutesEnum } from './core/routes.enum'
import { About, FAQ, Home } from './pages'

const appTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: 'Open Sans',
    colorPrimary: '#f7931a',
  }
}

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <BrowserRouter>
        <Layout style={{ padding: 0, minHeight: '100vh' }}>
          <Header />
          <Content>
            <Row justify="center">
            <Col xl={10} lg={10} md={18} sm={24} xs={24} style={{ padding: 15}}>
                <Routes>
                  <Route path={RoutesEnum.Home} element={<Home />} />
                  <Route path={RoutesEnum.About} element={<About />} />
                  <Route path={RoutesEnum.FAQ} element={<FAQ />} />
                </Routes>
              </Col>
            </Row>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
