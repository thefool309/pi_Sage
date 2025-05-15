import { unlink } from "fs/promises";

export async function deleteXmlFile(filePath: string): Promise<void> {
  try {
    await unlink(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (err) {
    console.error(`Failed to delete ${filePath}:`, err);
  }
}
