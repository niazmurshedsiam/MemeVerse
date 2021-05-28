import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Admin from "../Admin/Admin";


const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = (data) => {
        console.log(data)
        const eventDta = {
            name: data.name,
            wight: data.wight,
            price: data.price,
            imageURL: imageURL
        };
        console.log(eventDta)
        const url = `http://localhost:5000/addProduct`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventDta)
        })
            .then(res => console.log('ser sid res', res))
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set("key", '335045a2e20dfb20b2e75072ff553f1f');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <Admin></Admin>
            <h2>Add product</h2>
            <div class="m-5">
                <form onSubmit={handleSubmit(onSubmit)} class="row g-2">
                    <div class="col-md-6">

                        <input name="name" placeholder="Enter name" ref={register} type="text" class="form-control" id="name" />
                    </div>

                    <div class="col-md-6">

                        <input name="wight" ref={register} type="text" class="form-control" id="wight" placeholder="weight" />
                    </div>

                    <div class="col-md-6">

                        <input name="price" ref={register} type="text" class="form-control" id="price" placeholder="price" />
                    </div>

                    <div class="col-md-6">

                        <input type="file" class="form-control" onChange={handleImageUpload} id="Photo" />
                    </div>

                    <input type="submit" class="col-md-1" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

