import logo from './logo.svg';
import './App.css';

function Header(props){
  console.log('props', props.title); 
  return <header>
      <h1><a onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}href="/">WEB</a></h1>
    </header>
}

function Nav(props){
  const list = [  ]
  for (let i=0;i <props.topics.length; i++){
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.body} onClick={event => {
        event.preventDefault();
        props.onChangeMode(event.target.id);
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
      {props.last}
  </article>
} 

function App() {
  const topics =[
    {id:1 , title:'tom', body:'ethan'},
    {id:2 , title:'simon', body:'benji'},
    {id:3 , title:'rebecca', body:'ilsa'}
  ]
  return (
    <div className="App"> 
      <Header title="Bread Barbor Shop" onChangeMode={(e) => {
        alert('조심 또 조심!');        
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
          alert(id);
      }}></Nav>
      <Article first="Tom" last="cruise"></Article>
    </div>
  );
}

export default App;
