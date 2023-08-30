import { ReactElement, createContext, useEffect, useState } from 'react';
import axios from 'axios';

import { PostInterface } from '../@types';

// création du contexte
const PostsContext = createContext<PostInterface[]>([]);

// création du Provider
function PostsProvider({ children }: { children: ReactElement }) {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(
          'https://oblog-react.vercel.app/api/posts'
        );
        // on stocke la réponse dans la variable d'état
        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    // c'est grâce à ce composant qu'on pourra accéder à `value`
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
}

export { PostsContext, PostsProvider };
