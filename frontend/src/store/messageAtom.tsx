
import { atom } from "jotai";
import { apiRequest } from "../utils";
import { userAtom } from "./userAtom";
import toast from 'react-hot-toast';
import type { Message, User } from "../types";

// Create atoms 
const messages = atom<Message[]>([]);
const users = atom<User[]>([]);
const selectedUser = atom<User | null>(null);

const isUsersLoading = atom(false);
const isMessagesLoading = atom(false);

// Fetch users the current user can chat with
const getUsers = atom(null, async (get, set) => {
    const user = get(userAtom);
    
    set(isUsersLoading, true);
    try{
        const res = await apiRequest({
            url:'user/get-friends',
            token: user?.token,
            method: "GET",
            data: ""
        });

        
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
    const messagesD = Array.isArray(get(messages)) ? get(messages) : [];
    const user = get(userAtom);

    if (!selectedUserD?._id) return;

    try {
        const res = await apiRequest({
            url:`message/send/${selectedUserD._id}`,
            token: user?.token,
            method: "POST",
            data: messageData
        });

        
        if (res && res._id) {
            set(messages, [...messagesD, res]);
        }
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
            url:`/message/${userId}`,
            token: user?.token,
            method: "GET",
            data: ""
        });

        set(messages, Array.isArray(res) ? res : []);
    } catch (err) {
        console.log("Error in getMessageAtom : ",err);
        // Reset messages to empty array on error
        set(messages, []);
        toast.error('Failed to fetch messages');
    } finally {
        set(isMessagesLoading, false);
    }
});

export const messageAtom = () => {
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
