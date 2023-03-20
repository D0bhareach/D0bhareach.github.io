import React from "react";

export default function BoilingVerdict(props) {
  const willBoil = props.temperature >= 100;
  const class_name = willBoil ? "text-success" : "text-info";
  const willBoilText = willBoil ? `Water will boil`: `Water won't boil`;

  return (
        <span className={`conveter__verdict ${class_name}`}>
          {willBoilText}
        </span>
  );
}
