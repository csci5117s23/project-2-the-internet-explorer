
const DayViewButton = ({title, color}) => {
    //get the memories filtered by the day
    function handleDaybutton(){
        
    }
    return (
        <button
            type="button"
            className={"inline-block rounded px-14 pt-28 pb-4 text-s font-medium uppercase leading-normal text-neutral-50 -[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-black " + color}
            onClick={handleDaybutton}
            >
            {title}
        </button>
    )
}

export default DayViewButton;