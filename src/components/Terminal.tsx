import { useEffect, useRef, useState } from 'react'

import Popup from 'reactjs-popup'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslations } from '../i18n/i18n'

type ObjStep = {
  type:
    | 'print'
    | 'prompt'
    | 'eprompt'
    | 'type'
    | 'password'
    | 'clear'
    | 'captcha'
    | 'getData'
  payload?: string
  collectionId?: string
  cb?: (value: string, print: (msg: string) => void) => boolean | 'break'
  cbnp?: (value: string) => void
  collector?: (data: any) => Promise<void>
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

  const terminalRef = useRef<any>()

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [nodes, inputVisible])

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
    if (step.type == 'getData') {
      return new Promise<void>(async resolve => {
        await step.collector!(finalData)
        resolve()
      })
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
                cb: async (data: any) => {
                  setNodes((nodes: any) => [
                    ...nodes,
                    <p className='font-mono text-base'>
                      {promptText} {data}
                    </p>,
                    '‎',
                  ])
                  if (step.type == 'eprompt' && step.cb) {
                    const res = step.cb(data, (msg: string) => {
                      setNodes((nodes: any) => [
                        ...nodes,
                        <p className='font-mono text-base'>{msg}</p>,
                      ])
                    })
                    if (res == true) {
                      resolve()
                    } else if (res == 'break') {
                      return
                    } else {
                      type_Process(step).then(() => {
                        resolve()
                      })
                    }
                  }

                  if (step.type == 'prompt') {
                    finalData[step.collectionId!] = data
                    resolve()
                  }
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
                  <Typed text={step.payload!} />
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
        if (e.key === 'c' && e.ctrlKey) {
          e.preventDefault()
          callback(null)
          return
        }
        setInput(input + e.key)
      } else if (e.key === 'Backspace') {
        setInput(input.slice(0, input.length - 1))
      } else if (e.key === 'Enter') {
        var data = input
        if (data.trim() == '') return
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
    <div
      ref={terminalRef}
      className='text-white cursor-text select-none bg-black w-full h-full font-mono p-2 overflow-y-scroll'
    >
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
      <div className='mb-5' />
    </div>
  )
}

const Typed = (props: { text: string; finishCb?: any }) => {
  const t = useTranslations()

  var text = props.text.trim() == '' ? '‎' : props.text

  if (text.startsWith('SignUp.')) {
    text = t(text)
  }

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
  cb: (value: string, print: (msg: string) => void) => boolean | 'break'
): {
  type: 'eprompt'
  payload: string
  cb: (value: string, print: (msg: string) => void) => boolean | 'break'
} => {
  return { type: 'eprompt', payload: question, cb }
}

export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const captcha = (
  payload: string,
  cbnp: (value: string) => void
): {
  type: 'captcha'
  payload: string
  cbnp: (value: string) => void
} => {
  return { type: 'captcha', payload, cbnp }
}

export const getData = (
  collector: (data: any) => Promise<void>
): {
  type: 'getData'
  collector: (data: any) => Promise<void>
} => {
  return { type: 'getData', collector }
}

export default Terminal
