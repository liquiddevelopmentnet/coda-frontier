/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

/*
 ! Warning: This code here was produced at a time where i could barely think because it was 3am.
 !          I'm sorry if i gave you eye cancer while reading this, not planning to improve it.
 */

import { useEffect, useState } from 'react'

function Terminal() {
  const prompts = [
    ['Please enter your email:', 'email'],
    ['Please enter your name:', 'name'],
    ['Some additional data (discuss with big rat)', 'add'],
  ]

  const [lines, setLines] = useState<any>([
    {
      content: 'Coda Host [Version 10.0.19044.1889]',
      prompt: false,
      typeAnimation: true,
      finish: () => {
        setLines((c: any) => [
          ...c,
          {
            content: '(c) Project Coda, LLC. All rights reserved.',
            prompt: false,
            typeAnimation: true,
            finish: () => {
              setLines((c: any) => [
                ...c,
                {
                  content: '‎',
                  prompt: false,
                  typeAnimation: true,
                  finish: () => {
                    setLines((c: any) => [
                      ...c,
                      {
                        content: prompts[0][0],
                        prompt: false,
                        typeAnimation: true,
                        finish: () => {
                          setInputVisible(true)
                        },
                      },
                    ])
                  },
                },
              ])
            },
          },
        ])
      },
    },
  ])

  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [promptData, setPromptData] = useState({})

  const [input, setInput] = useState<any>('')
  const [inputVisible, setInputVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (!inputVisible) return
      if (e.key.length === 1) {
        setInput(input + e.key)
      } else if (e.key === 'Backspace') {
        setInput(input.slice(0, input.length - 1))
      } else if (e.key === 'Enter') {
        setInput('')
        setInputVisible(false)
        if (currentPrompt >= prompts.length - 1) {
          setInputVisible(false)
          console.log({
            ...promptData,
            [prompts[currentPrompt][1]]: input,
          })
          setLines((c: any) => [
            ...c,
            {
              content: input,
              prompt: true,
              typeAnimation: false,
            },
            {
              content: '‎',
              prompt: false,
              typeAnimation: false,
            },
            {
              content: "Thank you for registering. You're all set!",
              prompt: false,
              typeAnimation: true,
              finish: () => {},
            },
          ])
          return
        }
        setPromptData({
          ...promptData,
          [prompts[currentPrompt][1]]: input,
        })
        var promptTitle = prompts[currentPrompt + 1][0]
        setCurrentPrompt(currentPrompt + 1)
        setLines((c: any) => [
          ...c,
          {
            content: input,
            prompt: true,
            typeAnimation: false,
          },
          {
            content: '‎',
            prompt: false,
            typeAnimation: false,
          },
          {
            content: promptTitle,
            prompt: false,
            typeAnimation: true,
            finish: () => {
              setInputVisible(true)
            },
          },
        ])
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [input, inputVisible])

  return (
    <div>
      {lines.map((line: any, index: any) => (
        <div key={index}>
          <Line
            prompt={line.prompt}
            content={line.content}
            typeAnimation={line.typeAnimation}
            cursor={!inputVisible && index === lines.length - 1}
            finish={line.finish}
          />
        </div>
      ))}
      {inputVisible && <Line prompt content={input} cursor />}
    </div>
  )
}

function Line({
  prompt = false,
  cursor = false,
  content = '',
  typeAnimation = false,
  finish = () => {},
}: {
  prompt?: boolean
  cursor?: boolean
  content?: string
  typeAnimation?: boolean
  finish?: () => void
}) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (typeAnimation && content != '') {
      var str = ''
      const interval = setInterval(() => {
        setTyped(str + content[str.length])
        str = str + content[str.length]
        if (str.length === content.length) {
          clearInterval(interval)
          setTimeout(finish, 300)
        }
      }, 50)
    }
    if (typeAnimation && content == '') finish()
  }, [typeAnimation])

  return (
    <p className={`font-mono text-base ${cursor && 'cursor-enabled'}`}>
      {prompt && 'coda:~ $ '}
      {typeAnimation ? typed : content}
    </p>
  )
}

export default Terminal
