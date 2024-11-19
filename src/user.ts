import { v4 as uuid4 } from "uuid";

interface UserInterface {
  id: string;
  username: string;
  numberOfPosts: number;
  created_at?: Date | string;
  updated_at: Date | string;
  borrowedBooksCount: number;
  borrowedBooks: string[];

  to_dict(): string;

}

type UserConstructorArgs = {
  username: string;
  borrowedBooksCount?: number;
  numberOfPosts?: number;
  id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  borrowedBooks?: string[];
};

class User implements UserInterface {
  public id: string;
  public username: string;
  public numberOfPosts: number;
  public created_at: Date | string;
  public updated_at: Date | string;
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
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // methods
  to_dict(): string {
    // creates a copy of user Object and allow for custom properties to be added to the JSON object using Record<string, any>
    const to_json: Record<string, any> = { ...this };

    // convert the dates to ISO strings
    to_json.created_at = new Date(this.created_at).toISOString();
    to_json.updated_at = new Date(this.updated_at).toISOString();

    // add the class name to the JSON object
    to_json["class_name"] = this.constructor.name;

    return JSON.stringify(to_json, null, 2);
  }
}

const user = new User({
  username: "kelly",
});

user.to_dict();

const user2 = new User({
  username: "kelly",
  borrowedBooksCount: 2,
  numberOfPosts: 5,
  borrowedBooks: ["Book1", "Book2"],
});

// console.log(user);
// console.log(user2);
