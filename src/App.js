//import logo from './logo.svg';

import './App.css';
import React from 'react'
import styled from "@emotion/styled"
import { Button } from '@material-ui/core';

const PokemonRaw = ({pokemonn , onSelect}) => ( 
<tr>
  <td>{pokemonn.name.english}</td>
  <td>{pokemonn.type.join(",")}</td>
  <td><Button color="secondary" variant="contained" onClick={()=> onSelect(pokemonn)}>Select!</Button></td>
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

const Title=styled.h1`
text-align: center;
color: pink;
`;

const TwoColomns=styled.div`
display: grid;
grid-template-columns: 30% 70%;
grid-column-gap: 1rem;
`;
const Input=styled.input`
width: 80%;
font-size: x-large;
`;
function App() {
  const [filter,filterset] = React.useState("");
  const [selected,setselected]= React.useState(null)
  const[pokemon,setpokemon]=React.useState([])

  React.useEffect(()=>{
    fetch("http://localhost:3000/starting-react/pokemon.json")
    .then((res)=>(res.json()))
    .then((data)=>(setpokemon(data)));
  },[]);
  return (
    <div className="App" style={{margin:"auto",paddingTop: 30}}>
      <Title>pokemon test</Title>
      <Input value={filter} onChange={(e) => (filterset(e.target.value))}/>
      <TwoColomns>
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
       </TwoColomns>
    </div>
  );
}

export default App;
