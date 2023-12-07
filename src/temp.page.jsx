import { useState } from "react";
import Message from "./components/message.component";
export const TempPage = () => {
  const createDateTimeOneHourLater = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${now.getHours()}:${now.getMinutes()} `;
  };
  return (
    <main>
      <button onClick={() => console.log(createDateTimeOneHourLater())}>
        Show message
      </button>
    </main>
  );
};

export default TempPage;
