import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CheckupForm from '../components/checkupForm';
import PrescriptionForm from '../components/PrescriptionForm';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);

  const [checkupData, setCheckupData] = useState({
    height: '',
    weight: '',
    bp: '',
    remarks: '',
    complains: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then(res => setPatients(res.data))
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const handleCheckup = (patientId) => {
    setSelectedPatientId(patientId);
    setShowPrescription(false);
    setCheckupData({
      height: '',
      weight: '',
      bp: '',
      remarks: '',
      complains: ''
    });
  };

  const handleCheckupChange = (e) => {
    setCheckupData({ ...checkupData, [e.target.name]: e.target.value });
  };

  const handleCheckupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/patients/${selectedPatientId}/checkups`, checkupData);
      setShowPrescription(true); // proceed to prescription form
    } catch (err) {
      console.error('Checkup error:', err);
      alert('Failed to save checkup.');
    }
  };

  const handleCheckupCancel = () => {
    setSelectedPatientId(null);
    setShowPrescription(false);
  };

  const handlePrescriptionSubmit = async (data) => {
    try {
      await axios.post(`http://localhost:5000/api/patients/${selectedPatientId}/prescriptions`, data);
      alert('Prescription saved successfully!');
      setSelectedPatientId(null);
      setShowPrescription(false);
    } catch (err) {
      console.error('Prescription error:', err);
      alert('Failed to save prescription.');
    }
  };

  const handlePrescriptionCancel = () => {
    setSelectedPatientId(null);
    setShowPrescription(false);
  };

  const filteredPatients = patients.filter((p) =>
    p.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Patient List</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name or city"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped rounded shadow overflow-hidden">
            <thead className="table-dark">
              <tr className="text-center">
                <th>Sr. No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Email</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr key={patient.patient_id} className="align-middle text-center">
                    <td>{index + 1}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact_number}</td>
                    <td>{patient.email}</td>
                    <td>{patient.address}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCheckup(patient.patient_id)}
                      >
                        Checkup
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedPatientId && !showPrescription && (
          <CheckupForm
            patientId={selectedPatientId}
            data={checkupData}
            onChange={handleCheckupChange}
            onSubmit={handleCheckupSubmit}
            onCancel={handleCheckupCancel}
          />
        )}

        {selectedPatientId && showPrescription && (
          <PrescriptionForm
            onSubmit={handlePrescriptionSubmit}
            onCancel={handlePrescriptionCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
