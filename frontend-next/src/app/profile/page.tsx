import PageLayout from "@/components/page-layout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <PageLayout>
      <div>Hola</div>
    </PageLayout>
  );
};

export default Profile;
