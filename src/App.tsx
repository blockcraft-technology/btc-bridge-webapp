import { ConfigProvider, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'

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
            <h1>hi</h1>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
