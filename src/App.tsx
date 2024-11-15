import { Stack } from '@fluentui/react'
import './App.css'
import Navbar from './assets/components/Navbar'
import Header from './assets/components/Header'
import Content from './assets/components/Content'

const App = () => {


  return (
    <div>
       <Stack horizontal >
      <Navbar />
      <Stack verticalFill styles={{root: { width: 1400, height: 'auto' }}} >
      <Header />
      <Content />
      </Stack>
      </ Stack>
    </div>
  )

}

export default App
