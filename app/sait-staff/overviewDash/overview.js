"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import {
  getAllStudentsInformation,
  getRestaurantInformation,
} from "@/services/GetRequest/getRequest";

import { FaUsers, FaChartLine } from "react-icons/fa";
import { AiOutlineShop, AiOutlineTeam } from "react-icons/ai";
import { useSpring, animated } from "react-spring";

function NumberChange({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}
const Overview = ({ studentData, restaurantData }) => {
  const [totalNumberStudent, setTotalNumberStudent] = useState(0);
  const [studentActive, setStudentActive] = useState(0);
  const [studentNotActive, setStudentNotActive] = useState(0);
  const [restaurantActive, setRestaurantActive] = useState(0);
  const [restaurantNotActive, setRestaurantNotActive] = useState(0);
  const [totalNumberRestaurant, setTotalNumberRestaurant] = useState(0);
  const [students, setStudents] = useState(0);
  const [restaurants, setRestaurants] = useState(0);
  const currentDate = new Date(); //current date of system
  const dateBefore7Days = new Date(currentDate);
  dateBefore7Days.setDate(currentDate.getDate() - 7); // first create current date and then set date as date before 7 days.

  //for getting all students information
  useEffect(() => {
    if (studentData) {
      if (studentData.length > 0) {
        setTotalNumberStudent(studentData.length);

        // Temporary counters
        let activeCount = 0;
        let createdInLast7DaysCount = 0;
        let notActiveCount = 0;

        studentData.forEach((student) => {
          if (student.active) {
            activeCount += 1;
          }
          if (student.accountCreated && (student.accountCreated.toDate() >= dateBefore7Days)) {
            console.log("student created in last 7 days: ", student);
            createdInLast7DaysCount += 1;
          }
          if (!student.active) {
            notActiveCount += 1;
          }
        });

        // Update state with the calculated counts
        setStudentActive(activeCount);
        setStudents(createdInLast7DaysCount);
        setStudentNotActive(notActiveCount);
      }
    }
  }, [studentData]);

  useEffect(() => {
    if (restaurantData) {
      if (restaurantData.length > 0) {
        setTotalNumberRestaurant(restaurantData.length);

        // Temporary counters
        let activeCount = 0;
        let createdInLast7DaysCount = 0;
        let notActiveCount = 0;

        restaurantData.forEach((restarant) => {
          if (restarant.active) {
            activeCount += 1;
          }
          if (restarant.accountCreated.toDate() >= dateBefore7Days) {
            console.log("student created in last 7 days: ", restarant);
            createdInLast7DaysCount += 1;
          }
          if (!restarant.active) {
            notActiveCount += 1;
          }
        });

        // Update state with the calculated counts
        setRestaurantActive(activeCount);
        setRestaurants(createdInLast7DaysCount);
        setRestaurantNotActive(notActiveCount);
      }
    }
  }, [restaurantData]);

  return (
    <div className="flex justify-between flex-wrap">
      <Card
        title="New Students"
        value={students}
        icon={<AiOutlineTeam className="w-10 h-10" />}
        change={Math.round((students / totalNumberStudent) * 100)}
        changeType={
          studentActive - studentNotActive >= 0 ? "increase" : "decrease"
        }
        text="in The last 7 days"
      />
      <Card
        title="New Restaurants"
        value={restaurants}
        icon={<AiOutlineShop className="w-10 h-10" />}
        change={(restaurants / totalNumberRestaurant) * 100}
        changeType={
          restaurantActive - restaurantNotActive >= 0 ? "increase" : "decrease"
        }
        text="in The last 7 days"
      />

      <Card
        title="Transactions rate"
        value={<NumberChange n={256} />}
        icon={<FaChartLine className="w-10 h-10" />}
        change="Overflow"
        changeType="increase"
        text="Based on site Data"
      />
    </div>
  );
};

export default Overview;
