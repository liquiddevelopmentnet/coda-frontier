import { useEffect, useState } from 'react'

function Terminal() {
  const [nodes, setNodes] = useState<any>([])
  const [input, setInput] = useState<string>('')
  const [inputVisible, setInputVisible] = useState(false)
  const [inputCallback, setInputCallback] = useState<any>()

  var finalData: { [key: string]: string } = {}

  const prmt = (
    question: string,
    id: string
  ): { type: 'prompt'; payload: string; collectionId: string } => {
    return { type: 'prompt', payload: question, collectionId: id }
  }

  const type = (text: string): { type: 'type'; payload: string } => {
    return { type: 'type', payload: text }
  }

  const clear = (): { type: 'clear' } => {
    return { type: 'clear' }
  }

  const cycle: (
    | string
    | number
    | {
        type: 'prompt' | 'type' | 'password' | 'clear'
        payload?: string
        collectionId?: string
      }
  )[] = [
    type('Coda Host [Version 10.0.19044.1889]'),
    type('(c) Project Coda, LLC. All rights reserved.'),
    type(''),
    type('Welcome to the sign up wizard.'),
    type(''),
    prmt('Please enter your full name: ', 'name'),
    prmt('Please enter your email address: ', 'email'),
    prmt('Please enter your new password: ', 'password'),
    prmt('Please confirm your new password: ', 'passwordRepeat'),
    type(''),
    type('Injecting databases... 25%'),
    1000,
    type('Injecting databases... 75%'),
    1000,
    type('Injecting databases... done.'),
    type(''),
    type('Creating user...'),
    1000,
    type('Creating user... done.'),
    type(''),
    type('Creating session...'),
    1000,
    type('Creating session... done.'),
    3000,
    clear(),
    100,
    type('Welcome to Project Coda!'),
  ]

  const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const type_Process = async (step: any) => {
    if (step.type == 'clear') {
      setNodes([])
      return
    }
    if (step.type == 'type') {
      return new Promise(resolve => {
        setNodes((nodes: any) => [
          ...nodes,
          <Typed text={step.payload} finishCb={resolve} />,
        ])
      })
    }
    if (step.type == 'prompt') {
      return new Promise<void>(resolve => {
        setNodes((nodes: any) => [
          ...nodes,
          <Typed
            text={step.payload}
            finishCb={() => {
              setInputVisible(true)
              setInputCallback({
                cb: (data: any) => {
                  console.log(step.collectionId + ' > ' + data)
                  setNodes((nodes: any) => [
                    ...nodes,
                    <p className='font-mono text-base'>coda:~ $ {data}</p>,
                    '‎',
                  ])
                  finalData[step.collectionId] = data
                  resolve()
                },
              })
            }}
          />,
        ])
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      for (const step of cycle) {
        switch (typeof step) {
          case 'number':
            await wait(step)
            break
          case 'object':
            await type_Process(step)
            break
        }
        if (step === cycle[cycle.length - 1]) {
          console.log(finalData)
        }
      }
    })()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (!inputVisible) return
      if (e.key.length === 1) {
        setInput(input + e.key)
      } else if (e.key === 'Backspace') {
        setInput(input.slice(0, input.length - 1))
      } else if (e.key === 'Enter') {
        var data = input
        setInput('')
        setInputVisible(false)
        inputCallback.cb(data)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [input, inputVisible])

  return (
    <div className='text-white cursor-text select-none bg-black w-full h-full font-mono p-2'>
      {nodes.map((node: any, i: number) => (
        <div
          key={i}
          className={`flex ${
            i >= nodes.length - 1 && !inputVisible && 'cursor-enabled'
          }`}
        >
          {node}
        </div>
      ))}
      {inputVisible && (
        <p className='font-mono text-base cursor-enabled'>coda:~ $ {input}</p>
      )}
    </div>
  )
}

const Typed = (props: { text: string; finishCb?: any }) => {
  const text = props.text.trim() == '' ? '‎' : props.text

  const [typed, setTyped] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      var old = typed
      if (typed.length < text.length) {
        setTyped(old + text[typed.length])
      } else {
        if (props.finishCb) {
          setTimeout(props.finishCb, 200)
        }
        clearInterval(interval)
      }
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [typed])

  return <p className='font-mono'>{typed}</p>
}

export default Terminal
