import {useState} from 'react';
import './App.css';

function Header(props){
  console.log('props', props.title); 
  return <header>
      <h1><a onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}href="/">{props.title}</a></h1>
    </header>
}

function Nav(props){
  const list = [  ]
  for (let i=0;i <props.topics.length; i++){
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
        console.log(event.target.id);
      }} href={'/user/'+t.id}>
        {t.title}
      </a></li>)
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav> 
}

function Article(props) {
  return <article>
    <h2>{props.first}</h2>
    <h3>{props.last}</h3>
  </article>
} 

function App() {
  // const _mode = useState('Hello');
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState('Hello');
  const [id, setId] = useState(null); // 초기값 없음
  let content = null;
  const topics =[
    {id:1 , title:'tom', body:'ethan'},
    {id:2 , title:'simon', body:'benji'},
    {id:3 , title:'rebecca', body:'ilsa'}
  ];
  if (mode === 'Hello') {
      content = <Article first="Tom" last="cruise"></Article>
  }else if(mode === 'Wolrd'){
    let first, last = null;  
    for (let i = 0; i < topics.length; i++){
      console.log(topics[i].id, id);
        if (topics[i].id == id) {
          first = topics[i].title;
          last = topics[i].body;
        }
      }
      content = <Article first={first} last={last}></Article>
  }
 
  return (
    <div className="App"> 
      <Header title="Bread Barbor Shop" onChangeMode={(e) => {
        alert('조심 또 조심!');
        setMode('Hello');        
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        alert(id);
        setMode('Wolrd');
        setId(_id); 
      }}></Nav>
        {content}
    </div>
  );
}

export default App;
