import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function ImageDropper({input_output, upload_pressed=false}) {
  const [image, setImage] = useState(null)
  const [imageAttributes, setImageAttributes] = useState(null);
  const [pressed, setPressed] = useState(null);
  const [error, setError] = useState(null);
  const [todoList, setTodoList] = useState([]);
  

  useEffect(() =>{
    if (imageAttributes){
      console.log("attributes: ", imageAttributes);
      localStorage.setItem("Attributes", {channels: imageAttributes.Channels, dimensions: [imageAttributes.Dimensions[0], imageAttributes.Dimensions[1]]})
    }
    
  }, [imageAttributes])


  const uploadImage = async () => {
      if (!image && !upload_pressed) return;
      const formData = new FormData();
      formData.append("image", image);
      
      try{
        const res = await axios.post('http://localhost:8080/api/upload', formData)
        console.log(res.data.result)
        setImageAttributes(res.data.result)
      }catch (err){
        setError('Error uploading image:', err)
      } finally{
        setPressed(prev => !prev)
      } 
    }

  useEffect(() => {
    if(upload_pressed) {
      uploadImage
    }
  }, [upload_pressed])  

  const handleImageChange = (e) => {
    e.preventDefault()
    try{
      const file = e.target.files[0]
      if (file) setImage(file);
    } catch (err) {
      co
    }
    
  }
  return (
    <div className="w-[85%] h-[720px] mx-auto bg-[--bg-tertiary] flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md" onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()} >
      {error && (
        <div className="bg-(--error) border-2 rounded-2 w-[80%] text-(--text-primary) p-2">
          <label > {error}</label>
        </div>
      )}
      <label htmlFor="fileInput" className=" ">
        Drop your image here: &nbsp; <input type="file" id="fileInput" accept="image/*"  onChange={handleImageChange} /> 
      </label>
      
      {/* this is where you need to change the image */}
      {image && <img src={URL.createObjectURL(image)} alt="Dropped" className="max-w-[720px] max-h-[520px] p-4" />}
      {imageAttributes && (
        <div className="mt-4">
          <h3>Image Attributes:</h3>
          <p>Channels: {imageAttributes.Channels}</p>
          <p>Dimensions: {imageAttributes.Dimensions[0]} x {imageAttributes.Dimensions[1]}</p>

        </div>
      )}
    </div>
  )
}

