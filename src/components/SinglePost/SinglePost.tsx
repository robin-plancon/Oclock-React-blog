import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { PostInterface } from '../../@types';

import './SinglePost.scss';
import Spinner from '../Spinner/Spinner';

function SinglePost() {
  // je récupère mon paramètre
  const { slug } = useParams();

  // constante pour la redirection
  // dans React, il existe des règles pour les Hooks
  // l'une d'entre elles est qu'on ne peut utiliser un hook
  // uniquement au premier niveau du composant
  // ça veut dire :
  //   - pas dans une boucle
  //   - pas dans une condition
  //   - pas dans une fonction imbriquée
  //
  // > https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks
  //
  // Pour utiliser les hooks dans un bloc profond,
  // on passe par une variable intermédiaire
  const navigate = useNavigate();

  // je vais stocker le résultat de mon API
  const [post, setPost] = useState<PostInterface | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(
          `https://oblog-react.vercel.app/api/posts/${slug}`
        );

        // je simule un délai de 1 seconde pour mon appel API
        setTimeout(() => {
          setPost(data);
        }, 1000);
      } catch (error) {
        // console.error(error);
        // en cas d'erreur redirection
        navigate('/404', { replace: true });
      }
    }

    fetchPost();
  }, [navigate, slug]);

  // à l'initialisation (mon useEffect n'est pas encore appelé)
  // post est null
  if (!post) {
    return <Spinner />;
  }

  return (
    <main className="single">
      {/*
        `?.` optional chaining operator

        > https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        
        si `post` existe (non nul et défini),
        alors affiche `post.title`
        sinon affiche `undefined`
      */}
      <h1 className="single-title">{post?.title}</h1>
      {/* TODO : chercher la catégorie */}
      <h2 className="single-category">{post?.categoryId}</h2>

      <p className="single-content">{post?.content}</p>
    </main>
  );
}

export default SinglePost;
