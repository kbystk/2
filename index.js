import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module'
import { useState, useCallback, useRef, useEffect } from 'https://unpkg.com/preact/hooks/dist/hooks.mjs?module'

const style = (e) => e ? 'display: block' : 'display: none'

const Starter = () => {
  const alerm = useRef(null)
  const [status, setStatus] = useState('prepare')
  const tick = useCallback(() => {
    setStatus('countdown')
    setTimeout(() => {
      setStatus('finished')
    }, 120000)
  }, [])
  const again = useCallback(() => {
    alerm.current.pause()
    tick()
  }, [])
  const stop = useCallback(() => {
    alerm.current.pause()
    setStatus('prepare')
  }, [])
  const exit = useCallback(() => {
    alerm.current.pause()
    setStatus('bye')
  }, [])
  useEffect(() => {
    if (status === 'finished') {
      alerm.current.play()
    }
  }, [status])
  return html`
    <div style=${style(status === 'prepare')} class="center">
      <button onClick=${tick} class="text-4">Start</button>
    </div>
    <div style=${style(status === 'countdown')}>
      <h2 class="center text-4">SHOW MUST GOES ON</h2>
    </div>
    <div style=${style(status === 'finished')}>
      <button class="text-4 block m-auto" onClick=${stop}>Continue</button>
      <button class="text-4 block m-auto" onClick=${again}>Again</button>
      <button class="text-4 block m-auto" onClick=${exit}>Rest</button>
    </div>
    <div style=${style(status === 'bye')}>
      <h2 class="center text-6">BYE!!</h2>
    </div>
    <audio src="assets/alerm.mp3" loop ref=${alerm}></audio>
  `
}

render(html`
  <h1 class="center text-6">2 minutes starter</h1>
  <${Starter} />
`, document.body)
