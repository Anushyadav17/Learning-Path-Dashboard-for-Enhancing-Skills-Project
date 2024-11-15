import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 text-gray-800 p-8 md:p-16">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Empowering learners around the world to achieve their goals through quality online education.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            E-learning platfrom, our mission is to make learning accessible, engaging, and affordable for everyone.
            We believe that knowledge should be within reach for all who seek it, regardless of background or location.
            With a wide range of courses and resources, we strive to help learners acquire the skills needed to excel in today’s competitive landscape.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Meet Our Team</h2>
          <p className="text-lg leading-relaxed">
            Our team consists of passionate educators, industry experts, and developers committed to providing high-quality online courses.
            With years of experience and a dedication to excellence, we work together to create a platform that empowers learners worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {/* Placeholder for team members */}
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">Team Member</span>
            </div>
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">Team Member</span>
            </div>
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">Team Member</span>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic">
                "E-learning plateform has been a game-changer for my career. The courses are well-structured, and the instructors are very knowledgeable."
              </p>
              <span className="block text-right mt-4 font-semibold">- Sarah K.</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic">
                "I love the flexibility of learning at my own pace. The platform is user-friendly, and the content is always up-to-date."
              </p>
              <span className="block text-right mt-4 font-semibold">- Michael W.</span>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Join Us on Our Journey</h2>
          <p className="text-lg leading-relaxed mb-6">
            Become a part of the EduLearn community and start your journey towards a brighter future today!
          </p>
          <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
