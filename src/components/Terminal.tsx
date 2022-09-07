import { useEffect, useState } from 'react'

import Popup from 'reactjs-popup'
import ReCAPTCHA from 'react-google-recaptcha'

type ObjStep = {
  type:
    | 'print'
    | 'prompt'
    | 'eprompt'
    | 'type'
    | 'password'
    | 'clear'
    | 'captcha'
  payload?: string
  collectionId?: string
  cb?: (value: string, print: (msg: string) => void) => boolean
  cbnp?: (value: string) => void
}

type Step = string | number | ObjStep

function Terminal({
  cycle,
  callback,
  promptText,
}: {
  cycle: Step[]
  callback: (data: any) => void
  promptText: string
}) {
  const [nodes, setNodes] = useState<any>([])
  const [input, setInput] = useState<string>('')
  const [inputVisible, setInputVisible] = useState(false)
  const [inputCallback, setInputCallback] = useState<any>()

  var finalData: { [key: string]: string } = {}

  const type_Process = async (step: ObjStep) => {
    if (step.type === 'print') {
      var toPrint = step.payload?.trim() == '' ? '‎' : step.payload
      setNodes((nodes: any) => [
        ...nodes,
        <p className='font-mono text-base'>{toPrint}</p>,
      ])
    }
    if (step.type == 'clear') {
      setNodes([])
      return
    }
    if (step.type == 'type') {
      return new Promise(resolve => {
        setNodes((nodes: any) => [
          ...nodes,
          <Typed text={step.payload!} finishCb={resolve} />,
        ])
      })
    }
    if (step.type == 'prompt' || step.type == 'eprompt') {
      return new Promise<void>(resolve => {
        setNodes((nodes: any) => [
          ...nodes,
          <Typed
            text={step.payload!}
            finishCb={() => {
              setInputVisible(true)
              setInputCallback({
                cb: (data: any) => {
                  setNodes((nodes: any) => [
                    ...nodes,
                    <p className='font-mono text-base'>
                      {promptText} {data}
                    </p>,
                    '‎',
                  ])
                  if (
                    step.type == 'eprompt' &&
                    step.cb &&
                    step.cb(data, (msg: string) => {
                      setNodes((nodes: any) => [
                        ...nodes,
                        <p className='font-mono text-base'>{msg}</p>,
                      ])
                    })
                  )
                    resolve()

                  if (step.type == 'prompt') resolve()
                },
              })
            }}
          />,
        ])
      })
    }
    if (step.type == 'captcha') {
      return new Promise<void>(resolve => {
        setNodes((nodes: any) => [
          ...nodes,
          <Popup
            defaultOpen={true}
            position='center center'
            modal
            nested
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            {/* @ts-ignore */}
            {(close: any) => (
              <div className='bg-black w-full h-full border border-white px-[105px] py-5 flex flex-col items-center'>
                <div className='text-white font-mono mb-8 mt-5 cursor-enabled select-none flex'>
                  <Typed text='Just making sure that R2D2 stays out' />
                </div>
                <ReCAPTCHA
                  sitekey='6LeJm2ghAAAAABTf-6uB-MAv7CDoX6v2KIZSFH4Z'
                  onChange={(val: any) => {
                    setTimeout(() => {
                      close()
                      step.cbnp!(val)
                      resolve()
                    }, 1000)
                  }}
                />
                <div className='mt-6' />
              </div>
            )}
          </Popup>,
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
            await type_Process(step as ObjStep)
            break
        }
        if (step === cycle[cycle.length - 1]) {
          callback(finalData)
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
        <p className='font-mono text-base cursor-enabled'>
          {promptText} {input}
        </p>
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

export const print = (text: string): { type: 'print'; payload: string } => {
  return { type: 'print', payload: text }
}

export const type = (text: string): { type: 'type'; payload: string } => {
  return { type: 'type', payload: text }
}

export const clear = (): { type: 'clear' } => {
  return { type: 'clear' }
}

export const prmt = (
  question: string,
  id: string
): { type: 'prompt'; payload: string; collectionId: string } => {
  return { type: 'prompt', payload: question, collectionId: id }
}

export const ermt = (
  question: string,
  cb: (value: string, print: (msg: string) => void) => boolean
): {
  type: 'eprompt'
  payload: string
  cb: (value: string, print: (msg: string) => void) => boolean
} => {
  return { type: 'eprompt', payload: question, cb }
}

export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const captcha = (
  cbnp: (value: string) => void
): {
  type: 'captcha'
  cbnp: (value: string) => void
} => {
  return { type: 'captcha', cbnp }
}

export default Terminal
