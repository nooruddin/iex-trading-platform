import React from "react";

/**
 * Key Component for differentiating between companies enabled and disabled for trading
 */
export default function MissionKey() {
  return (
    <div className="my-3">
      <p>
        <span className="px-3 ml-2 bg-success" /> = Enabled for Trading
        <span className="px-3 ml-2 bg-danger" /> = Disabled for Trading
      </p>
    </div>
  );
}
