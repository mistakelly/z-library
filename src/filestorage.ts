// fileStorage.ts
import { User, UserConstructorArgs } from "./user";
import fs from "fs";

/**
 * Class representing the file storage for users.
 * This class handles storing and loading user data from a file.
 */
class FileStorage {
  private _filePath = "user_db.json"; // Path to the file where user data is stored
  private inMemoryDB: Record<string, any> = {}; // In-memory database to store user data

  constructor() {}

  /**
   * Adds a new User object to the in-memory database.
   * @param obj The User object to be added.
   */
  public newObj(obj: User): void {
    const key = `${obj.constructor.name}.${obj.id}`; // Key is a combination of the class name and user ID
    this.inMemoryDB[key] = obj; // Store the user object in memory

    console.log("this is in-memory DB", this.inMemoryDB);
  }

  /**
   * Saves all users from in-memory database to a file.
   * Converts the User objects to dictionaries and serializes them.
   */
  public save(): void {
    const serializedObj: Record<string, any> = {};

    // Convert each User object to a dictionary and store it
    for (let [key, value] of Object.entries(this.inMemoryDB)) {
      console.log(`key ${key} value ${value}`);
      serializedObj[key] = value.to_dict(); // Serialize the user object to a dictionary
    }

    // Write the serialized data to the file
    fs.writeFileSync(this._filePath, JSON.stringify(serializedObj, null, 2));
  }

  /**
   * Reloads the user data from the file and restores it to the in-memory database.
   */
  public reload(): void {
    if (fs.existsSync(this._filePath)) {
      const data: Record<string, UserConstructorArgs> = JSON.parse(
        fs.readFileSync(this._filePath, "utf-8") // Read and parse the JSON file
      );

      // Convert the parsed data back into User instances
      for (let [key, value] of Object.entries(data)) {
        console.log(`key ${key} value ${value}`);
        this.inMemoryDB[key] = new User(value); // Recreate the user instance
      }

      console.log("in-memory DB", this.inMemoryDB);
    }
  }
}

// Grouped export at the bottom for better organization
export const storage = new FileStorage(); // Create and export an instance of FileStorage
export { FileStorage }; // Export the class for direct usage if needed
