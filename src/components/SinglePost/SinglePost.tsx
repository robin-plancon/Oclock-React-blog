import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../Spinner/Spinner';

import { CategoriesContext } from '../../contexts/CategoriesContext';

import { PostInterface } from '../../@types';

import './SinglePost.scss';

/*
  Objectif :
  récupérer le nom de la catégorie de l'article depuis le contexte

  1. on récupérer les catégories depuis le contexte
  2. on trouve la bonne catégorie en fonction de son id → `Array.find()`
  3. si on a une correspondance, j'ajoute la catégorie
      (objet obtenu à l'étape 2) à mon retour API (`data`)
*/
function SinglePost() {
  // 1. récupération des catégories
  const categories = useContext(CategoriesContext);

  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostInterface | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get<PostInterface>(
          `https://oblog-react.vercel.app/api/posts/${slug}`
        );

        // 2. on trouve la bonne catégorie
        const postCategory = categories.find(
          (category) => category.id === data.categoryId
        );

        // 3. je l'ajoute à `data`
        if (postCategory) {
          data.category = postCategory;
        }

        setTimeout(() => {
          setPost(data);
        }, 1000);
      } catch (error) {
        navigate('/404', { replace: true });
      }
    }

    fetchPost();
  }, [categories, navigate, slug]);

  if (!post) {
    return <Spinner />;
  }

  return (
    <main className="single">
      <h1 className="single-title">{post?.title}</h1>
      <h2 className="single-category">{post?.category?.name}</h2>

      <p className="single-content">{post?.content}</p>
    </main>
  );
}

export default SinglePost;
