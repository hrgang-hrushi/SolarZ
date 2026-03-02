export default function FundingProgress({ percent }){
  return (
    <div>
      <div className="progress-bar" style={{height:10,background:'#e6efe6',borderRadius:8,overflow:'hidden'}}>
        <div className="progress-fill" style={{width:`${percent}%`,height:'100%',background:'#1f8a3d'}} />
      </div>
    </div>
  )
}
