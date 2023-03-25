// import React from 'react'
// import {useEffect , useState} from 'react'

// const PostData = () => {

//     const [post , setPost] = useState([]);
//     const pincode = '281001';

//     const fetchData = async()=>{
//         try{
//             const response = await fetch(url);
//             const json = await response.json();
//             console.log(json);
//             setPost(json)
//         }catch(error){
//             console.log("error",error);
//         }
//     };
//     const url = ` https://api.postalpincode.in/pincode/${pincode}`
//     useEffect(()=>{
//        fetchData();
//     },[]);

//   return (

//     {console.log(post);}

//     <div className='postDetails'>
//         {/* <h3>Pincode : {post[0].Message}</h3> */}
//         {/* <h3>Message : {post[0].PostOffice[0].State}</h3> */}
//           {/* {post.map((data)=>{
//             return(
//                 <div className='postCard'>
//                 <p>Post Office Name : {data[0].PostOffice.Name}  </p>
//                 <p>Pincode : {data[0].PostOffice.Pincode}</p>
//                 <p>District : {data[0].PostOffice.District} </p>
//                 <p>State : {data[0].PostOffice.State}</p>
//                 </div>
//             )
//           })} */}
        

//     </div>
//   )
// }

// export default PostData