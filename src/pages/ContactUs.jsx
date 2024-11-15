import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 text-gray-800 p-8 md:p-16">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl">
            We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
          </p>
        </header>

        {/* Contact Information Section */}
        {/* <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Contact Information</h2>
          <p className="text-lg">
            <strong>Email:</strong> support@edulearn.com
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> +123-456-7890
          </p>
          <p className="text-lg">
            <strong>Address:</strong> 123 EduLearn Street, Knowledge City, Edutopia
          </p>
        </section> */}

        {/* Additional Message */}
        <div className="mt-12 text-center text-lg">
          <p className="text-gray-600">
            Follow us on social media to stay updated on the latest courses and offers.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            {/* Replace # with actual social media links */}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700">
              <i className="fab fa-instagram-square text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
