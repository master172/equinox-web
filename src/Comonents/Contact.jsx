import React from "react";
import "../Styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-header">Contact Us</h2>
        <p>feel free to contact us we are here to help</p>
        <p>Address:
            St. Joseph's Pre-University College,
            FM Cariappa Road 
            (Museum Road),
            Bengaluru, Karnataka - 560025</p>
      <div className="contact-details">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@example.com">info@example.com</a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+911234567890">+91 12345 67890</a>
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.822994258857!2d77.59456231524514!3d12.97159899085585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c60b7fbd%3A0x8c60a6c8e7b8c9c4!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;