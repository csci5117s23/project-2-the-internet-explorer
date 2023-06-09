import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react"

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function DayDropdown({ day, curCategory, tripMemories, tripID, router }) {
  const [tripDays, setTripDays] = useState([]);
  
  if (day === undefined) {
      return <></>
  }

  // Find the list of unique days in the memories.
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
          let curDate = new Date(date);
          let month = curDate.getMonth();
          let day = curDate.getDate();

          let curDay = {
            "iso": date,
            "dateStr": `${months[month]} ${day}`
          };
          daysList.push(curDay);
        }

        if (day != "All Days") {
          let curDay = daysList.find(curDay => curDay.dateStr === day);
          let curDayIdx = daysList.indexOf(curDay);
          daysList.splice(curDayIdx, 1); 
        }

        daysList.sort((a, b) => {
          return a.iso < b.iso ? -1 : 1
        });

        setTripDays(daysList);
      }
    }
    findDaysList();
  }, [router, day, tripMemories]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {day}
          <FontAwesomeIcon className="-mr-1 h-5 w-5 text-gray-400" icon={faChevronDown} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item key={"All Days"}>
              <Link href={curCategory && curCategory !== "All Categories" ? `/trips/${tripID}/category?category=${curCategory}` : `/trips/${tripID}`} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                All Days
              </Link>
            </Menu.Item>
            {tripDays.map((object, i) => {
              let link = `/trips/${tripID}/day?day=${object.iso}`;
              if (curCategory && curCategory != "All Categories") {
                link = `/trips/${tripID}/category?day=${object.iso}&category=${curCategory}`;
              }
              return (
                <Menu.Item key={i}>
                  <Link href={link} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                    {object.dateStr}
                  </Link>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}