import React from "react";
import { SiGithub } from "react-icons/si";

import packageJson from "../../../package.json"; // percorso corretto dipende da dove sta il Footer.tsx


const Footer = () => {
  return (
    <footer className="text-center text-xs text-gray-500 py-6 border-t leading-relaxed space-y-3">
      <p>
        &copy; RŌNIN CHARACTER GENERATOR is an independent production by Marco
        Tondi. <br />
        It is not affiliated with Slightly Reckless Games LTD. It is published
        under the Rōnin Third Party License.
      </p>

      <p>&copy; Rōnin is copyright © Slightly Reckless Games LTD.</p>

      <p className="flex items-center justify-center gap-2 text-gray-400">
        v.{packageJson.version} •
        <a
          href="https://github.com/marcotondi/ronin-character-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          <SiGithub className="h-4 w-4" />
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
