import React from "react"
import { Skeleton } from '@mui/material';
//import { DotWave } from '@uiball/loaders'



const SkeletonItem = () => {
  return (
      <div style={{marginTop: 20}}>
        <Skeleton variant="rounded" width={180} height={300} sx={{ marginTop: '0.4rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem'}} width={180} />
      </div>
      // <DotWave 
      //   size={47}
      //   speed={1} 
      //   color="black" />
  )
}

export default SkeletonItem