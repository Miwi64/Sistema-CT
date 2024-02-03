import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getData() {
  const session = await getServerSession(authOptions);
  const fetchCareers = await fetch(
    `http://127.0.0.1:8000/data/api/v1/carreras/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const careersData = await fetchCareers.json()
  return {careersData};
}