function FishCheck() {
  const [result, setResult] = useState(null)
  const [fish, setFish] = useState('')
 
  const checkFish = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/api/fishcheck', { fish })
      setResult(response.data.valid ? 'Valid fish' : 'Invalid fish');
    } catch (error) {
      console.error('Error checking fish:', error);
      setResult('Error checking fish');
    }
  }
  return (
    <form onSubmit={checkFish} className="flex flex-col items-center p-4 bg-(--bg-tertiary)">
      <input type="text" value={fish} onChange={(e) => setFish(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
        Check Fish
      </button>
      {result && <p className="text-green-500">{result}</p>}
    </form>
  )
}
function App() {
  const [apiData, setApiData] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const Configs = [{name: "Gaussian Blur", kernalsize: [0, 0]},
                  {name: "Median Blur", kernalsize: 0},
                  {name: "Bilateral Filter", sigma_color: 75, sigma_space: 75},
                  {name: "Canny", kernalsize: [0, 0]}]

  const [myValue, setMyValue] = useState({})
  const [valueConfigs, setValueConfigs] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api/data')
    console.log('API response:', response.data)
    setApiData(response.data.users)
  }
  
  useEffect(() => {
    if(submitted){
      console.log("value ",myValue)
      setValueConfigs(myValue)
    }
  }, [submitted])


  useEffect(() => {
    try{
      if (valueConfigs) {
        const localStorageUpdate = async ({name, data}) => {
          const configs = localStorage.getItem("configs") || {};
          if (configs.length < 1) {
            localStorage.setItem({name: name, data: data})
          } 
          configs.map(Config => {
            if (Config.name === name) {
              localStorage.setItem({name: name, data: data})
            }
          })
        }
        // valueConfigs should look like [{name: "name", data: {kernalsize: 0}}]
        valueConfigs.map(item => localStorageUpdate(item.name, item.data))
      }

    }catch (err){
      console.log("Something went wrong with uploading settings! ", err)
      console.log("valueconfig: ", valueConfigs)
    }
  }, [valueConfigs])

  useEffect(() => {
    fetchAPI()
  }, [])


  return (
    <>
      <div className="w-full h-screen md:h-dvh  mx-auto bg-(--bg-primary) ">
        {/* <div className=" mx-auto text-[#999] text-center bg-[#f0f0f0]">
          <FishCheck />
        </div> */}

        <section id="header">
          <div className="w-full h-[60px]   border-b-2 border-(--border)">
            <div className='h-full w-[90%] mx-auto flex flex-row items-center justify-between '>
              <h2 className='text-2xl hover:underline'>TinkerTabby</h2>
              <div className="w-[20%]  p-2 flex gap-3">
                <label className="hover:underline">More from Us</label>
                <label className="hover:underline">About Us</label>
              </div>

            </div>
          </div>
        </section>
        <div id="content" className="w-[95%] mx-auto flex flex-row justify-between">
          <section id="images">
            <div className=" mx-auto text-[#999] text-center flex  p-3">
              <ImageDropper input_output="input" upload_pressed={submitted}/>      
              <ImageDropper input_output="output"/>      
            </div>
          </section>
          <section id="inputs">
            <div className="w-[360px] h-full border-l-2 shadow-2xl">
              <h3 className="p-3">Configurations:</h3>
              {
                Configs.map(item => (
                  <div>
                    <label>{item.name}</label>
                  </div>
                ))
              }
              <div className="w-[90%] mx-auto ">
                <div>
                  <label>Gausssian Blur</label>
                  <div className="flex w-[80%] justify-between">
                    <p>1</p>
                    <p>{myValue.GB?.kernalsize ?? 1}</p>
                    <p>31</p>
                  </div>
                  {/* setValueConfigs({name: "Gaussian Blur", kernalsize: Number(e.target.value)}) && console.log(Number(e.target.value)) && */}
                  <input type="range" min={1} max={31} step={2} value={myValue.GB?.kernalsize ?? 1} onChange={(e => setMyValue({...myValue, GB:{name: "Gaussian Blur", kernalsize: Number(e.target.value)} }) )} className= "w-[80%] mx-auto cursor-pointer"/>
                </div>
                <div>
                  <label>Median Blur</label>
                  <div className="flex w-[80%] justify-between">
                    <p>1</p>
                    <p>{myValue.MB?.kernalsize ?? 1}</p>
                    <p>31</p>
                  </div>
                  <input type="range" min={1} max={31} step={2} value={myValue.MB?.kernalsize ?? 1} onChange={(e => setMyValue({...myValue, MB:{name: "Median Blur", kernalsize: Number(e.target.value)} }) )} className= "w-[80%] mx-auto cursor-pointer"/>
                </div>
                <div>
                  <label>Bilateral Blur</label>
                  <div className="flex w-[80%] justify-between">
                    <p>1</p>
                    <p>{myValue.BB?.diameter ?? 1}</p>
                    <p>15</p>
                  </div>
                  <input type="range" min={1} max={15} step={2} value={myValue.BB?.diameter ?? 1} onChange={(e => setMyValue({...myValue, BB:{...myValue.BB,name: "Bilateral Filter", diameter: Number(e.target.value)}}) )} className= "w-[80%] mx-auto cursor-pointer"/>
                  <div className="flex w-[80%] justify-between">
                    <p>1</p>
                    <p>{myValue.BB?.sigmaColor ?? 1}</p>
                    <p>150</p>
                  </div>
                  
                  <input type="range" min={1} max={150} step={2} value={myValue.BB?.sigmaColor ?? 1} onChange={(e => setMyValue({...myValue, BB:{...myValue.BB, name: "Bilateral Filter", sigmaColor: Number(e.target.value), } }) )} className= "w-[80%] mx-auto cursor-pointer"/>
                  <div className="flex w-[80%] justify-between">
                    <p>1</p>
                    <p>{myValue.BB?.sigmaSpace ?? 1}</p>
                    <p>150</p>
                  </div>
                  <input type="range" min={1} max={150} step={2} value={myValue.BB?.sigmaSpace ?? 1} onChange={(e => setMyValue({...myValue, BB:{...myValue.BB, name: "Bilateral Filter", sigmaSpace: Number(e.target.value)} }) )} className= "w-[80%] mx-auto cursor-pointer"/>
                </div>
              </div>
              <button type="button" onClick={() => setSubmitted(prevState => !prevState)} className=" rounded-[5px] border-transparent p-2 bg-(--bg-tertiary) text-(--text-secondary) 
      transition-all duration-200 hover:bg-(--bg-secondary)">
        Upload Image
      </button>
            </div>

          </section>
        </div>
        {/* {apiData && apiData.map((user, index) => (
          <div key={index}>
            <div className=" p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ">
              <p>{user.name}</p>
              <p>{user.id}</p>
            </div>
          </div>
        ))} */}
      
      </div>



      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="bg-amber-50" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section> */}

      {/* <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  )
}

export default App
