import React from 'react'

export const PopupsContext = React.createContext({
  popups: [] as React.ReactElement[],
  dispatch: (popup: React.ReactElement) => {},
})

function Popuper(props: { children: React.ReactElement }) {
  const [popups, setPopups] = React.useState([] as React.ReactElement[])
  const dispatch = (popup: React.ReactElement) => {
    setPopups(p => [...p, popup])
  }

  return (
    <PopupsContext.Provider value={{ popups, dispatch }}>
      {popups.map((popup, i) => (
        <div key={i}>{popup}</div>
      ))}
      {props.children}
    </PopupsContext.Provider>
  )
}

export function usePopups() {
  return React.useContext(PopupsContext)
}

export default Popuper
