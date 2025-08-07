import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-xs text-gray-500 py-4">

      <p>&copy; RŌNIN CHARACTER GENERATOR is an independent production by Marco Tondi. <br/>It is not affiliated with Slightly Reckless Games LTD. It is published under the Rōnin Third Party License.</p>
      <br />
      <p>&copy; Rōnin is copyright © Slightly Reckless Games LTD.</p>

      <p>
        v.0.0.1
        {/* <a href="/license" className="hover:underline">License</a>
        <span className="mx-2">|</span>
        <a href="/terms-of-use" className="hover:underline">Terms of Use</a> */}
      </p>
    </footer>
  );
};

export default Footer;
