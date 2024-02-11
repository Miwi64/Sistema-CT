import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>Hola {session.user.username}!</div>
    </>
  );
};

export default Profile;
