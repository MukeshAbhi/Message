import { X } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useMessage } from "../customHooks/useMessage";


const ChatHeader = () => {
  const {
    selectedUser,
    setSelectedUser,
  } = useMessage();

  const selecteduser = useAtomValue(selectedUser);
  const setSelecteduser = useSetAtom(setSelectedUser);

  if (!selecteduser) return null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selecteduser.profileUrl || "/avatar.png"}
                alt={selecteduser.firstName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{`${selecteduser.firstName} ${selecteduser.lastName}`}</h3>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelecteduser(null)}
          aria-label="Close chat"
          className="p-1 rounded hover:bg-base-200 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
