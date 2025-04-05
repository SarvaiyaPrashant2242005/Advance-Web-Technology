import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Addpatient = () => {
    // State for form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        contact_number: '',
        email: '',
        address: '',
        medical_history: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/patients', formData);
            alert('Patient added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Failed to add patient.');
        }
    };

    return (
        <div>
            <Navbar />
            <h2>New Patient</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} required />
                <br />

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} required />
                <br />

                <label htmlFor="dob">Date of Birth</label>
                <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} required />
                <br />

                <label htmlFor="gender">Gender</label>
                <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} required />
                <label htmlFor="male">Male</label>

                <input type="radio" id="female" name="gender" value="Female" onChange={handleChange} required />
                <label htmlFor="female">Female</label>

                <input type="radio" id="other" name="gender" value="Other" onChange={handleChange} required />
                <label htmlFor="other">Other</label>
                <br />

                <label htmlFor="contact_number">Contact Number</label>
                <input type="text" name="contact_number" id="contact_number" value={formData.contact_number} onChange={handleChange} required />
                <br />

                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                <br />

                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
                <br />

                <label htmlFor="medical_history">Medical History</label>
                <textarea className="form-control" name="medical_history" id="medical_history" rows="4" value={formData.medical_history} onChange={handleChange}></textarea>
                <br />

                <input type="submit" value="Add Patient" />
            </form>
        </div>
    );
};

export default Addpatient;
