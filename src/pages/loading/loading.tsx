import './loading.css'

function Loading(){
    return(
        <div className="loading-container">
            Loading
            <div className="dot-container">
                {Array.from({length:3})
                .map((_,i)=><span key={i} className="dot"></span>)}
            </div>
        </div>
    )
}

export default Loading;