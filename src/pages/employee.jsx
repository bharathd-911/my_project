import React, { useState,useEffect} from 'react'
import Select from 'react-select' 
import { useNavigate } from 'react-router-dom'

const Employee=()=> { 

    const [selectedOption, setSelectedOption] = useState(null) 
    const [selectedProject, setSelectedProject] = useState(null)  

    const [data, setData] = useState([]); 
    useEffect(() => {
        fetch('http://localhost:3030/data')
            .then((res) => res.json())
            .then(d => setData(d))
            .catch(error => console.error('error fetching data:', error));
    }, []); 

    const options = data.map(item => ({
        label: item.employeeName,
        value: item.email, 
      })); 
    
      const variables = [...new Set(data.flatMap(item => item.project.map(project => project.toLowerCase())))]
    .map(project => ({ label: project, value: project }));
    

    const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label));  
    const sortedProjects = variables.sort((a, b) => a.label.localeCompare(b.label)); 
    
    const customFilterOption = (option, inputValue) => {
        return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
      };
    const navigate=useNavigate();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption); 
        
    }; 
    const change=(selectedProject)=>{
        setSelectedProject(selectedProject);
    } 
    const clears=()=>{
        setSelectedOption(null); 
        setSelectedProject(null);
    } 
    const allocate=()=>{
        const passingData={selectedOption}  
        localStorage.setItem('employeename', JSON.stringify(passingData));
        navigate('/project allocation')
    }
    return (
        <div className='bg-slate-600 min-h-screen'>
            <div className='text-center text-3xl  py-6 text-white '>EMPLOYEE DETAILS</div>


            <div className=' grid grid-cols-4 items-center justify-between gap-3 pt-8 pb-4'>
                <div className='text 3xl font-semibold text-white py-6 px-8'>EMPLOYEE NAME:</div>
                <div style={{ maxWidth: "250px", minWidth: "250px" }}><Select
                    options={sortedOptions} value={selectedOption}
                    onChange={handleChange}
                    className='min-w-68'
                    placeholder='SEARCH EMPLOYEE NAME' 
                    filterOption={customFilterOption}/></div>
                <div className='text 3xl font-semibold text-white py-6 px-12'>PROJECT NAME:</div>
                <div style={{ maxWidth: "250px", minWidth: "250px" }}><Select
                    options={sortedProjects} value={selectedProject}
                    onChange={change}
                    className='min-w-68'
                    placeholder='SEARCH PROJECT NAME' 
                    filterOption={customFilterOption}/></div> 

                
            </div>

            
                <div>
                    <div className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-500'>
                        <div className='text-white text-center text-bold px-20'>FULL NAME</div>
                        <div className='text-white text-center text-bold '>EMAIL</div>
                        <div className='text-white text-center text-bold'>PROJECT</div>
                        <div className='text-white text-center text-bold'>PERCENTAGE</div>
                    </div>
                </div>  
                <div> 
                    {data.filter(item=>
                    {if (selectedOption === null || selectedOption === '')
                        return true;
                        else {
                            return item.email.toLowerCase().includes(selectedOption.value.toLowerCase());
                        }
                    })
                    .filter(item=>
                        {if (selectedProject === null || selectedProject === '')
                            return true;
                            else {
                                return item.project.map(p => p.toLowerCase()).includes(selectedProject.value.toLowerCase());
                            }
                        }).map((item,index)=>(
                    <div key={index} className='grid grid-cols-4 items-center justify-between gap-16 py-2 bg-slate-400 mb-1 mt-1'>
                        <div className='text-white text-center text-bold px-20'>{item.employeeName}</div>
                        <div className='text-white text-center text-bold '>{item.email}</div>
                        <div className='text-white text-center text-bold'>{item.project.map((project, index) => (<div key={index}>{project}</div> ))}</div>
                        <div className='text-white text-center text-bold'>{item.percentage.map((percentage, index) => (<div key={index}>{percentage}</div> ))}</div>
                    </div>  

                    ))} 

                </div>   


            <div className='grid grid-cols-2 items-center justify-between py-8 gap-8'>  
            <div className='text-right'><button className="bg-orange-500 text-white hover:bg-orange-600 w-24 border-2 rounded-lg " onClick={allocate}>ALLOCATE</button></div>
            <div className='text-left'><button className="bg-orange-500 text-white hover:bg-orange-600 w-24 border-2 rounded-lg " onClick={clears}>CLEAR</button></div> 
            </div>  
        </div>
    )
}

export default Employee