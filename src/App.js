import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando toda a lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>


      <footer>
        © Matheus Reuter - 2021 <br />
        Direitos de imagem para Netflix e B7Web <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://www.theodysseyonline.com/media-library/image.gif?width=400&coordinates=26%2C0%2C26%2C0&height=763.9639639639639&quality=80&id=17432915" alt="Carregando..." />
        </div>
      }
    </div>
  );
}