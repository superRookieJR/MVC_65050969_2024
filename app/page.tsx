"use client"

import CUIDFormField from "@/components/CUIDFormField";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <div className="absolute w-1/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 custom_card">
        <CUIDFormField></CUIDFormField>
      </div>
    </div>
  );
}
