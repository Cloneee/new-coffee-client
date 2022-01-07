import React from 'react'
import { OrderTable } from './common/OrderTable'
import { ProductTable } from './common/ProductTable'
interface Props {
    
}

export const OrderPage = (props: Props) => {
    
    return (
        
        <div className='row'>
           <ProductTable/>
           <OrderTable/>
        </div>
    )
}
