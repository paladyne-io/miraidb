import { ref } from 'vue';
import { supabase } from '../supabase'


export function useSupabaseCustomizations() {
  const saveCustomizationOptions = async (postId, options) => {
    const { data, error } = await supabase
      .from('blog_customizations')
      .insert([{ post_id: postId, customization_options: options }]);
    if (error) console.error('Error saving customization options:', error);
    return data;
  };

  const loadCustomizationOptions = async (postId) => {
    const { data, error } = await supabase
      .from('blog_customizations')
      .select('customization_options')
      .eq('post_id', postId)
      .single();
    if (error) console.error('Error loading customization options:', error);
    return data ? data.customization_options : null;
  };

  return { saveCustomizationOptions, loadCustomizationOptions };
}