import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPostCard from './components/BlogPostCard';
import BlogPost from './components/BlogPost';
import LoadingSpinner from './components/LoadingSpinner';
import { getInitialPosts } from './services/geminiService';
import type { Post } from './types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialPosts = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      // Simulate network delay for a better loading experience
      await new Promise(resolve => setTimeout(resolve, 500));
      const initialPosts = getInitialPosts();
      setPosts(initialPosts);
    } catch (err) {
      console.error("Error loading initial posts:", err);
      setError("Failed to load blog posts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialPosts();
  }, [loadInitialPosts]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <LoadingSpinner />
          <p className="mt-4 text-text-secondary">Loading posts...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
          <p className="text-red-400 text-xl font-semibold">An Error Occurred</p>
          <p className="mt-2 text-text-secondary">{error}</p>
          <button
            onClick={loadInitialPosts}
            className="mt-6 px-6 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (selectedPost) {
      return <BlogPost post={selectedPost} onBack={handleBackToList} />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} onClick={() => handleSelectPost(post)} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;