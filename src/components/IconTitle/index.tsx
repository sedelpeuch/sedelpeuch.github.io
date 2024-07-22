import { Icon } from "@iconify/react";

// Composant individuel de Card
function IconTitle({ logo, name }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Icon icon={logo} style={{ fontSize: "100px" }} />
      <div style={{ padding: "2px 16px" }}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default IconTitle;
