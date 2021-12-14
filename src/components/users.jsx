import React, { useState } from "react";
import api from '../api/index'
const Users = () => {
    let [users, setUsers] = useState(api.users.fetchAll());
    const getBageClasses = (color) => {
        let classes = "";
        classes += color === "primary" ? "badge bg-primary" : "";
        classes += color === "secondary" ? "badge bg-secondary" : "";
        classes += color === "success" ? "badge bg-success" : "";
        classes += color === "danger" ? "badge bg-danger" : "";
        classes += color === "info" ? "badge bg-info text-dark" : "";
        classes += color === "dark" ? "badge bg-dark" : "";
        return classes;
    };
    const getBageClassesToString = (userLength) => {
      let classes = "";
      classes += userLength === 0 ? "badge bg-danger" : "badge bg-primary";
      return classes;
    }
    const deleteTable = () => {
      const table = document.querySelector('table');
      if (table !== null) table.remove();
      console.log(table)
    }
    const createString = (number) => {
        let combination = ''; 
        combination += number === 1 || number > 4 ? 'человек' : 'человека';
        let string = '';
        string += number + ' ' + combination + ' тусанёт с тобой сегодня';
        string = number === 0 ? 'Никто с тобой не тусанёт' : string;
        return string;
    }
    const deletePerson = (userId) => {
     setUsers((prevState) => prevState.filter(users => users._id != userId));
    }
    if (users.length === 0) {
      deleteTable();
    }
    return (
        <>
        <span className = {getBageClassesToString(users.length)}>{createString(users.length)}</span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" key = {1}>Имя</th>
              <th scope="col" key = {2}>Качества</th>
              <th scope="col" key = {3}>Профессия</th>
              <th scope="col" key = {4}>Встретился, раз</th>
              <th scope="col" key = {5}>Оценка</th>
              <th scope="col" key = {6}></th>
            </tr>
          </thead>
          <tbody>
          
        {users.map(users => (<tr key = {users._id}>
            <td>{users.name}</td>
            <td>{users.qualities.map(quality => (<span className = {getBageClasses(quality.color)}>{quality.name}</span>))}</td>
            <td>{users.profession.name}</td>
            <td>{users.completedMeetings}</td>
            <td>{users.rate + '/5'}</td>
            <td><button className = {getBageClasses("danger")} onClick={() => deletePerson(users._id)}>Delete</button></td>
           </tr>)
        )} 
        </tbody> 
        </table>  
        </>
        )
}
export default Users;