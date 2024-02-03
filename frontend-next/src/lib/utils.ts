import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getData() {
  const session = useSession();
  const fetchCareers = await fetch(
    `http://127.0.0.1:8000/data/api/v1/carreras/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.data?.token,
      },
    }
  );
  const careersData = await fetchCareers.json();
  console.log("utils");
  console.log(careersData);
  return {careersData};
}

