"use client";

import Chat from "@/components/Chat";
import Header from "@/components/Header";
import ImageGenrator from "@/components/ImageGenrator";
import RecipeGenerator from "@/components/RecipeGenerator";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("image-generator");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Header activeTab={activeTab} handleTabChange={handleTabChange} />

      {activeTab === 'image-generator' && <ImageGenrator />}
      {activeTab === 'chat' && <Chat />}
      {activeTab === 'recipe-generator' && <RecipeGenerator />}


    </>
  );
}
