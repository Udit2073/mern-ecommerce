import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-[2fr_1fr]">
          {/* FORM */}
          <div className="p-6 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Contact Us
            </h1>

            <p className="text-gray-500 mt-3 mb-8">
              Feel free to contact us anytime. We'll get back to you as soon as
              possible.
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-b border-gray-300 py-3 outline-none focus:border-black"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-b border-gray-300 py-3 outline-none focus:border-black"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-black"
              ></textarea>

              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="bg-black text-white p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-8">Contact Info</h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <FaPhoneAlt className="mt-1" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-4 items-start">
                <FaEnvelope className="mt-1" />
                <span>support@shophub.com</span>
              </div>

              <div className="flex gap-4 items-start">
                <FaMapMarkerAlt className="mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-10 bg-white p-4 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Find Us On Map
          </h2>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.03609252794!2d77.1024909!3d28.5272803"
            className="w-full h-75 md:h-125 rounded-2xl"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
