import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CheckupForm from '../components/checkupForm';
import PrescriptionForm from '../components/PrescriptionForm';
import PaymentDetails from '../components/PaymentDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Dashboard.css';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [previousBalance, setPreviousBalance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getInitialCheckupState = () => ({
    height: '',
    weight: '',
    bp: '',
    remarks: '',
    complains: ''
  });

  const [checkupData, setCheckupData] = useState(getInitialCheckupState());

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then(res => setPatients(res.data))
      .catch(err => {
        console.error('Error fetching patients:', err);
        toast.error('Failed to load patients');
      });
  }, []);

  const handleCheckup = (patientId) => {
    setSelectedPatientId(patientId);
    setShowPrescription(false);
    setShowPayment(false);
    setCheckupData(getInitialCheckupState());
  };

  const handleCheckupChange = (e) => {
    setCheckupData({ ...checkupData, [e.target.name]: e.target.value });
  };

  const handleCheckupSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/api/patients/${selectedPatientId}/checkups`, checkupData);
      toast.success('Checkup saved!');
      setShowPrescription(true);
    } catch (err) {
      console.error('Checkup error:', err);
      toast.error('Failed to save checkup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckupCancel = () => {
    setSelectedPatientId(null);
    setShowPrescription(false);
    setShowPayment(false);
  };

  const handlePrescriptionSubmit = async ({ prescription, days }) => {
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/api/patients/${selectedPatientId}/prescriptions`, {
        prescription,
        days
      });
      toast.success('Prescription saved!');
      setSelectedPatientId(null);
      setShowPrescription(false);
    } catch (err) {
      console.error('Prescription error:', err);
      toast.error('Failed to save prescription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrescriptionCancel = () => {
    setSelectedPatientId(null);
    setShowPrescription(false);
  };

  const handlePaymentClick = async (patientId) => {
    setSelectedPatientId(patientId);
    setShowPrescription(false);
    setShowPayment(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/${patientId}`);
      const payments = res.data;
      if (payments.length > 0) {
        const latest = payments[payments.length - 1];
        setPreviousBalance(latest.remaining || 0);
      } else {
        setPreviousBalance(0);
      }
    } catch (err) {
      console.error('Error loading payment history:', err);
      setPreviousBalance(0);
      toast.error('Failed to load payment history');
    }
  };

  const handlePaymentSave = async (paymentData) => {
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/api/payments/${paymentData.patient_id}`, paymentData);
      toast.success('Payment saved!');
      setSelectedPatientId(null);
      setShowPayment(false);
      setPreviousBalance(0);
    } catch (err) {
      console.error('Payment save error:', err);
      toast.error('Failed to save payment.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const filteredPatients = patients.filter((p) =>
    p.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container mt-4">
        <h2 className="mb-4">Patient List</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name or city"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

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
                    <td className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCheckup(patient.patient_id)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Loading...' : 'Checkup'}
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handlePaymentClick(patient.patient_id)}
                        disabled={isSubmitting}
                      >
                        Payment
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

        {selectedPatientId && !showPrescription && !showPayment && (
          <CheckupForm
            patientId={selectedPatientId}
            data={checkupData}
            onChange={handleCheckupChange}
            onSubmit={handleCheckupSubmit}
            onCancel={handleCheckupCancel}
            isSubmitting={isSubmitting}
          />
        )}

        {selectedPatientId && showPrescription && (
          <PrescriptionForm
            patientId={selectedPatientId}
            onSubmit={handlePrescriptionSubmit}
            onCancel={handlePrescriptionCancel}
            isSubmitting={isSubmitting}
          />
        )}

        {selectedPatientId && showPayment && (
          <PaymentDetails
            patientId={selectedPatientId}
            previousBalance={previousBalance}
            onSave={handlePaymentSave}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
