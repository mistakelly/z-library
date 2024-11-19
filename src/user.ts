// Import statements should typically be placed at the top of the file
import { v4 as uuid4 } from "uuid";
import { storage } from "./filestorage";

/**
 * User Interface - Defines the structure of a user object and its required methods.
 * It provides an abstraction for user-related operations such as saving and serializing to JSON.
 */
interface UserInterface {
  username: string;
  borrowedBooksCount?: number;
  numberOfPosts?: number;
  id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  borrowedBooks?: string[];

  /**
   * Converts the user object to a dictionary.
   * @returns A record containing user details in a key-value format.
   */
  to_dict(): Record<string, UserConstructorArgs>;

  /**
   * Saves the user object to a storage system (file/database).
   */
  save(): void;
}

/**
 * UserConstructorArgs - A type derived from UserInterface using `Omit` to exclude the "save" and "to_dict" methods.
 * This ensures the constructor arguments include only the properties needed to instantiate a User object,
 * keeping the code consistent and reducing redundancy.
 */
type UserConstructorArgs = Omit<UserInterface, "save" | "to_dict">;

/**
 * User class - Represents a user and implements the UserInterface.
 * This class handles user creation, serialization, and saving to a storage system.
 */
class User implements UserInterface {
  public id: string;
  public username: string;
  public numberOfPosts: number;
  public created_at: Date | string;
  public updated_at: Date | string;
  public borrowedBooksCount: number;
  public borrowedBooks: string[];

  /**
   * User constructor - Initializes a new User instance with the provided properties.
   * @param {UserConstructorArgs} args - The properties used to create a new user.
   */
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

  /**
   * Converts the user object to a dictionary.
   * @returns {Record<string, any>} A JSON representation of the user object with additional properties (e.g., class_name).
   */
  to_dict(): Record<string, any> {
    const to_json: Record<string, any> = { ...this };

    // Convert Date objects to ISO strings
    to_json.created_at = new Date(this.created_at).toISOString();
    to_json.updated_at = new Date(this.updated_at).toISOString();

    // Add the class name to the serialized object
    to_json["class_name"] = this.constructor.name;

    return to_json;
  }

  /**
   * Saves the user object to a persistent storage.
   * This method calls the save method of the storage module to persist the user data.
   */
  save(): void {
    // Save the user object to a storage system (e.g., file or database)
    storage.newObj(this);
    storage.save();
  }
}

// Example usage:
const user1 = new User({
  username: "kelly",
});

// Reloading data from storage and saving the user instance
storage.reload();

// Creating a second user instance with more properties
const user2 = new User({
  username: "kelly",
  borrowedBooksCount: 2,
  numberOfPosts: 5,
  borrowedBooks: ["Book1", "Book2"],
});

user1.save();
user2.save();

// exports
export { User, UserInterface, UserConstructorArgs };
