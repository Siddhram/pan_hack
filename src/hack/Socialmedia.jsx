import axios from "axios";
import React, { useState } from "react";

function InstagramLinkInput() {
    const [link, setLink] = useState("");
    const [imageurl, setimageurl] = useState("");
    const [status, setstatus] = useState('');

    const handleInputChange = (event) => {
        setLink(event.target.value);
    };

    const func = async () => {
        const res = await axios.post('http://192.168.114.72:3000/get-instagram-image', { postUrl: link });
        return res.data;
    };

    const func2 = async (img) => {
        const apiResponse = await axios.post('http://192.168.9.171:8080/api/detect/', {
            image_url: img
        });
        console.log(apiResponse.data.is_deepfake);
        return apiResponse.data.is_deepfake;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Instagram Post Link:", link);
        func().then((res) => {
            setimageurl(res.imageUrl);
            func2(res.imageUrl).then((res) => setstatus(res));
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  px-4 py-16">
            <div className="max-w-lg w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Enter Instagram Post Link</h1>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="url"
                        placeholder="Paste Instagram post link here..."
                        value={link}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Submit
                    </button>
                </form>

                {imageurl && (
                    <div className="flex flex-col items-center gap-2.5 mt-4">
                        <img src={imageurl} alt="Instagram Post" className="w-60 rounded-lg shadow-md" />
                        <div
                            className={`text-3xl font-bold ${status === "fake" ? "text-red-400" : "text-green-400"}`}
                        >
                            {status}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Socialmedia() {
    return (
        <div className="App">
            <InstagramLinkInput />
        </div>
    );
}

