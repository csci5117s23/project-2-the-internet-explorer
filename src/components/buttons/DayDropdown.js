import { faAngleDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'


const DayDropdown = ({day, tripMemories, tripID, router}) => {

    const [tripDays, setTripDays] = useState([]);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function handleSelect(e) {
      e.preventDefault();

      let day = e.target.value;

      let url = `/trips/${tripID}/day?day=${day}`;
      console.log(url);
      router.push(url);
    }

    if (day === undefined) {
        return <></>
    }

    useEffect(() => {
        const findDaysList = async () => {
          if (tripMemories) {
            let days = {};
            for (let memory of tripMemories) {
              if (days[memory.date]) {
                continue; // We already have this date represented.
              } else {
                days[memory.date] = memory;
              }
            }
            let daysList = [];
            for (const [date, memory] of Object.entries(days)) {
              console.log('date: ', date);
              let curDate = new Date(date);
              let month = curDate.getMonth();
              let day = curDate.getDate();

              let curDay = {
                'iso': date,
                'dateStr': `${months[month]} ${day}`
              };
              daysList.push(curDay);
                
            }
    
            setTripDays(daysList);
            console.log('days list: ', daysList);
          }
        }
        findDaysList();
      }, [router]);

      console.log(tripDays)

    return (
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
            All Days
            <FontAwesomeIcon className='-mr-1 h-5 w-5 text-gray-400' icon={faChevronDown} />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              {tripDays.map((object, i) => {
                return (
                  <Menu.Item key={i}>
                    <Link href={`/trips/${tripID}/day?day=${object.iso}`} className='text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100'>
                      {object.dateStr}
                    </Link>
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );

    return (
        <>
        <div className="flex text-black mt-1">
            <select className="text-black" onChange={handleSelect}>
            <option value="All Days">All Days</option>
            {tripDays.map((object, i) => {
                return <option key={i} value={object.iso}>{object.dateStr}</option>
            })}
            
            </select>
            
        </div>
            
        </>
    )
}

export default DayDropdown;