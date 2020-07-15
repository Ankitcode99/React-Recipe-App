import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App=()=>{

  const APP_ID = '09e0ea4b';
  const APP_KEY = 'de18863a5efc83c7755f4d5f7c4710f9';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
    console.log("fetching ");
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className='search-form' >
        <input          
          placeholder="Try typing pasta..." 
          type="text" 
          className='search-bar' 
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className='search-button'>
          Bon Appetit
        </button>
      </form>

      <div className='recipes'>
      {
        recipes.map(curr_recipe => (
        <Recipe 
          key={curr_recipe.recipe.label}
          title={curr_recipe.recipe.label} 
          calories={curr_recipe.recipe.calories} 
          image={curr_recipe.recipe.image}
          ingredients = {curr_recipe.recipe.ingredients}
        />
  ))}
      </div>
      <p className="last">Made with &hearts; by AnkitCode99</p>
    </div>
  );
}

export default App;