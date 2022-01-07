import { Layout } from 'antd'
import React, { useState } from 'react'
import { Header } from './component/Header'
import LeftSlider from './component/LeftSlider'
import MainLayout from './component/MainLayout'


interface Props {
    
}

export const Dashbroad = (props: Props) => {

    const [layoutSelectedIndex, setlayoutSelectedIndex] = useState(0)
    const onSelectedLayoutIndexChange = (index: number) =>{
      setlayoutSelectedIndex(index)
    }
    return (
        <div >
            <Header/>
        <Layout style={{ paddingTop: '10px' }} >
    
        <Layout>
        
          <LeftSlider onSelectedLayoutIndexChange={onSelectedLayoutIndexChange} />
          <MainLayout layoutSelectedIndex={layoutSelectedIndex} />
        </Layout>
      </Layout> 
    </div>
    )
}

