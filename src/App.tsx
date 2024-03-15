import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { create } from 'zustand'

interface CounterState {
  state: {
    counter: number
  }
  setState: (props: Partial<CounterState['state']> | ((s: Partial<CounterState['state']>) => Partial<CounterState['state']>)) => void
}

export const useStore = create<CounterState>()((set) => ({
  state: {
    counter: 0
  },
  setState: (props) => {
    if (typeof props === 'object'){
      return set((s) => ({ state: { ...s.state, ...props } }));
    }

    if (typeof props === 'function') {
      return set((s) => ({ state: { ...s.state, ...(props(s.state)) } }));
    }
  },
}));

function App() {
  const {state, setState} = useStore()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button 
          onClick={() => {
            setState({counter: state.counter + 1})
            setState(s => ({counter: Number(s.counter) + 1}))
          }}
        >
          count is {state.counter}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
