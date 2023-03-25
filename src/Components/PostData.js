import React from 'react'
import {useEffect , useState} from 'react'

const PostData = () => {

    const [post , setPost] = useState([]);
    const [message , setMessage] = useState([]);
    const [ state, setState] = useState([]);
    const pincode = '281001';

    const fetchData = async()=>{
        try{
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setPost(json[0].PostOffice)
            setMessage(json[0].Message);
            setState(json[0].PostOffice[0].State);
        }catch(error){
            console.log("error",error);
        }
    };
    const url = ` https://api.postalpincode.in/pincode/${pincode}`
    useEffect(()=>{
       fetchData();
    },[]);

  return (

    <div>
          
          {console.log('hello',post)}

        <h3>Pincode : {message}</h3>
        <h3>Message : {state}</h3>
          <div className='postDetails'>
       
           {post.map((data)=>{
             return(
                 <div className='postCard'>
                <p>Post Office Name : {data.Name}  </p>
                <p>Pincode : {data.Pincode}</p>
                <p>District : {data.District} </p>
                 <p>State : {data.State}</p>
                 </div>
            )
           })}

        PostData
        <h1>Post Office Name :  </h1>
        <h3>Pincode : </h3>
        <h3>District : </h3>
        <h3>State : </h3>

    </div>
    </div>
  )
}

export default PostData