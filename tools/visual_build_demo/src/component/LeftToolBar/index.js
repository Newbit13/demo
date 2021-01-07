import css from './index.module.css';
import componentList from '../../componentlist';


function dragStartHandle(e){
    e.dataTransfer.setData('index', e.target.dataset.index)
}


function Header(){
    return (
        <div className={css.leftBar}>
            {componentList.map((comp,compIndex)=>{
                return (
                    <div 
                        key={comp.key}
                        className={css.btn} 
                        onDragStart={dragStartHandle}
                        draggable="true"
                        data-index={compIndex}
                    >
                        {comp.label}
                    </div>
                )
            })}
        </div>
    );
}

export default Header