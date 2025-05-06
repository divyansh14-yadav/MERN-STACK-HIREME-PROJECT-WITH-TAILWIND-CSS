import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../nav'
import OtherNav from '../otherNav'
import Footer from '../footer'

const PaymentWithdraws = props => {
    return (
        <div>
             <div className='bg-[#eef2f8] pb-10'>
            
            <OtherNav />
            <div className='w-[80%] m-auto bg-white text-start rounded-md p-4 mt-15'>
                <div>
                <h1 className='border-b-1 border-b-neutral-200 pb-3 mt-2 text-[1.25rem] text-[#495463] font-bold'>Withdraws </h1>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}


export default PaymentWithdraws