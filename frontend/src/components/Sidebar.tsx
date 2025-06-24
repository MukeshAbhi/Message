import { useEffect } from "react";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/Sidebarskeleton";

import { useSetAtom, useAtomValue } from "jotai";
import { useMessage } from "../customHooks/useMessage";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useMessage();

  const fetchUsers = useSetAtom(getUsers);
  const usersData = useAtomValue(users);
  const selected = useAtomValue(selectedUser);
  const loading = useAtomValue(isUsersLoading);
  const setSelected = useSetAtom(setSelectedUser);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Friends</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {usersData?.length > 0 ? (
          usersData.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelected(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selected?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profileUrl|| "/avatar.png"}
                  alt={user.firstName}
                  className="size-12 object-cover rounded-full"
                />
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.firstName}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
