import React from 'react'
import Carousel from '../component/Navbar/Carousel'
import UploadDataset from '../component/UploadData/UploadDataset'
import UploadManualData from '../component/UploadData/UploadManualData'

function Home() {
  return (
    <div>
      <Carousel/>
      <UploadDataset/>
      <div className='border shadow-lg'></div>
      <UploadManualData/>
    </div>
  )
}

export default Home
