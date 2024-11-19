import { v4 as uuid4 } from "uuid";

interface UserInterface {
  id: string;
  username: string;
  numberOfPosts: number;
  created_at?: Date;
  updated_at: Date;
  borrowedBooksCount: number;
  borrowedBooks: string[];
}

type UserConstructorArgs = {
  username: string;
  borrowedBooksCount?: number; 
  numberOfPosts?: number; 
  id?: string; 
  created_at?: Date; 
  updated_at?: Date;
  borrowedBooks?: string[]; 
};

class User implements UserInterface {
  public id: string;
  public username: string;
  public numberOfPosts: number;
  public created_at: Date;
  public updated_at: Date;
  public borrowedBooksCount: number;
  public borrowedBooks: string[];

  constructor({
    id = uuid4(),
    username,
    borrowedBooksCount = 0,
    numberOfPosts = 0,
    created_at = new Date(),
    updated_at = new Date(),
    borrowedBooks = [],
  }: UserConstructorArgs) {
    this.id = id;
    this.username = username;
    this.borrowedBooksCount = borrowedBooksCount;
    this.borrowedBooks = borrowedBooks;
    this.numberOfPosts = numberOfPosts;
    this.created_at  = created_at
    this.updated_at = updated_at;
  }
}

const user = new User({
  username: "kelly",
});

const user2 = new User({
  username: "kelly",
  borrowedBooksCount: 2,
  numberOfPosts: 5,
  borrowedBooks: ["Book1", "Book2"],
});


console.log(user)
console.log(user2);
