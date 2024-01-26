import PageLayout from "@/components/page-layout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <PageLayout>
      <div>Hola {session.user.username}!</div>
    </PageLayout>
  );
};

export default Profile;
