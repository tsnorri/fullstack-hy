import { useState } from 'react'


const AnecdoteOfTheDay = ({ callbacks }) => {
  
  const { selectedAnecdote, selectedAnecdoteVotes, selectRandomAnecdote, voteCurrentAnecdote } = callbacks
  
  return <>
    <h1>Anecdote of the day</h1>
    <div>
      {selectedAnecdote()}<br/>
      has {selectedAnecdoteVotes()} votes<br/>
      <button onClick={voteCurrentAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
    </div>
  </>
}


const AnecdoteWithMostVotes = ({ state }) => {
  const { anecdotes, votes } = state
  
  if (0 < votes.length)
  {
    // Apparently no zip in JavaScript without extra modules.
    let maxIdx = 0
    for (let i = 1; i < votes.length; ++i)
    {
      if (votes[maxIdx] < votes[i])
        maxIdx = i
    }
    
    if (0 < votes[maxIdx])
    {
      return <>
        <h1>Anecdote with most votes</h1>
        <div>
          {anecdotes[maxIdx]}<br/>
          has {votes[maxIdx]} votes
        </div>
      </>
    }
  }
  
  return <></>
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const selectedAnecdote = () => anecdotes[selected]
  
  const selectedAnecdoteVotes = () => votes[selected]
  
  const selectRandomAnecdote = () => {
    const idx = Math.floor(Math.random() * anecdotes.length);
    setSelected(idx)
  }
  
  const voteCurrentAnecdote = () => {
    const newVotes = [...votes]
    ++newVotes[selected]
    setVotes(newVotes)
  }

  return (
    <div>
      <AnecdoteOfTheDay callbacks={{selectedAnecdote, selectedAnecdoteVotes, selectRandomAnecdote, voteCurrentAnecdote}}/>
      <AnecdoteWithMostVotes state={{anecdotes, votes}}/>
    </div>
  )
}

export default App
