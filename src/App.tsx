import { ConfigProvider, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

const appTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: 'Open Sans',
    primaryColor: '#000'
  }
}

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <BrowserRouter>
        <Layout style={{ padding: 0, minHeight: '100vh' }}>
          <Content>
            <h1>hi</h1>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
