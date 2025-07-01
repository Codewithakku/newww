import React, { useState } from 'react';

function Form() {
  const [form, setForm] = useState({
    name: "",
    password: ""
  });

  return (
    <>
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input
          style={{ width: '30%' }}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          className="form-control"
          value={form.name}
          id="name"
          placeholder="Enter your name"
        />
      </div>
      <p>{form.name}</p>
      
    </>
  );
}

export default Form;
