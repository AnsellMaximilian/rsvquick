import React from "react";

export const AppIcon: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return collapsed ? <h1>R</h1> : <h1>RSVQuick</h1>;
};
