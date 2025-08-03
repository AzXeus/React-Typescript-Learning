import React, { useState } from 'react'

// Define the shape of our form data
interface FormData {
  name: string
  email: string
  age: number
  country: string
  interests: string[]
  newsletter: boolean
  message: string
}

// Define validation errors
interface FormErrors {
  name?: string
  email?: string
  age?: string
}

const FormsExample: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    country: '',
    interests: [],
    newsletter: false,
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  // Handle input changes for different input types
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  // Handle multiple select (interests)
  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }))
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (validateForm()) {
      setSubmitted(true)
      console.log('Form submitted:', formData)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: 0,
      country: '',
      interests: [],
      newsletter: false,
      message: ''
    })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="section">
        <h2>6. Forms & Validation</h2>
        <div className="success">
          <h3>Form Submitted Successfully! ✅</h3>
          <pre style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
          <button onClick={resetForm}>Submit Another Form</button>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <h2>6. Forms & Validation</h2>
      <p><strong>Concept:</strong> Handling form inputs, validation, and submission with TypeScript</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name: *
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ 
                borderColor: errors.name ? '#e74c3c' : '#ddd',
                display: 'block',
                width: '100%',
                maxWidth: '300px'
              }}
            />
            {errors.name && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.name}</span>}
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Email: *
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ 
                borderColor: errors.email ? '#e74c3c' : '#ddd',
                display: 'block',
                width: '100%',
                maxWidth: '300px'
              }}
            />
            {errors.email && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.email}</span>}
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Age: *
            <input 
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              style={{ 
                borderColor: errors.age ? '#e74c3c' : '#ddd',
                display: 'block',
                width: '100px'
              }}
            />
            {errors.age && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.age}</span>}
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Country:
            <select 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{ display: 'block', width: '200px' }}
            >
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Interests:</label>
          <div>
            {['Programming', 'Design', 'Music', 'Sports', 'Reading'].map(interest => (
              <label key={interest} style={{ display: 'block', margin: '5px 0' }}>
                <input 
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleInterestChange}
                  style={{ marginRight: '8px' }}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input 
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Message:
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              style={{ 
                display: 'block', 
                width: '100%', 
                maxWidth: '400px',
                resize: 'vertical'
              }}
              placeholder="Tell us about yourself..."
            />
          </label>
        </div>

        <button type="submit">Submit Form</button>
        <button type="button" onClick={resetForm} style={{ background: '#95a5a6' }}>
          Reset Form
        </button>
      </form>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key concepts:</strong>
        <ul>
          <li>Controlled components - React controls the input values</li>
          <li>Form validation with TypeScript interfaces</li>
          <li>Different input types: text, email, number, select, checkbox, textarea</li>
          <li><code>event.preventDefault()</code> - Prevent form submission</li>
          <li>Conditional rendering based on form state</li>
        </ul>
      </div>
    </div>
  )
}

export default FormsExample