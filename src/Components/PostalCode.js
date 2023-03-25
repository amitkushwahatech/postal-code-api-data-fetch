import React from 'react'
import PostData from './PostData'

const PostalCode = () => {
  return (
    <div>
        <h1> Enter Pincode</h1>
        <input type="text" placeholder='pincode' name='pcode' />
        <button>Lookup</button>
        <PostData/>
        </div>
  )
}

export default PostalCode