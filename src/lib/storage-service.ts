import { supabase } from './supabase';

export const storageService = {
  /**
   * Verificar si un bucket existe (solo verificación, no crea el bucket)
   */
  async ensureBucketExists(bucketName: string): Promise<boolean> {
    try {
      // Intentar listar archivos del bucket para verificar que existe
      // Si el bucket existe, esta operación no dará error
      const { error: listError } = await supabase.storage
        .from(bucketName)
        .list('', { limit: 1 });

      // Si no hay error, el bucket existe
      if (!listError) {
        console.log(`Bucket "${bucketName}" existe`);
        return true;
      }

      // Si hay error, verificar si es porque el bucket no existe
      const errorMessage = listError.message?.toLowerCase() || '';
      if (errorMessage.includes('not found') || errorMessage.includes('bucket not found') || errorMessage.includes('does not exist')) {
        console.error(`Bucket "${bucketName}" no existe`);
        throw new Error(`El bucket "${bucketName}" no existe. Por favor créalo manualmente en Supabase Storage con permisos públicos.`);
      }

      // Otro tipo de error
      console.error('Error verificando bucket:', listError);
      throw new Error(`Error al verificar el bucket "${bucketName}": ${listError.message}`);
    } catch (error: any) {
      console.error('Error ensuring bucket exists:', error);
      throw error;
    }
  },

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
      // Verificar que el bucket existe
      await this.ensureBucketExists(bucket);

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
        console.error('Error uploading file to Supabase:', error)
        // Lanzar el error para que se pueda manejar mejor en el componente
        throw new Error(error.message || 'Error al subir el archivo a Supabase Storage')
      }

      if (!data) {
        throw new Error('No se recibió respuesta del servidor')
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      if (!urlData?.publicUrl) {
        throw new Error('No se pudo obtener la URL pública del archivo')
      }

      return {
        url: urlData.publicUrl,
        path: data.path
      }
    } catch (error: any) {
      console.error('Error in uploadImage:', error)
      // Re-lanzar el error para que el componente pueda manejarlo
      throw error
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

