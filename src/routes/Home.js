import axios from 'axios';
import React, { Component } from 'react';
import Movie from '../components/Movie';
import './Home.css'


export class Home extends Component {
  state = {
    isLoading : true,
    movies: []
  }

  getMovies = async () => {
  const {data: { data:{movies}}} =  await axios.get('https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count');
  console.log(movies);
  this.setState({isLoading : false, movies}) //키와 키 값이 동일하면 하나만 쓸수있다.
  }
  componentDidMount(){
    // setTimeout(() =>{
    //   this.setState({isLoading: false});
    // },6000)
    // axios.get('https://yts-proxy.now.sh/list_movies.json');
    this.getMovies();
  }
  
  render() {
    const {isLoading, movies} = this.state;
    return (
          <section className='container'>
            {isLoading ?
             (<div className='loader'>
               <span className='loader_txt'>Loading...</span>
               </div>) : 
                (<div className='movies'>
                  {movies.map((movie,index) =>(<Movie
                                                    key={index}
                                                    id ={movie.id}
                                                    year={movie.year}
                                                    title={movie.title}
                                                    summary={movie.summary}
                                                    poster={movie.medium_cover_image}
                                                    genres={movie.genres}
                                                />)
                                        )
                }
                </div>)
                }
            </section>
    )
  }
}

export default Home;