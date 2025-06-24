
import { atom } from "jotai";
import { apiRequest } from "../utils";
import { userAtom } from "../store/userAtom";
import toast from 'react-hot-toast';
import type { Message, User } from "../types";

// Create atoms outside the hook to prevent recreation on every render
const messages = atom<Message[]>([]);
const users = atom<User[]>([]);
const selectedUser = atom<User | null>(null);

const isUsersLoading = atom(false);
const isMessagesLoading = atom(false);

// Fetch users the current user can chat with
const getUsers = atom(null, async (get, set) => {
    const user = get(userAtom);
    console.log("Fetching users with token:", user?.token);
    set(isUsersLoading, true);
    try{
        const res = await apiRequest({
            url:'user/get-friends',
            token: user?.token,
            method: "GET",
            data: ""
        });
        console.log("API Response:", res);
        console.log("Friends data:", res?.data);
        set(users, res?.data || []);
    } catch (err) {
        console.log("Error in getUserAtom : ",err);

        toast.error('Failed to fetch users');
    } finally {
        set(isUsersLoading,false)
    }
});

// Send a message to the selected user
const sendMessage = atom(null, async (get, set, messageData) => {

    const selectedUserD = get(selectedUser);
    const messagesD = get(messages);
    const user = get(userAtom);

    if (!selectedUserD?._id) return;

    try {
        const res = await apiRequest({
            url:`message/send/${selectedUserD._id}`,
            token: user?.token,
            method: "POST",
            data: messageData
        });

        set(messages, [...messagesD, res.data]);
    }catch (err) {
        console.log("Error in sendMessageAtom : ",err);
        toast.error('Message send failed');
    }
});

// Get all messages with a specific user
const getMessage = atom(null, async (get, set, userId: string) => {

   set(isMessagesLoading, true);

    const user = get(userAtom);

    try {
        const res = await apiRequest({
            url:`message/${userId}`,
            token: user?.token,
            method: "GET",
            data: ""
        });
        console.log("API Response:", res.data);
        set(messages, res.data);
    } catch (err) {
        console.log("Error in getMessageAtom : ",err);
        toast.error('Failed to fetch messages');
    } finally {
        set(isMessagesLoading, false);
    }
});

export const useMessage = () => {
    return {
        getUsers,
        getMessage,
        sendMessage,
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
    };
}
