import Layout from "@/components/layout/DoctorLayout";
import Navbar from "@/components/layout/Navbar";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import MessageDashboard from "./MessageDashboard";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }
  const userInfo = await getUserInfo(user.email);
  if (!userInfo) {
    return <div>Please log in to view your profile.</div>;
  }
  const id =
    userInfo.role === "DOCTOR" ? userInfo.doctor?.id : userInfo.patient?.id;
  if (!id) {
    return <div>Please log in to view your profile.</div>;
  }

  if (userInfo.role === "PATIENT") {
    return (
      <>
        <Navbar />
        <MessageDashboard userInfo={userInfo} />
      </>
    );
  }

  return (
    <Layout withFooter={false}>
      <MessageDashboard userInfo={userInfo} />
    </Layout>
  );
}
