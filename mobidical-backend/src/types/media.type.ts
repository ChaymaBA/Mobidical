export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export const AllowedMimeTypes: Record<MediaType, string[]> = {
  [MediaType.IMAGE]: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  [MediaType.VIDEO]: ['video/mp4', 'video/webm', 'video/ogg'],
  [MediaType.AUDIO]: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
  [MediaType.DOCUMENT]: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

// Liste plate si tu veux juste valider un mimetype sans savoir le type
export const AllAllowedMimeTypes = Object.values(AllowedMimeTypes).flat();
