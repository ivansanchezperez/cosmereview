import { logger } from "../common/logger";
import { supabase } from "../config/supabase_storage";

const BUCKET_NAME = "images";

export async function uploadImage(file: File | Blob, filename: string) {
  // Filename contains the path to the file in the bucket, the folder name
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filename, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/jpeg",
  });

  if (error) {
    logger.log("Error uploading image, setting null", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}
