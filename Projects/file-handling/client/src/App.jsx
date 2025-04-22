import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const handleChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await axios.post("http://localhost:3001/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload success:", res.data);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="App">
            <form>
                <input type="file" name="avatar" onChange={handleChange} />
            </form>
        </div>
    );
}

export default App;