import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

import { storage, db } from '../../../FireBase/FireBase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc, setDoc, Timestamp, getDocs ,serverTimestamp } from "firebase/firestore";
import MultiImageInput from 'react-multiple-image-input';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../../hook/useNotifcation'
import { ToastContainer, toast } from 'react-toastify';
import './AddProduct.scss'
import AdminNavBar from '../AdminNavBar/AdminNavBar';
export default function AddProduct() {
  const [images, setImages] = useState([])
  const [images2, setImages2] = useState({});

  const [msgError, setMsgError] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  // const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [discrip, setDiscrip] = useState('');


  const MAX_COUNT = 5;
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);

  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };


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
    <div className='admin-content-side'>
<AdminNavBar/>

<div className='add-product-component'>
<form>
{msgError ? <p className='remove-btn-order'>error check input </p> : null}
<h2 class="mini-title-add-product"><i class="zmdi zmdi-info-outline mr-10"></i>about product</h2>
<hr class="light-grey-hr"></hr>
<label><p>Product Name</p><input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='name Product'></input></label>

  <div className='input-price-stock'>
  <label>Price<input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}></input></label>

    <label>Stock<input type='number' placeholder='quantity of stock' value={stock} onChange={(e) => setStock(e.target.value)}></input></label>
   </div>


<label><p>Description</p><textarea type='text' value={discrip} onChange={(e) => setDiscrip(e.target.value)}></textarea></label>

  

    
     <h2 class="mini-title-add-product"><i class="zmdi zmdi-info-outline mr-10"></i>upload image</h2>
     <hr class="light-grey-hr"></hr>

<div className='upload-media-admin'>      <label className='labelupload-image' for="imgProducts">
<div className='dropimages'> <p>Drop Images Here 'up to 4 images'</p> </div>
  <input className='input-image' type='file' id='imgProducts' multiple onChange={(e) => setImages(Object.values(e.target.files))}
   disabled={fileLimit === images.length} accept="image/*"></input>
</label>


<div className='list-imgs'>  {images?.map((i) => <img src={URL.createObjectURL(i)}></img>)}</div> 

</div>
<hr class="light-grey-hr"></hr>

    <input className='submit' type='submit' value="Save product" onClick={(e) => onUpload(e)}></input>
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



