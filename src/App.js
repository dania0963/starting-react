//import logo from './logo.svg';

import './App.css';
import pokemon from './pokemon.json'
import React from 'react'
const PokemonRaw = ({pokemonn , onSelect}) => ( 
<tr>
  <td>{pokemonn.name.english}</td>
  <td>{pokemonn.type.join(",")}</td>
  <td><button onClick={()=> onSelect(pokemonn)}>Select!</button></td>
</tr>);

const PokemonInfo = ({name , base}) => ( 
  <div>
  <h2>{name.english}</h2>
  <table>
    <tbody>
      {Object.keys(base).map((key)=>(
        <tr>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

function App() {
  const [filter,filterset] = React.useState("");
  const [selected,setselected]= React.useState(null)
  return (
    <div className="App" style={{margin:"auto",paddingTop: 30}}>
      <h1 className="title">pokemon test</h1>
      <input value={filter} onChange={(e) => (filterset(e.target.value))}/>
      
      <table width="70%">
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {
            pokemon.filter((pok)=>(pok.name.english.includes(filter))).slice(0,10).map((pokemo) => 
            (
               <PokemonRaw pokemonn={pokemo}  key={pokemo.id} onSelect={(p)=>(setselected(p))} />
            ))
          }
        </tbody>
      </table>
      {selected && (
      <div>
        <h1>{selected.name.english}</h1>
        <PokemonInfo {...selected} />
      </div>
      )}
    </div>
  );
}

export default App;
