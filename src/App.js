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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={e=>{
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    props.onUpdate(title, body);
  }}>
    <p><input type="text" name="title" placeholder='title' value={title} onChange={event => {
      setTitle(event.target.value);
    }}/></p>
    <p><textarea name="body" placeholder='body' value={body} onChange={event => {
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
  </form>
</article>
}

function App() {
  // const _mode = useState('Hello');
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState('Hello');
  const [id, setId] = useState(null); // 초기값 없음
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1 , title:'tom', body:'ethan'},
    {id:2 , title:'simon', body:'benji'},
    {id:3 , title:'rebecca', body:'ilsa'}
  ]);
  let content = null;
  let contextControl = null;

  if (mode === 'HELLO') {
      content = <Article first="Tom" last="cruise"></Article>
  }else if(mode === 'READ'){
    contextControl = <>
    <li>
      <a href={'/update/'+id} onClick={e => {
        e.preventDefault();
        setMode('UPDATE');
      }}>Update</a>
    </li>
    <li><input  type="button" value="Delete" onClick={() =>{
      const newTopics = [];
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id !== id) {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('HELLO');
    }}/></li> </>

    let first, last = null;  
    for (let i = 0; i < topics.length; i++){
      console.log(topics[i].id, id);
        if (topics[i].id === id) {
          first = topics[i].title;
          last = topics[i].body;
        }
      }
      content = <Article first={first} last={last}></Article>
  }else if (mode === 'CREATE') {
      content = <Create onCreate={(_title, _body) => {
        const newTopic = {id:nextId, title:_title, body:_body};
        // topics.push(newTopic);
        // setTopics(topics);        -- 원시타입이 아닌 객체는 해당 방식으로 컴포넌트를 리로드(다시 렌더링) 할 수 없음

        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
      }}></Create>
  }else if (mode === 'UPDATE') {
    let first, last = null;  
    for (let i = 0; i < topics.length; i++){
        if (topics[i].id === id) {
          first = topics[i].title;
          last = topics[i].body;
        }
      }
    content = <Update title={first} body={last} onUpdate={(title, body) =>{
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:title, body:body};
      for(let i =0; i <newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }

      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return (
    <div className="App"> 
      <Header title="Bread Barbor Shop" onChangeMode={(e) => {
        alert('조심 또 조심!');
        setMode('HELLO');        
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        alert(_id);
        setMode('READ');
        setId(_id); 
      }}></Nav>
        {content}
        <ul>
          <li>
            <a href="/create" onClick={e => {
              e.preventDefault();
              setMode('CREATE');
            }}>Create</a>
          </li>
          {contextControl}
        </ul>
    </div>
  );
}

export default App;
