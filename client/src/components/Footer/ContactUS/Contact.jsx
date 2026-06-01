import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_8ue8wwr",
        "template_ps13qmh",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "8hV8Rgui4xSuSCL3J",
      );

      toast.success("Message sent successfully ✉️");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="bg-gray-100 py-8 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          {/* FORM */}
          <div className="p-5 sm:p-6 md:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Contact Us
            </h1>

            <p className="text-gray-500 mt-3 mb-8">
              Feel free to contact us anytime. We'll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b border-gray-300 py-3 outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border-b border-gray-300 py-3 outline-none focus:border-black"
              />

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-black"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="bg-black text-white p-5 sm:p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-8">Contact Info</h2>

            <div className="space-y-6">
              <div className="flex gap-3 items-start wrap-break-words">
                <FaPhoneAlt className="mt-1" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3 items-start wrap-break-words">
                <FaEnvelope className="mt-1" />
                <span>support@shophub.com</span>
              </div>

              <div className="flex gap-3 items-start wrap-break-words">
                <FaMapMarkerAlt className="mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
