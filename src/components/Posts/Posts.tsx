import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Post from '../Post/Post';

import { PostsContext } from '../../contexts/PostsContext';

import { PostInterface } from '../../@types';

import './Posts.scss';

function Posts() {
  const posts = useContext(PostsContext);

  // React Router fournit un hook pour facilement
  // récupérer les paramètres d'URL
  // `useParams` renvoie un objet avec les paramètres en propriété
  // { nomDuParamètre: valeur }
  // const params = useParams();
  // { slug: 'react' }
  const { slug } = useParams();

  // SI j'ai une catégorie dans l'URL
  // ALORS je filtre mes articles
  // SINON j'affiche tout
  const filteredPosts = slug
    ? posts.filter(
        (post) => post.category.slug.toLowerCase() === slug.toLowerCase()
      )
    : posts; // ici c'est l'accueil

  const items = filteredPosts.map((post) => <Post key={post.id} data={post} />);

  // SI filteredPosts est un tableau vide,
  // ALORS la catégorie n'existe
  // Je veux :
  //   - soit mettre un texte personnalisé (« en cours d'écriture »)
  //      → une vue conditionnelle `{filteredPosts.length === 0 && <p>...</p>}`
  //   - soit on « lance une erreur »
  //      → on redirige vers la 404 ou la page d'accueil
  const navigate = useNavigate();

  useEffect(() => {
    if (!filteredPosts.length) {
      // `replace` : remplace (ou non) la page dans l'historique de navigation
      navigate('/', { replace: true });
    }
  }, [filteredPosts, navigate]);

  return (
    <main className="posts">
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div className="posts-list">{items}</div>
    </main>
  );
}

export default Posts;
