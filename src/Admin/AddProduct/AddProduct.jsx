import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { RMIUploader } from "react-multiple-image-uploader";
import { storage, db } from '../../FireBase/FireBase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc, setDoc, Timestamp, getDocs ,serverTimestamp } from "firebase/firestore";
import SideBar from '../SideBar/SideBar';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifcation'
import { ToastContainer, toast } from 'react-toastify';
import './AddProduct.scss'
export default function AddProduct() {
  const [images, setImages] = useState([])


  const [msgError, setMsgError] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discrip, setDiscrip] = useState('');


  const MAX_COUNT = 5;
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);




  //-=--------------------
  //-=--------------------
  const onUpload = async (e) => {
    e.preventDefault();

    if (images === null || price === '' || discrip === '' || title === '' || stock === '') return setMsgError(true);
    e.preventDefault();
    console.log(images)
    const data = await getDocs(collection(db, "Products"));
    const id = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length + 1
    const docRef = await addDoc(collection(db, 'Products'), {
      id: id,
      title: title,
      description: discrip,
      price: price,
      stock: stock,
      date: serverTimestamp(),
    })

    await Promise.all(
      images?.map((image) => {

        //update colication and add image to it {map if theres many images}
        const imgeref = ref(storage, `Products/${image.name}`);
        uploadBytes(imgeref, image).then(async () => {
          const downUrl = await getDownloadURL(imgeref)
          await updateDoc(docRef, {
            image: arrayUnion(downUrl)
          })
        }

        )

      }), setImages([]),
      setTitle(''),
      setDiscrip(''),
      setPrice(''),

    )
    setMsgError(false);
    setUploadedFiles([])
    setFileLimit(false)
    notify('Item Added',)
  };




  return (
    <div className='pageAdd'>
      <SideBar />


      <div className='addProduct'>
        <form>

          {msgError ? <p>error check input </p> : null}
          <div className='col'>
            <div className='text'>  <p>1.Generale Info</p> </div>

            <div className='input'>
              <label>1.Product Title<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='name Product'></input></label>
              <label>Full Description<textarea type='text' value={discrip} onChange={(e) => setDiscrip(e.target.value)}></textarea></label>
            </div></div>
          <hr></hr>

          <div className='col'>
            <div className='text'>  <p>2.Pricing</p> </div>

            <div className='input'>
              <label>Price<input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}></input></label>
            </div></div>
          <hr></hr>
          <div className='col'>
            <div className='text'>  <p>3.Stock</p> </div>

            <div className='input'>
              <label>Stock<input type='number' placeholder='quantity of stock' value={stock} onChange={(e) => setStock(e.target.value)}></input></label>
            </div></div>
          <hr></hr>
          <div className='col'>
            <div className='text'>  <p>4.Media</p> </div>

            <div className='input input-img'>

              <label className='labelupload-image' for="imgProducts">Choose a picture of Your Product: <div className='dropimages'> <p>Drop Images Here</p> </div>
                <input className='input-image' type='file' id='imgProducts' multiple onChange={(e) => setImages(Object.values(e.target.files))}
                  disabled={fileLimit} accept=".png, .jpg, .jpeg"></input>
                <div className='list-imgs'>  {images?.map((i) => <img src={URL.createObjectURL(i)}></img>)}</div>
              </label>

              <input className='submit' type='submit' value="Save product" onClick={(e) => onUpload(e)}></input>
            </div>



          </div>


        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
