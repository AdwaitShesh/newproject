import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddAlbum = () => {
  
  const [image,setImage] = useState(false);
  const [colour,setColour] = useState("#121212");
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [loading,setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const formdata = new FormData();

      formdata.append('name', name);
      formdata.append('desc', desc);
      formdata.append('image', image);
      formdata.append('bgColour', colour);
      
      const response = await axios.post(`${url}/api/album/add`,formdata);

      if(response.data.success) {
        toast.success("Album added");
        setDesc("");
        setImage(false);
        setName("");
      } 
      else {
        toast.error("Failed to add album");
      }

    } catch (error) {
      toast.error("Error Occured")
    }
    setLoading(false)
  }

  
  return loading ? (
  <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>

  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8' action="">

      <div>
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
        <label htmlFor="image">
          <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

        </label>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name}  className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' type="text" placeholder='type here' />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album description</p>
        <input onChange={(e)=> setDesc(e.target.value)} value={desc}  className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' type="text" placeholder='type here' />
      </div>

      <div className=' flex flex-col gap-3'>
        <p>Background Colour</p>
        <input onChange={(e)=> setColour(e.target.value)} value={colour} type="color" />
      </div>

      <button className=' text-balance bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>ADD</button>
    </form>
  )
}

export default AddAlbum
