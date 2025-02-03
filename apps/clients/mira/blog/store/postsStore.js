import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSupabaseAPI } from '../composables/useSupabase';

// import.meta.env.BASE_URL

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([]);
  const imageCache = ref({}); // Cache for images
  const { fetchPosts, downloadImage, getPost, deletePost: deletePostFromAPI, getComments } = useSupabaseAPI();

  const BASE_URL = import.meta.env.BASE_URL

  const blogPlaceholderImage = BASE_URL + 'images/placeholders/esaias-tan-MKvjc2kar7Q-unsplash.jpg'

  const loadPosts = async () => {
    const fetchedPosts = await fetchPosts();

    // console.log("fetchedPosts BASE_URL: ", BASE_URL);
    
    posts.value = fetchedPosts.map(item => {
      item.liked = false; // Initialize liked property
      if (!item.image_url) {
        item.local_image = true;
        item.image_url = blogPlaceholderImage
        // item.image_url = '@images/placeholders/esaias-tan-MKvjc2kar7Q-unsplash.jpg'; // Default image
      }
      return item;
    });
  };

  const getPlaceholderImage = () => {
    return blogPlaceholderImage;
  }

  const getPostById = (id) => {
    const post = posts.value.find(p => p.id === id);
    if (post) {
      return post;
    }
    return null;
  }

  const editPost = (post) => {
    const index = posts.value.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts.value[index] = post;
    }
  };

  const deletePost = async (postId) => {
    await deletePostFromAPI(postId); // Call the deletePost function from useSupabase.js
    posts.value = posts.value.filter(p => p.id !== postId); // Remove the post from the store
    alert('Post deleted successfully!');
  };

  const getImageForPost = async (post) => {
    // console.log("Fetching image for post...");
    if (post.image) {
      console.log("Returning image from post: " + post.image);
      return post.image; // Return image if it's already set
    }
    // console.log("post.local_image: " + post.local_image);
    // console.log("post.image_url: " + post.image_url);

    if (post.local_image || post.image_url.startsWith('/images')) {
      // console.log("Returning local image URL: " + post.image_url);
      return post.image_url; // Return local image URL
    }
    if (post.image_url) {
      const imageKey = `${post.image_url}-${post.image_size}`; // Unique key based on URL and size
      const cachedImage = getCachedImage(imageKey);
      if (cachedImage) {
        console.log("Returning cached image for post: " + cachedImage);
        return cachedImage; // Return cached image if available
      }
      console.log("Downloading image from URL: " + post.image_url);
      const image = await downloadImage(post.image_url);
      cacheImage(imageKey, image); // Cache the downloaded image
      post.image = image; // Update the post's image property
      updatePostImage(post.id, image); // Update the post's image in the store
      console.log("Downloaded image and updated post:", post);
      return image
    }
    return null; // Fallback if no image is available
  };

  const updatePostImage = (postId, imageUrl) => {
    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value[index].image = imageUrl; // Update the image property
    }
  };

  const getCachedImage = (key) => {
    return imageCache.value[key] || null; // Return cached image or null
  };

  const cacheImage = (key, image) => {
    imageCache.value[key] = image; // Store image in cache
  };

  const updatePostComments = (postId, comment) => {
    const post = getPostById(postId);
    if (post) {
      if (!post.comments) {
        post.comments = []; // Initialize comments array if it doesn't exist
      }
      post.comments.push(comment); // Add the new comment to the comments array
    }
  };

  const getPostComments = async (postId) => {
    const comments = await getComments(postId);
    const post = getPostById(postId);
    if (post) {
      post.comments = comments; // Store the fetched comments in the post
    }
  };

  return { posts, loadPosts, getPlaceholderImage, getImageForPost, getPostById, editPost, deletePost, updatePostImage, cacheImage, getCachedImage, updatePostComments, getPostComments };
});
