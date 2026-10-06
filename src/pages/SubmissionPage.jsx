import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../PagesDesign.css';

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'phone', label: 'Phone Number', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'eventName', label: 'Event Name', type: 'text' },
  { name: 'eventDate', label: 'Event Date', type: 'date' },
];

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  eventName: '',
  eventDate: '',
  rating: '',
  message: '',
};

const phoneRegex = /^[0-9]{10,15}$/;           
const emailRegex = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;   

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),

  phone: Yup.string()
    .matches(phoneRegex, 'Enter a valid phone number (digits only)')
    .required('Phone number is required'),

  email: Yup.string()
    .matches(emailRegex, 'Enter a valid email address')
    .required('Email is required')
    .test('is-unique', 'This email has already submitted feedback', (value) => {
      if (!value) return true;
      const existing = JSON.parse(localStorage.getItem('feedbackList')) || [];
      return !existing.some((entry) => entry.email === value);
    }),

  eventName: Yup.string().required('Event name is required'),
  eventDate: Yup.date().typeError('Enter a valid date').required('Event date is required'),
  rating: Yup.number()
    .typeError('Rating must be a number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  message: Yup.string().required('Feedback message is required'),
});

function SubmissionPage() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const existing = JSON.parse(localStorage.getItem('feedbackList')) || [];
      const updated = [...existing, values];
      localStorage.setItem('feedbackList', JSON.stringify(updated));
      setSubmitted(true);
      resetForm();
    },
  });

  return (
    <div>
      <h1>Feedback Submission Page</h1>
      <p style={{ textAlign: 'center' }}>
        <Link to="/feedback">View Submitted Feedback →</Link>
      </p>
      {submitted && (
        <div className="success-message">
          Thank you! Your feedback has been submitted.
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field.name]}
            />
            {formik.touched[field.name] && formik.errors[field.name] ? (
              <div className="error-message">{formik.errors[field.name]}</div>
            ) : null}
          </div>
        ))}

        <div>
          <label htmlFor="rating">Rating (1-5)</label>
          <input
            id="rating"
            name="rating"
            type="text"
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^[1-5]$/.test(value)) {
                formik.setFieldValue('rating', value);
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <div className="error-message">{formik.errors.rating}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="message">Feedback Message</label>
          <br />
          <textarea
            id="message"
            name="message"
            rows="6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="error-message">{formik.errors.message}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmissionPage;