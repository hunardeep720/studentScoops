// components/WelcomeEmail.js
import React from 'react';

const WelcomeEmail = ({ name, link }) => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white">Welcome to Student Scoops, {name}!</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Dear {name},
          </p>
          <p className="text-gray-700 mb-4">
            We're thrilled to have you on board. At Student Scoops, we aim to provide the best resources and community for students worldwide.
          </p>
          <p className="text-gray-700 mb-4">
            Here are some links to get you started:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Login <a href={link} className="text-blue-500 underline">Link</a></li>
            
          </ul>
          <p className="text-gray-700 mb-4">
            If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
          <p className="text-gray-700">
            Best regards,<br />
            The Student Scoops Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmail;
