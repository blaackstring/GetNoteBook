import axios from "axios"
export const S3urlReq=async()=>{
  try {
    console.log('hii')
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-Presigned-Url`)
    const data=await res.data
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("Error fetching  URL:", error);
    throw error;
  }
}

export const S3fileUpload=async(payload,url)=>{
  try {
    console.log(payload,url)
    console.log('hii')
    const res=await axios.put(url,payload,{  
      headers:{
            "Content-Type":payload.type
        }
    })
    const data=await res.data
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching  URL:", error);
    throw error;
  }
}



export const pdfUploadForEmbeddings=async(url)=>{
  try {
    console.log('uploading for embeddings', url)
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/upload_pdf`, {url}, {  
      headers:{
            "Content-Type":"application/json"
        }
    })
    const data=await res.data
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error uploading for embeddings:", error);
    throw error;
  }
}