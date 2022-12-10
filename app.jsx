import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("6-7AM");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!name || !age || !email || !phone) {
      setError("Please fill out all required fields.");
      return;
    }

    if (age < 18 || age > 65) {
      setError("Please enter an age between 18 and 65.");
      return;
    }

    // Call mock payment function
    const paymentSuccess = CompletePayment({ name, age, email, phone });

    // Send user data to REST API
    try {
      const response = await axios.post("/api/enroll", {
        name,
        age,
        email,
        phone,
        batch,
        paymentSuccess,
      });

      // Handle response from REST API
      if (response.status === 200) {
        // Display success message to user
        setError("");
        // Clear form fields
        setName("");
        setAge("");
        setEmail("");
        setPhone("");
        setBatch("6-7AM");
      } else {
        // Display error message to user
        setError(response.data.message);
      }
    } catch (error) {
      // Display error message to user
      setError(error.message);
    }
  };
return (

  <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
    </label>
    <label>
      Age:
      <input type="number" value={age} onChange={(event) => setAge(event.target.value)} />
    </label>
    <label>
      Batch:
      <select value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
        <option value="6-7AM">6-7AM</option>
        <option value="7-8AM">7-8AM</option>
        <option value="8-9AM">8-9AM</option>
        <option value="5-6PM">5-6PM</option>
      </select>
    </label>
    <input type="submit" value="Submit" />
  </form>
);
};
ReactDOM.render(<YogaForm />, document.getElementById("root"));



