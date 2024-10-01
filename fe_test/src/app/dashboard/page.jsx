"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();
  React.useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("isLoggedIn") || 0;
    if (!value) router.push("/");
  }, []);

  return (
    <>
      <DashboardLayout />
    </>
  );
}
