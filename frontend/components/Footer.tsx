import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
} from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] pt-24">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20">
        {/* Logo & Description */}
        <div className="space-y-6">
          <Image
            src="https://themewagon.github.io/kaira/images/main-logo.png"
            alt="logo"
            width={140}
            height={40}
          />

          <p className="text-gray-500 leading-8 text-lg">
            Gravida massa volutpat aenean odio. Amet, turpis erat nullam
            fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit
            ac sit suscipit hendrerit.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-500">
            <FaFacebookF className="text-xl cursor-pointer hover:text-black transition" />

            <FaTwitter className="text-xl cursor-pointer hover:text-black transition" />

            <FaYoutube className="text-xl cursor-pointer hover:text-black transition" />

            <FaPinterestP className="text-xl cursor-pointer hover:text-black transition" />

            <FaInstagram className="text-xl cursor-pointer hover:text-black transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-3xl font-serif uppercase mb-8">Quick Links</h3>

          <div className="flex flex-col gap-4 text-lg">
            <Link href="/" className="hover:text-gray-500 transition">
              Home
            </Link>

            <Link href="/about" className="hover:text-gray-500 transition">
              About
            </Link>

            <Link href="/service" className="hover:text-gray-500 transition">
              Services
            </Link>

            
          </div>
        </div>

        {/* Help & Info */}
        <div>
          <h3 className="text-3xl font-serif uppercase mb-8">Help & Info</h3>

          <div className="flex flex-col gap-4 text-lg">
            
            <Link href="/orders" className="hover:text-gray-500 transition">
              Orders info
            </Link>

           
            <Link href="/faqs" className="hover:text-gray-500 transition">
              FAQs
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-3xl font-serif uppercase mb-8">Contact Us</h3>

          <div className="space-y-8">
            <div>
              <p className="text-gray-500 text-lg leading-8">
                Do you have any questions or suggestions?
              </p>

              <Link
                href="mailto:contact@yourcompany.com"
                className="text-xl hover:text-gray-500 transition"
              >
                contact@yourcompany.com
              </Link>
            </div>

            <div>
              <p className="text-gray-500 text-lg leading-8">
                Do you need support? Give us a call.
              </p>

              <Link
                href="tel:+43720115278"
                className="text-2xl hover:text-gray-500 transition"
              >
                +43 720 11 52 78
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Shipping & Payment */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-lg">
            <span>We ship with:</span>

            <Image
              src="https://themewagon.github.io/kaira/images/arct-icon.png"
              alt="shipping"
              width={38}
              height={24}
            />

            <Image
              src="https://themewagon.github.io/kaira/images/dhl-logo.png"
              alt="dhl"
              width={60}
              height={24}
            />

            <span>Payment Option:</span>

            <Image
              src="https://themewagon.github.io/kaira/images/visa-card.png"
              alt="visa"
              width={38}
              height={24}
            />

            <Image
              src="https://themewagon.github.io/kaira/images/paypal-card.png"
              alt="paypal"
              width={38}
              height={24}
            />

            <Image
              src="https://themewagon.github.io/kaira/images/master-card.png"
              alt="mastercard"
              width={38}
              height={24}
            />
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-lg text-center">
            © Copyright 2022 Kaira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
