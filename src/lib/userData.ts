import { feedPosts } from "@/lib/mockData";

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  type?: "question";
}

export const currentUser = {
  id: "me",
  username: "kwame_farms",
  fullName: "Kwame Agyeman",
  avatar: "KF",
  bio: "Agri-tech enthusiast running 3 farms across the Ashanti region. Passionate about sustainable farming and data-driven agriculture.",
  location: "Accra, Ghana",
  joinedDate: "Jan 2025",
  farms: 3,
  crops: 4,
  livestock: 4,
  followers: 248,
  following: 112,
  channels: ["Poultry Pros", "Crop Science", "Market Watch"],
  posts: [feedPosts[0], feedPosts[2]],
};

export const users = [
  { id: "u1", username: "agri_maven", fullName: "Kofi Mensah", avatar: "KM", bio: "Organic farming advocate & soil scientist specializing in sustainable agriculture.", location: "Techiman", online: true },
  { id: "u2", username: "poultry_pro", fullName: "Amma Serwaa", avatar: "AS", bio: "Layer specialist with 2000+ birds. Expert in poultry nutrition and health.", location: "Accra", online: true },
  { id: "u3", username: "green_fields", fullName: "Yaw Boakye", avatar: "YB", bio: "Greenhouse tech & irrigation systems specialist. Helping farmers maximize yield.", location: "Accra", online: false },
  { id: "u4", username: "cattle_king", fullName: "Baba Ibrahim", avatar: "BI", bio: "Dairy farmer & cattle breeder with over 15 years of experience in the industry.", location: "Tamale", online: false },
  { id: "u5", username: "livestock_hub", fullName: "Efua Darko", avatar: "ED", bio: "Goat & sheep farming specialist. Focused on breeding and quality meat production.", location: "Bolgatanga", online: true },
];

export interface Conversation {
  id: string;
  user: typeof users[0];
  lastMessage: string;
  time: string;
  unread: number;
  messages: { id: string; sender: "me" | "them"; content: string; time: string }[];
}

export const conversations: Conversation[] = [
  {
    id: "c1",
    user: users[0],
    lastMessage: "Sure, I'll send you the fertilizer schedule tomorrow.",
    time: "10m ago",
    unread: 2,
    messages: [
      { id: "m1", sender: "them", content: "Hey! I saw your post about organic tomatoes. What fertilizer mix are you using?", time: "2h ago" },
      { id: "m2", sender: "me", content: "I'm using a custom NPK mix — 15-15-15 with added calcium. Works great for my soil type.", time: "1h ago" },
      { id: "m3", sender: "them", content: "That sounds promising. Can you share the exact schedule?", time: "30m ago" },
      { id: "m4", sender: "them", content: "Sure, I'll send you the fertilizer schedule tomorrow.", time: "10m ago" },
    ],
  },
  {
    id: "c2",
    user: users[1],
    lastMessage: "The layer mortality rate dropped to 0.3% after switching feeds.",
    time: "1h ago",
    unread: 0,
    messages: [
      { id: "m5", sender: "me", content: "How's the new feed working out for your layers?", time: "3h ago" },
      { id: "m6", sender: "them", content: "The layer mortality rate dropped to 0.3% after switching feeds.", time: "1h ago" },
    ],
  },
  {
    id: "c3",
    user: users[3],
    lastMessage: "I have 10 heads available. Want to visit the farm?",
    time: "3h ago",
    unread: 1,
    messages: [
      { id: "m7", sender: "me", content: "Are you still selling Friesian heifers?", time: "5h ago" },
      { id: "m8", sender: "them", content: "Yes! I have a batch of 6-month-olds ready.", time: "4h ago" },
      { id: "m9", sender: "me", content: "What's the price per head?", time: "3.5h ago" },
      { id: "m10", sender: "them", content: "I have 10 heads available. Want to visit the farm?", time: "3h ago" },
    ],
  },
  {
    id: "c4",
    user: users[4],
    lastMessage: "Let me know if you need help with the deworming schedule.",
    time: "1d ago",
    unread: 0,
    messages: [
      { id: "m11", sender: "them", content: "I noticed your goats might need deworming based on the season.", time: "1d ago" },
      { id: "m12", sender: "them", content: "Let me know if you need help with the deworming schedule.", time: "1d ago" },
    ],
  },
];
