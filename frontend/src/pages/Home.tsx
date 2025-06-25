
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";
import{ NoChatSelected } from "../components/NoChatSelected"
import Sidebar from "../components/Sidebar";
import { messageAtom } from "../store/messageAtom";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { userAtom } from "../store/userAtom";

const HomePage = () => {
  const {selectedUser} = messageAtom();

  const selecteduser = useAtomValue(selectedUser)

  const authUser = useAtomValue(userAtom);

  useEffect(() => {
    console.log("Home: selecteduser changed:", selecteduser);
  }, [selecteduser]);


  return (
    <div>
      <Navbar />
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="p-4 border-b ">
              <div className="avatar w-12">
                <img
                  src={authUser?.profileUrl || "/avatar.png"}
                  alt={authUser?.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <span className="ml-4 text-xl font-semibold">
                {`${authUser?.firstName }${authUser?.lastName}`}
              </span>
            </div>
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />

              {!selecteduser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;