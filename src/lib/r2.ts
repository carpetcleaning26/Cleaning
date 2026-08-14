import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || '';
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '';
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'canberra-cleaning-media';
const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || '';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
  // If R2 credentials are missing or unconfigured, log gracefully and fallback to local /pictures/
  if (!accountId || accountId === 'demo_account_id') {
    console.warn('[R2 Storage] Credentials unconfigured. Fallback URL returned for dev testing.');
    return `/pictures/${fileName}`;
  }

  const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, '-')}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  const baseUrl = publicUrl.endsWith('/') ? publicUrl.slice(0, -1) : publicUrl;
  return `${baseUrl}/${key}`;
}

export async function deleteFromR2(fileUrl: string): Promise<boolean> {
  if (!fileUrl || !fileUrl.includes('uploads/')) return false;

  try {
    const key = fileUrl.substring(fileUrl.indexOf('uploads/'));
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await r2Client.send(command);
    return true;
  } catch (err) {
    console.error('[R2 Storage] Error deleting file:', err);
    return false;
  }
}
