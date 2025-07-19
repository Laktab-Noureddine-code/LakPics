"use client";

import { useState } from "react";
import Header from "./Header";
import Main from "./Main";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Explore");
  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Main />
    </div>
  );
}

export default MainPage;
