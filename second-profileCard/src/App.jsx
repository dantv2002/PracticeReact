/* eslint-disable react/prop-types */
import "./App.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB"
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00"
  }
];

function App() {
  return (
    <div className="card" style={{backgroundColor: "#ab0753", color: "#000000"}}>
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(){
  return <img className="avatar" src="https://services.meteored.com/img/article/para-qual-lugar-o-universo-esta-se-expandindo-1685829316554_768.png" alt="Avatar"/>
}
function Intro(){
  return (
    <div>
      <h1>Name of ...</h1>
      <p>
        Hello, I&#39;m a member of this univers.
      </p>
    </div>
  )
}
function SkillList(){
  return (
    <div className="skill-list">
      {skills.map(sk => (<Skill skill = {sk.skill} level = {sk.level} color = {sk.color} key = {sk.skill}/>))}
    </div>
  )
}
function Skill(props){
  return (
    <div className="skill" style={{backgroundColor: props.color}}>
      <p>{props.skill}</p>
      <p>{props.emoji}</p>
      <span>
        {props.level === 'beginner' && '🥲'}
        {props.level === 'intermediate' && '👍'}
        {props.level === 'advanced' && '👌'}
      </span>
    </div>
  )
}

export default App
