export const initialChats = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Hey, did you check the report?",
    time: "10:30 AM",
    messages: [
      { from: "Alice", text: "Hey, did you check the report?", time: "10:30 AM" },
      { from: "You", text: "Yes — I'll update it today.", time: "10:31 AM" }
    ]
  },
  {
    id: 2,
    name: "Bob Lee",
    lastMessage: "Let's meet tomorrow",
    time: "Yesterday",
    messages: [
      { from: "Bob", text: "Let's meet tomorrow", time: "Yesterday" },
      { from: "You", text: "Sure, what time works?", time: "Yesterday" }
    ]
  },
  {
    id: 3,
    name: "Team Frontend",
    lastMessage: "PR merged ✅",
    time: "2 days ago",
    messages: [
      { from: "Sam", text: "PR merged ✅", time: "2 days ago" }
    ]
  }
];
