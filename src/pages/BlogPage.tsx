import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import ScrollUpButton from '../components/ScrollUpButton';
import { blogPosts, BlogPost } from '../data/blogPosts';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
      />

      <AnnouncementBar />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover insights about organic farming, nutrition, and sustainable living.
              Stay informed with our latest articles and expert advice.
            </p>
          </div>

          {!selectedPost ? (
            // Blog Posts Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
                      {post.author && <span>By {post.author}</span>}
                    </div>
                    <h2 className="text-xl font-semibold text-green-900 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-green-700 font-medium hover:text-green-900 transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            // Single Blog Post View
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-6 text-green-700 hover:text-green-900 font-medium flex items-center gap-2"
              >
                ← Back to Blog
              </button>

              <article className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50">
                <div className="h-64 md:h-80 overflow-hidden">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    {selectedPost.date && <span>{new Date(selectedPost.date).toLocaleDateString()}</span>}
                    {selectedPost.author && <span>By {selectedPost.author}</span>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                    {selectedPost.title}
                  </h1>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-lg mb-6">{selectedPost.description}</p>
                    {selectedPost.content && (
                      <div className="whitespace-pre-line">
                        {selectedPost.content}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ScrollUpButton />
    </div>
  );
}
