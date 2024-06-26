
function Model({show, onClose, children }) {

    return (
        <div style={{
            transform: show ? "translateX(0%)" : "translateX(-200%)",
          }} className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500">
            <div className="container mx-auto max-w-2xl h-[120vh] rounded-3xl bg-slate-800 px-4 py-6">
              <button onClick={() => { onClose(false);}} className="w-10 h-10 rounded-full mb-4 bg-slate-600">X</button>
              {children }
            </div>
          </div>
    )
}

export default Model;