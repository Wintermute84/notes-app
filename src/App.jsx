import plusicon from "./assets/plus.png"
import close from "./assets/close.png"
import done from "./assets/done.png"
import save from "./assets/save.png"
import info from "./assets/info.png"
import {nanoid} from "nanoid"
import { useEffect } from "react"
import { useState } from "react"
import clsx from "clsx"
import Note from "./note"

function App() {
  const [editor,setEditor] = useState({mode:"new-note",open:false,noteIndex:null,text:""})
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])


  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])

  const Notes = notes.map((noteData) => {
    return <Note mode={editor.mode} content={noteData.content} date={noteData.date} key={nanoid()} index={noteData.index} toggleDelete={toggleDelete} toggleEdit={toggleEditNote}/>
  })

  function toggleEditor(mode){
    setEditor({noteIndex:null,mode:mode,open:!editor.open,text:""})
  }

  function toggleDelete(index){
    const notesArray = notes.filter((noteData) => {
      if(noteData.index !== index){
        return noteData
      }
    })
    setNotes(notesArray)
  }

  function toggleEditNote(index){
    const noteToEdit = notes.find(n => n.index === index);
    setEditor({mode:"edit-mode",noteIndex:index,open:true,text:noteToEdit ? noteToEdit.content : ""})
  }


  function handleSubmit(formData){
    const textContent = formData.get('textContent')
    if(!(textContent.trim() === "")){
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const noteContent = { content:textContent,
                            date: formatted,
                            index: nanoid(),
                          }
      if(editor.mode === "new-note"){
        setNotes(prev => [...prev,noteContent])
        }
      else{
         const notesArray = notes.map((noteData) => {
          if(noteData.index === editor.noteIndex){
            const now = new Date();
            const formatted = now.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return {...noteData,content:textContent,date:formatted}
          }
          else{
            return noteData
          }})
          setNotes(notesArray)
        }}
    toggleEditor("new-note");
    }

  return (
    <div className='flex h-screen items-center justify-center relative'>
      <div className="border rounded-xl h-[98%] w-[98%] flex flex-col">
        <div className="text-black flex items-center justify-between my-2 mr-2 gap-1">
          <h1 className="text-5xl ml-2 font-[Poppins]">Notes.</h1>
          <button className="bg-black w-[40px] h-[40px] rounded-full text-3xl flex items-center justify-center cursor-pointer" onClick={() => toggleEditor("new-note")}>
            <img src={plusicon} alt="plus-icon" />
          </button>
        </div>
        <div className="flex-1 w-full rounded-b-xl border-t overflow-y-auto custom-scroll flex gap-1 flex-wrap items-start justify-center md:justify-normal">
            {Notes}
        </div>
      </div>
      <form action={handleSubmit} className={clsx("fixed w-[98%] h-[50%] bottom-0 bg-white border-2 rounded-t-3xl z-10 transition-transform duration-500", editor.open ? "translate-y-0" : "translate-y-[100vh]")}>
        <header className="border-b-2 z-40">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl m-2 font-[Poppins]">Editor.</h1>
            <div className="flex gap-1 p-2">
              <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">
                <button type="button" className="bg-black w-[40px] h-[40px] rounded-full text-3xl flex items-center justify-center cursor-pointer">
                <img src={info} alt="info-icon" />
              </button>
              </a>
              <button type="submit" className="bg-black w-[40px] h-[40px] rounded-full text-3xl flex items-center justify-center cursor-pointer">
                <img src={done} alt="done-icon" />
              </button>
              <button type="button" className="bg-black w-[40px] h-[40px] rounded-full text-3xl flex items-center justify-center cursor-pointer" onClick={toggleEditor}>
                <img src={close} alt="close-icon" />
              </button>
            </div>
          </div>
        </header>
        <div className="h-full">
          <textarea id="editor" name="textContent" className="w-full h-full font-[monospace] text-[14px] border-none focus:outline-none p-2 custom-scroll" placeholder="You can start typing your note here! For a refresher on writing markdown, you can click the info button above."
            value={editor.text}
            onChange={(e) => setEditor({...editor,text:e.target.value})}>
          </textarea>
        </div>
        
      </form> 
    </div>
  )
}

export default App
