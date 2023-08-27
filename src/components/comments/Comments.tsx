export interface Comment {
  id: number;
  timestamp: number;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  comment: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    timestamp: 1234567890,
    author: {
      id: 1,
      username: "User 1",
      avatar: "https://api.multiavatar.com/1.svg",
    },
    comment: "This is an awesome comment",
  },
  {
    id: 2,
    timestamp: 1234567890,
    author: {
      id: 2,
      username: "User 2",
      avatar: "https://api.multiavatar.com/2.svg",
    },
    comment: "Are sure about that comment",
  },
  {
    id: 3,
    timestamp: 1234567890,
    author: {
      id: 1,
      username: "User 1",
      avatar: "https://api.multiavatar.com/1.svg",
    },
    comment: "This is my comment to say something",
  },
  {
    id: 4,
    timestamp: 1234567890,
    author: {
      id: 1,
      username: "User 1",
      avatar: "https://api.multiavatar.com/1.svg",
    },
    comment: "I comment about this, but I don't know what to say",
  },
  {
    id: 5,
    timestamp: 1234567890,
    author: {
      id: 1,
      username: "User 1",
      avatar: "https://api.multiavatar.com/1.svg",
    },
    comment: "I am the last to comment!",
  },
];
