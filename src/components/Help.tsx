import React from "react";

function Help(){
    return(
        <div className="w-100 h-100 p-12">
            <h3 className="text-gray-500 text-center font-normal">This is a simulator of an automated ordering business,
                although it is only the proof of what a delivery application is,
                with this project you can become a large delivery managment network.
                To make use of this test, in the left panel you will see the list of all deliveres,
                in green are the available deliveres and in red those that are delivering orders,
                all deliveres will have a time of 5 min to deliver an order after that period you can occupy them.
            </h3>
            <footer className="text-blue-400 text-center mt-6">Copyright ©Koderx Development 2022</footer>
        </div>
    )
}
export default Help;