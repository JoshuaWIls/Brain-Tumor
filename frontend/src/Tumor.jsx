import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  UploadCloud,
  Loader2,
  Brain,
} from "lucide-react";

export default function Tumor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.prediction);
    } catch (error) {
      setResult("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f4f8', minHeight: '100vh', color: '#333' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #ddd', padding: '20px 40px', background: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#2c3e50' }}>🏥 Life Is Good</h1>
        <p style={{ marginTop: '8px', fontSize: '16px', color: '#555' }}>Innovative healthcare with AI-powered diagnostics</p>
      </header>

      {/* Layout */}
      <main style={{ display: 'flex', flexWrap: 'wrap', padding: '40px' }}>
        {/* Left section */}
        <div style={{ flex: '1 1 60%', paddingRight: '40px' }}>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>About Us</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Life Is Good is a cutting-edge medical center integrating advanced technology with expert care. We specialize in AI-assisted diagnostics, robotic surgeries, and continuous patient monitoring.
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>Departments</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Neurology</li>
              <li>Oncology</li>
              <li>Cardiology</li>
              <li>Orthopedics</li>
              <li>Radiology</li>
              <li>Pediatrics</li>
            </ul>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>Doctors</h2>
            <ul style={{ lineHeight: '1.8' }}>
              <li><strong>Dr. Ayesha Rahman</strong> – Neurosurgeon (15+ years experience)</li>
              <li><strong>Dr. Samuel Kim</strong> – Oncologist (AI therapy specialist)</li>
              <li><strong>Dr. Ravi Sharma</strong> – Cardiologist (Minimally invasive surgery)</li>
              <li><strong>Dr. Elina Das</strong> – Pediatrician (Child neuro care)</li>
            </ul>
          </motion.section>
        </div>

        {/* Right section (Tumor Detection) */}
        <div style={{ flex: '1 1 35%', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <motion.h2 initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#2c3e50' }}>
            <Brain style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Brain Tumor Detection
          </motion.h2>

          <label htmlFor="file-upload" style={{ display: 'block', border: '2px dashed #3498db', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
            <UploadCloud style={{ width: '24px', height: '24px', marginBottom: '10px', color: '#3498db' }} />
            <span style={{ color: '#3498db' }}>Upload MRI Image</span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>

          {preview && (
            <motion.img
              src={preview}
              alt="MRI Preview"
              style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !image}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading || !image ? '#bdc3c7' : '#2980b9',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !image ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-6 h-6" /> Detect Tumor
              </>
            )}
          </button>

          {result && (
            <motion.div
              style={{ marginTop: '20px', padding: '10px', backgroundColor: '#dff0ff', color: '#2c3e50', textAlign: 'center', borderRadius: '8px', fontWeight: 'bold' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Result: <span>{result}</span>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #ddd', padding: '30px 40px', textAlign: 'center', fontSize: '14px', color: '#777' }}>
        © 2025 Life Is Good. All rights reserved.
      </footer>
    </div>
  );
}
