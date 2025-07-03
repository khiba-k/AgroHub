import {v4 as uuidv4} from "uuid";
import { createClient } from "./client";

function getStorage() {
    const {storage} = createClient();
    return storage
}

type UploadProps = {
    file: File
    bucket: string
    folder?: string
}

export async function uploadImage({ file, bucket, folder = "" }: UploadProps) {
    const filename = file.name;
    const fileExtension = filename.split(".").pop() || "jpg";
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;
  
    const storage = getStorage();
  
    const { data, error } = await storage.from(bucket).upload(path, file);
  
    if (error) {
      console.error("Supabase upload error:", error);
      return { imageUrl: "", error: `Image upload failed: ${error.message || JSON.stringify(error)}` };
    }
  
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;
  
    return { imageUrl, error: "" };
  }
  

