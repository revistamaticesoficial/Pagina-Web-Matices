import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const storageService = {
  /**
   * Subir imagen a Supabase Storage
   * @param file - Archivo a subir
   * @param bucket - Bucket de Supabase (por defecto 'articles')
   * @param path - Ruta dentro del bucket (opcional)
   */
  async uploadImage(
    file: File,
    bucket: string = 'articles',
    path?: string
  ): Promise<{ url: string; path: string } | null> {
    try {
      // Generar nombre único para el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = path ? `${path}/${fileName}` : fileName

      // Subir archivo
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading file:', error)
        return null
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      return {
        url: urlData.publicUrl,
        path: data.path
      }
    } catch (error) {
      console.error('Error in uploadImage:', error)
      return null
    }
  },

  /**
   * Eliminar imagen de Supabase Storage
   * @param path - Ruta del archivo en el bucket
   * @param bucket - Bucket de Supabase (por defecto 'articles')
   */
  async deleteImage(path: string, bucket: string = 'articles'): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        console.error('Error deleting file:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deleteImage:', error)
      return false
    }
  },

  /**
   * Validar que un archivo es una imagen
   */
  isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    return validTypes.includes(file.type)
  },

  /**
   * Obtener tamaño de archivo en MB
   */
  getFileSizeMB(file: File): number {
    return file.size / (1024 * 1024)
  }
};

