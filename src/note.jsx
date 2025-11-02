import Markdown from "marked-react";
import deleteIcon from "./assets/delete.png";
import EditIcon from "./assets/edit.png";
import clsx from "clsx";

export default function Note({content,date,index,toggleDelete,toggleEdit,mode}){
  return(
    <div className="min-h-[200px] max-h-[400px] max-w-[90%] border-black border m-3 rounded min-w-[300px] prose font-mono flex flex-col">
      <div className="h-[40px] border-b w-full flex items-center justify-between gap-1 p-2">
        {date}
        <div className=" flex items-center justify-end gap-1">
          <button className="bg-[#262626] w-[25px] h-[25px] rounded-sm flex items-center justify-center hover:opacity-90 cursor-pointer" onClick={() => toggleEdit(index)}>
            <img src={EditIcon} alt="edit Icon" className="h-[20px]" />
          </button> 
          <button className={clsx("bg-[#262626] w-[25px] h-[25px] rounded-sm flex items-center justify-center hover:opacity-90 cursor-pointer",mode === "edit-mode" ? "bg-gray-500" : "opacity-100")} onClick={() => mode === "edit-mode" ? "" : toggleDelete(index)}>
            <img src={deleteIcon} alt="delete Icon" className="h-[20px]" />
          </button>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto custom-scroll">
        <Markdown value={content} options={{
              breaks: true,
              gfm: true,
              openLinksInNewTab: true,
            }}
            > 
        </Markdown>
      </div>
    </div>   
  )
}