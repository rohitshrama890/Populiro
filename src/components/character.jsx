import React from "react";
import "./Character.css"; // Import the CSS for sprite animations

const Character = ({ direction, name="rabbit" }) => {
  return (
    <div className="Character">
      <img
        className="Character_shadow"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
        alt="Shadow"
      />
      <img
        className={`Character_spritesheet ${direction}`}
        src={`/pets/${name}.png`} // ✅ Fixed template literal
        alt="Character"
      />
    </div>
  );
};

export default Character;
