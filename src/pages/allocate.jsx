import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopUp from '../components/PopUp' 

const Allocate = () => {
    const ObtainData = JSON.parse(localStorage.getItem('employeename')) || {};
    
    const [PNAME, setPNAME] = useState('');
    const [Percent, setPercent] = useState('');
    const [employees, setNewemployees] = useState([]); 
    const [deletionSuccess, setDeletionSuccess] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3030/data')
            .then((res) => res.json())
            .then(data => setNewemployees(data))
            .catch(error => console.error('error fetching data:', error));
    }, []);
    const handlechange = (event) => {
        setPNAME(event.target.value);
    };
    const percentchange = (e) => {
        setPercent(e.target.value);
    };
    const [isOpen, setIsOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const handleClose = () => {
        setIsOpen(false);
        if (deletionSuccess) {
            navigate('/employee');
        }
    };

    const ENAME = ObtainData.selectedOption ? ObtainData.selectedOption.label : '';

    
    const selectNew = () => { 
        localStorage.removeItem('employeename')
        navigate('/employee')
    };
    const EmployeeDel = () => {
        if (ENAME === "") {
            setPopupMessage("PLEASE SELECT EMPLOYEE NAME");
            setIsOpen(true);
            return;
        }
        const employeeToUpdate = employees.find(emp => emp.employeeName === ENAME);
        fetch(`http://localhost:3030/data/${employeeToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewemployees(employees.filter(item => item.employeeName !== ENAME)); 
                setPopupMessage('Employee deleted successfully');
                setIsOpen(true);
                console.log('Success:', data);
                localStorage.removeItem('employeename')
                setDeletionSuccess(true);
            })
            .catch(error => {
                console.error('Error:', error);
            }); 
            
             
        };
    const assign = (ENAME, PNAME, Percent) => {
        const newPercentage = parseInt(Percent, 10);
        if (ENAME === "") {
            setPopupMessage('PLEASE SELECT EMPLOYEE NAME');
            setIsOpen(true)
            return;
        }
        if (PNAME === "") {
            setPopupMessage('PLEASE ENTER PROJECT NAME');
            setIsOpen(true);
            return;
        }
        if (Percent === "") {
            setPopupMessage('PLEASE ENTER PERCENTAGE');
            setIsOpen(true);
            return;
        }
        if (newPercentage < 1 || newPercentage > 100) {
            setPopupMessage('PLEASE ENTER VALID PERCENTAGE WHICH LIES BETWEEN 1 AND 100');
            setIsOpen(true);
            return;
        }

        if (employees.length === 0) {
            console.error('Employees data not yet loaded');
            return;
        }

        const updatedEmployee = employees.map(item => {
            if (item.employeeName === ENAME) {

                const totalPercentage = item.percentage.reduce((acc, curr) => acc + curr, 0) + newPercentage;
                if (totalPercentage > 100) {
                    setPopupMessage('Total percentage exceeds 100%');
                    setIsOpen(true);
                    return item;
                }
                return {
                    ...item,
                    project: [...item.project, PNAME],
                    percentage: [...item.percentage, newPercentage],
                };

            }

            return item;

        })
        const employeeToUpdate = updatedEmployee.find(emp => emp.employeeName === ENAME);

        fetch(`http://localhost:3030/data/${employeeToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeToUpdate),
        })
            .then(response => response.json())
            .then(data => {
                setNewemployees(updatedEmployee);
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setPercent('');

    }
    return (
        <div className='bg-slate-600 min-h-screen'>
            <div className='text-center text-3xl  text-bold py-6 text-white  '>PROJECT ALLOCATION</div>
            <div className='text-xl font-semibold text-center text-white py-6 px-8  '>
                SELECTED EMPLOYEE NAME : &emsp;&emsp;{ENAME.toUpperCase()}
            </div>

            <div className='flex flex-row items-center justify-between  pt-8 pb-4 px-56'>
                <div className='text-l text-white'>NEW PROJECT NAME :</div>
                <div className='pr-6'><input type="text" placeholder='PROJECT NAME' value={PNAME} onChange={handlechange} className='border-2 rounded bg-slate-300 outline-none border-slate-500 placeholder: text-center'></input></div>
                <div className='text-l text-white '>PROJECT PERCENTAGE :</div>
                <div ><input type="number" min="1" max="100" placeholder='PERCENTAGE' value={Percent} onChange={percentchange} className='w-44 border-2 rounded bg-slate-300 outline-none border-slate-500 placeholder: text-center'></input></div>
            </div> 
            
            <div className='flex flex-col place-content-center items-center pr-7 pt-8 pb-4 gap-5 '>
            <div className='text-center '><button className="bg-orange-500 text-white hover:bg-orange-600 w-40 border-2 rounded-lg " onClick={() => assign(ENAME, PNAME, Percent)}>ALLOCATE</button></div>
                <div><button className="bg-amber-500 text-white hover:bg-orange-600 w-40 border-2 rounded-lg " onClick={selectNew}>CHANGE EMPLOYEE</button></div>
                <div><button className="bg-red-500 text-white hover:bg-red-600 w-40 border-2 rounded-lg " onClick={EmployeeDel}>DELETE EMPLOYEE</button></div>
            </div>
            <div className='pt-5'>
                <div className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-500'>
                    <div className='text-white text-center text-bold px-20'>FULL NAME</div>
                    <div className='text-white text-center text-bold '>EMAIL</div>
                    <div className='text-white text-center text-bold'>PROJECT</div>
                    <div className='text-white text-center text-bold'>PERCENTAGE</div>
                </div>
            </div>

            {employees.map((item) => (
                item.employeeName === ENAME && (
                    <div key={item.id} className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-400'>
                        <div className='text-white text-center text-bold px-20'>{item.employeeName}</div>
                        <div className='text-white text-center text-bold '>{item.email}</div>
                        <div className='text-white text-center text-bold'>{item.project.map((project, index) => (<div key={index}>{project}</div>))}</div>
                        <div className='text-white text-center text-bold'>{item.percentage.map((percentage, index) => (<div key={index}>{percentage}</div>))}</div>
                    </div>
                )))}

            <PopUp isOpen={isOpen} onClose={handleClose}>
                <h2 className="text-xl  text-white font-semibold">{popupMessage}</h2>
                `       </PopUp>


        </div>





    )
}

export default Allocate 
